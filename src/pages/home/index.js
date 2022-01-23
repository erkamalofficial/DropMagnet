// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState, useCallback, useContext } from "react";
import DateMenu from "../../components/detail_page/DateMenu/DateMenu";
import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import Tabs from "./tabs";
import ProgressBar from "./progress-bar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMusic,
  fetchArt,
  fetchColletibles,
  fetchFashion,
  fetchReswipeBuckets,
  fetchCategory,
  fetchCloneX,
  fetchDW,
  fetchSR,
  fetchExternalCreators,
  fetchDoodle,
  fetchBAYC,
  fetchWOW,
  fetchCategoryDrops
} from "./actions";
import Spinner from "../../components/blocks/spinner";
import Swiper from "./swiper";
import "./index.css";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { saveDrop, unsaveDrop, updateTokens } from "../../DropMagnetAPI";
import LazyCard from "./LazyCard";
import LazyTab from "./LazyTab";
import { getCategoryFromTab, tabList } from "../../constants";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import FadeIn from 'react-fade-in';
import { GlobalContext } from "../../utils/GlobalContext";
// jsx upgrade
import * as DROP_SERVICE from '../../services/drop-services';

const actionMatcher = {
  0: fetchArt,
  1: fetchMusic,
  2: fetchColletibles,
  3: fetchFashion,
  4: fetchCloneX,
  5: fetchDW,
  6: fetchSR,
  7: fetchDoodle,
  8: fetchBAYC,
  9: fetchWOW
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  div.rel {
    position: relative;
    user-select: none;
    padding-top: var(--main-header-margin-top);
    padding-bottom: 68px;
    @media (max-width: 500px) {
      padding-top: 12px;
    }

    div.tabs-container {
      width: 100%;
      z-index: 3;
      position: fixed;
      padding: 68px 0 17px;
      margin-top: -24px;
      @media (max-width: 500px) {
        margin-bottom: 16px;
        margin-top: -12px;
      }
    }
  }
  div.card-section {
    padding-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 500px) {
      padding-top: 106px;
    }
  }
`;

const CardContainer = styled.div`
  width: 382px;
  height: var(--card-container-height);
  margin-bottom: var(--gap-bottom);
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { setDate, date } = useContext(GlobalContext)

  const { currentUser, idToken } = useAuth();

  const [selectedDropdownDate, setSelectedDropdownDate] = useState(date);
  const [detailView, setDetailView] = useState(false);
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [loadMore, setLoadMore] = useState(false)
  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const isLoading = useSelector((state) => state.category.general.isLoading);
  const loadingIndexList = useSelector((state) => state.category.general.loadingIndexList);
  const reswipeModeActive = useSelector(
    (state) => state.category.general.reswipeModeActive
  );
  const nextIndex = useSelector((state) => state.category.nextIndex);
  const fetchMore = useSelector((state) => state.category.fetchMore);
  const allCategories = useSelector(state => state.category.allCategories)
  // console.log(date)

  //jsx upgrade
  const [categoryTabs, setCategoryTabs] = useState(null)
  const [externalCreatorTabs, setExternalCreatorTabs] = useState(null)
  const [AllCategories, setAllCategories] = useState([])

  const getCategoryIdByPosition = useCallback((position) => {
    if (position < 4) return;

    return allCategories.external_creators.find(category => category.position === position).id;
  }, [allCategories])

  const getCategorySymbolByPosition = useCallback((position) => {
    if (position < 4) return;

    return allCategories.external_creators.find(category => category.position === position).symbol;
  }, [allCategories])

  useEffect(() => {
    setSelectedDropdownDate(date)
  }, [date])

  useEffect(() => {
    setSelectedDropdownDate(date)
  }, [date])

  useEffect(() => console.log('isloading1',isLoading , activeTabIndex ), [isLoading])

  // useEffect(() => { 
  //   console.log(allCategories)
  //   if(allCategories) setAllCategories(allCategories.categories)
  // }, [allCategories])

  useEffect(() => {
    let extras = {
      token: idToken,
      userID: "",
      random: true
    }
    dispatch(fetchCategory())
    dispatch(fetchExternalCreators({extras}))
  }, [ ])

  useEffect(() => {
    // First rendering


    if (props.reload) {
      sessionStorage.setItem('headerLoad', 'true')
    }
    else if (!props.reload && sessionStorage.headerLoad) {
      sessionStorage.removeItem('headerLoad')
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      props.setReload(false)
    }, 500);
  }, [])

  // useEffect(() => {console.log('ati',activeTabIndex)}, [activeTabIndex])

  useEffect(() => {
    // jsx upgrade, on first render 
    DROP_SERVICE.getAllDropTabs().then((res) => {
      // console.log(res.data)
      setCategoryTabs(res.data.categories)
      setExternalCreatorTabs(res.data.external_creators)
      // console.log('%c successful GET drop collection ','background: #444; color: #bada55; padding: 2px; border-radius:2px')
    }).catch((err) => {
      console.log(err, 'There has been an error getting drop collections')
    });
  }, [])

  useEffect(() => {
    // jsx upgrade, re-render after intervals of 6 hours
    let dropRefreshTimer = setInterval(() => {
      DROP_SERVICE.getAllDropTabs().then((res) => {
        // console.log(res.data)
        setCategoryTabs(res.data.categories)
        setExternalCreatorTabs(res.data.external_creators)
        // console.log('%c successful TIMEIN ','background: #444; color: #ff3d00; padding: 2px; border-radius:2px')
      }).catch((err) => {
        console.log(err, '%c successful TIMEOUT ', 'background: #444; color: #ff3d00; padding: 2px; border-radius:2px')
      })
    }, 21600000);
  }, [setCategoryTabs, setExternalCreatorTabs])


  useEffect(() => {
    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: "",
      random: true
    }

    if (!allCategories) return;

    if (activeTabIndex > 9) {
      dispatch(fetchCategoryDrops({
        activeTabIndex,
        id: getCategoryIdByPosition(activeTabIndex),
        categorySymbol: getCategorySymbolByPosition(activeTabIndex),
        extras
      }));

      return;
    }

    const actionCreator = actionMatcher[activeTabIndex];
    dispatch(actionCreator({ activeTabIndex, id: getCategoryIdByPosition(activeTabIndex), extras }));
  }, [selectedDropdownDate, allCategories]);

  useEffect(() => {
    currentUser && currentUser.getIdToken().then((idToken) => {
      dispatch(fetchReswipeBuckets(idToken));

    })
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (fetchMore) {
      let extras = {
        token: idToken,
        curTime: nextIndex,
        userID: "",
        random: false
      }

      if (activeTabIndex > 9) {
        dispatch(fetchCategoryDrops({
          activeTabIndex,
          id: getCategoryIdByPosition(activeTabIndex),
          categorySymbol: getCategorySymbolByPosition(activeTabIndex),
          extras
        }));

        return;
      }

      const actionCreator = actionMatcher[activeTabIndex];
      dispatch(actionCreator({ activeTabIndex, id: getCategoryIdByPosition(activeTabIndex), extras }));

      setLoadMore(false)
    }
  }, [fetchMore])

  const currentTabId = tabList[activeTabIndex] ? getCategoryFromTab(tabList[activeTabIndex]) : getCategorySymbolByPosition(activeTabIndex);
  const { activeBucket = [] } = useSelector((state) => {
    if (!currentTabId || !state.category[currentTabId]) {
      return {};
    }

    return state.category[currentTabId];
  });

  // const {reswipeModeActive} = useSelector((state)=>state.category.general)
  useEffect(() => {
    if (reswipeModeActive) {
      if (window.confirm("Your Bucket Limit has reached its End ? \n 1. Press ok to 'Upgrade Your Subscription' \n 2. Press Cancel to 'Go To Reswipe'?")) {
        history.push('/upgradeSub');
      } else {
        history.push(`/reswipe?tabs=${currentTabId}`);
      }
    }
  }, [reswipeModeActive, currentTabId, history]);
  const uniqueId = Date.now();

  const handleActiveTabIndex = (activeTabIndex) => {
    // const activeTab = getCategoryFromTab(tabList[index]);

    // console.log(index);
    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: "",
    }

    if (activeTabIndex > 9) {
      dispatch(fetchCategoryDrops({
        activeTabIndex,
        id: getCategoryIdByPosition(activeTabIndex),
        categorySymbol: getCategorySymbolByPosition(activeTabIndex),
        extras
      }));

      return;
    }

    const actionCreator = actionMatcher[activeTabIndex];
    dispatch(actionCreator({ activeTabIndex, id: getCategoryIdByPosition(activeTabIndex), extras }));
  };

  const handleSwipe = (dir, drop_id, drop) => {
    currentUser.getIdToken().then((idToken) => {
      if (dir === "right") {
        // setInternalLoader(true);
        saveDrop(idToken, drop_id)
          .then(() => { })
          .catch(() => { })
          .finally(() => {
            // setInternalLoader(false);
            // console.log("Ritgh")
            // console.log(drop.artist)
            updateTokens(drop.artist && drop.artist.id)
              .then(res => { })
          });
      } else if (dir === "left") {
        unsaveDrop(idToken, drop_id)
          .then(() => { })
          .catch(() => {

          })
          .finally(() => {
          })
      }

    }).catch(() => {
      console.log('Error While Getting token');
    })
  };

  // useEffect(() => {
  //   // First rendering
  //   console.log("First rendering", props.reload)
  //   if (props.reload) {
  //     sessionStorage.setItem('headerLoad', 'true')
  //   }
  //   else if (!props.reload && sessionStorage.headerLoad) {
  //     sessionStorage.removeItem('headerLoad')
  //   }
  // }, [])

  return (
    <HomeContainer>
      <div className="rel">
        <FadeIn delay={200}>
          <div className="tabs-container">
            <Tabs
              activeTabIndex={activeTabIndex}
              handleActiveTabIndex={handleActiveTabIndex}
              tabList={tabList}
            />
          </div>
        </FadeIn>

        <div className="card-section">
          {loadingIndexList.length > 0 || isLoading || !activeBucket ?
            (
              <>
                
                <FadeIn delay={200}>
                  <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'}>
                    <LazyCard />
                  </CardContainer>
                </FadeIn>
                <FadeIn delay={700}>
                  <ActionSection key="footer" style={{ display: 'flex' }}>
                    <MinusBtn>
                      <img src="./minus.svg" alt="minus" />
                    </MinusBtn>
                    <PlusBtn>
                      <img src="./plus.svg" alt="plus" />
                    </PlusBtn>
                  </ActionSection>
                </FadeIn>
              </>
            )
            : (
              <>
                <Swiper
                  reswipeModeActive={false}
                  key={uniqueId}
                  db={activeBucket}
                  activeTabIndex={activeTabIndex}
                  onSwipe={handleSwipe}
                  handleActiveTabIndex={handleActiveTabIndex}
                  tabList={tabList}
                  tabList2={AllCategories}
                  setDetailView={setDetailView}
                  nextIndex={nextIndex}
                />
              </>
            )
          }
        </div>

        {/* </div> */}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
