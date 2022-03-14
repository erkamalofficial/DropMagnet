// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState, useCallback, useContext } from "react";
import DateMenu from "../../components/detail_page/DateMenu/DateMenu";
import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import Tabs from "./tabs";
import ProgressBar from "./progress-bar";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryDrops } from "./actions";
import Spinner from "../../components/blocks/spinner";
import Swiper from "./swiper";
import "./index.css";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { getCategorySavedDrops, saveDrop, unsaveDrop, updateTokens } from "../../DropMagnetAPI";
import LazyCard from "./LazyCard";
import LazyTab from "./LazyTab";
import { getCategoryFromTab, tabList } from "../../constants";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import FadeIn from 'react-fade-in';
import { GlobalContext } from "../../utils/GlobalContext";
import { getCategorySymbolByPosition, getCategoryIdByPosition } from "../../utils/category";
// jsx upgrade
import * as DROP_SERVICE from '../../services/drop-services';
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";
import store from "../../store";
import { setOpen } from "../../store/OpenCard";

import "../../components/detail_page/DropDetail/DropDetail.css";
import { useFetchCategoryDropsQuery, useFetchUserSavedDropsQuery, useGetCategoriesQuery, useSaveSwipedDropMutation, useUnSaveSwipedDropMutation } from "../../store/api/DropApi";
import { categorySavedBuckets } from "../../store/reducers/CategoryReducer";

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
  const { token, userId } = useSelector((state) => state.auth);
  const { data: categoryList, isLoading } = useGetCategoriesQuery();
  const dispatch = useDispatch();
  const history = useHistory();
  const date = props.date
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  // const activeTabIndex = useSelector((state) => state.category.general.activeTabIndex);

  // const token = currentUser.getIdToken().then(res => res)

  const uniqueId = Date.now();
  const [selectedDropdownDate, setSelectedDropdownDate] = useState(date);
  const [loadMore, setLoadMore] = useState(false)
  // const isLoading = useSelector((state) => state.category.general.isLoading);
  const loadingIndexList = useSelector((state) => state.category.general.loadingIndexList);

  const reswipeModeActive = useSelector((state) => state.category.general.reswipeModeActive);
  const nextIndex = useSelector((state) => state.category.nextIndex);
  const fetchMore = useSelector((state) => state.category.fetchMore);
  const allCategories = categoryList //useSelector(state => state.category)
  const [categoryWiseDrops, setCategoryWiseDrops] = useState([]);
  const isCategoriesListEmpty = useMemo(() => {
    return !allCategories || !allCategories.categories.length && !allCategories.external_creators.length;
  }, [allCategories])

  //jsx upgrade
  const [categoryTabs, setCategoryTabs] = useState(null)
  const [externalCreatorTabs, setExternalCreatorTabs] = useState(null)

  // const allCategories = useSelector(state => state.category.allCategories)
  // const activeTabIndex = useSelector((state) => state.category.general.activeTabIndex);

  const getRequestParams = () => {

    if (isCategoriesListEmpty) return;
    let curTime = new Date(selectedDropdownDate).getTime()

    const id = getCategoryIdByPosition(activeTabIndex, allCategories)
    // const categorySymbol = getCategorySymbolByPosition(activeTabIndex, allCategories)
    // const isExternalCategory = activeTabIndex >= allCategories.categories.length

    return { token: token, userId: id, time: curTime }
  }

  const { data: categoryDrops } = useFetchCategoryDropsQuery(getRequestParams());
  useEffect(() => {
    if (!categoryDrops) {
      setCategoryWiseDrops([]);
      return
    };
    setCategoryWiseDrops(categoryDrops.drops);
  }, [categoryDrops])

  const fetchCategory = (activeTabIndex, curTime, random) => {
    let extras = {
      token: token,
      curTime,
      userID: "",
      random
    }
    dispatch(fetchCategoryDrops({
      activeTabIndex,
      id: getCategoryIdByPosition(activeTabIndex, allCategories),
      categorySymbol: getCategorySymbolByPosition(activeTabIndex, allCategories),
      isExternalCategory: activeTabIndex >= allCategories.categories.length,
      extras
    }));
  }

  useEffect(() => {
    setSelectedDropdownDate(date)
  }, [date]);

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

  
  useEffect(() => {
    // jsx upgrade, on first render 
    DROP_SERVICE.getAllDropTabs().then((res) => {
      setCategoryTabs(res.data.categories)
      setExternalCreatorTabs(res.data.external_creators)
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


  // useEffect(() => {
  //   let curTime = new Date(selectedDropdownDate).getTime()
  //   if (isCategoriesListEmpty) return;

  //   fetchCategory(activeTabIndex, curTime, true);
  // }, [selectedDropdownDate, isCategoriesListEmpty]);

  useEffect(() => {
    if (fetchMore) {
      fetchCategory(activeTabIndex, nextIndex, false);
      setLoadMore(false)
    }
  }, [fetchMore])

  const currentTabId = !isCategoriesListEmpty && getCategorySymbolByPosition(activeTabIndex, allCategories);
  // const { activeBucket = [] } = useSelector((state) => {
  //   if (!currentTabId || !state.category[currentTabId]) {
  //     return {};
  //   }

  //   return state.category[currentTabId];
  // });

  useEffect(async () => {
    if (reswipeModeActive) {
      if (window.confirm("Your Bucket Limit has reached its End ? \n 1. Press ok to 'Upgrade Your Subscription' \n 2. Press Cancel to 'Go To Reswipe'?")) {
        history.push('/upgradeSub');
      } else {
        const currentTab = await getCategorySymbolByPosition(activeTabIndex, allCategories)
        await getCategorySavedDrops(token, currentTab).then((savedPosts) => {
          dispatch(categorySavedBuckets({ newBucket: savedPosts }));
          history.push(`/reswipe?tabs=${currentTabId}`);
        });
      }
    }
  }, [reswipeModeActive, currentTabId, history]);

  const handleActiveTabIndex = (activeTabIndex) => {
    let curTime = new Date(selectedDropdownDate).getTime()
    fetchCategory(activeTabIndex, curTime, true);
    setActiveTabIndex(activeTabIndex)
  };

  
  const [saveCategoryDrop] = useSaveSwipedDropMutation({ fixedCacheKey: 'shared-update-post'});
  const [unSaveCategoryDrop] = useUnSaveSwipedDropMutation({ fixedCacheKey: 'shared-update-post'});
  const { data: userSavedPosts, isSuccess, refetch } = useFetchUserSavedDropsQuery({ token: token, symbol: currentTabId })
  const handleSwipe = (dir, drop_id, drop) => {
    if (token && isSuccess) {
      console.log({drop, currentTabId, len: userSavedPosts ? userSavedPosts.length : 0})
      if (dir === "right") {
        (async () => {
          const length = userSavedPosts ? userSavedPosts.length : 0
          if (length < 10) {
            saveCategoryDrop({token, dropId: drop_id})

            // saveDrop(token, drop_id)
            //   .then(() => { })
            //   .catch(() => { })
            //   .finally(() => {
            //      updateTokens(drop.artist && drop.artist.id).then(res => { })
            //   });
          }
        })()

      } else if (dir === "left") {
        unSaveCategoryDrop({token, dropId: drop_id})
        // unsaveDrop(token, drop_id)
        //   .then(() => { })
        //   .catch(() => {

        //   })
        //   .finally(() => {
        //   })
      }
    } else {
      console.log('Token Not Found');
    }
  };

  // const [selector, setSelector] = useState({isOpen: false, drop: {}});
  // store.subscribe(() => {
  //   setSelector(store.getState().card)
  // })

  // useEffect(() => {
  //   console.log(selector)
  // }, [selector])

  // const selector = useSelector(state => state.card)

  return (
    <HomeContainer>
      <div className="rel">
        <FadeIn delay={200}>
          <div className="tabs-container">
            <Tabs
              activeTabIndex={activeTabIndex}
              handleActiveTabIndex={handleActiveTabIndex}
            />
          </div>
        </FadeIn>

        <div className="card-section">
          {loadingIndexList.length > 0 || !categoryWiseDrops ?
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
            ) : (
              <Swiper
                reswipeModeActive={false}
                key={uniqueId}
                db={categoryWiseDrops}
                activeTabIndex={activeTabIndex}
                onSwipe={handleSwipe}
                handleActiveTabIndex={handleActiveTabIndex}
                nextIndex={nextIndex}
              />
            )
          }
        </div>
      </div>
      {/* {selector.isOpen && (<DropDetail show={selector.isOpen} drop={selector.drop} />)} */}
    </HomeContainer>
  );
};

export default React.memo(Home);
