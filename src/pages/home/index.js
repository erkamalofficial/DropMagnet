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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div.rel {
    position: relative;
    user-select: none;
    padding-top: var(--main-header-margin-top);
    margin-top: 68px;
    z-index: 9999;
    @media (max-width: 500px) {
      padding-top: 2px
    }
  }
`;

const CardContainer = styled.div`
  width: var(--card-container-width);
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
  const reswipeModeActive = useSelector(
    (state) => state.category.general.reswipeModeActive
  );
  const nextIndex = useSelector((state) => state.category.nextIndex);
  const fetchMore = useSelector((state) => state.category.fetchMore);

  console.log(date)

  useEffect(() => {
    setSelectedDropdownDate(date)
  }, [date])

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

    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: "",
      random: true
    }
    if (activeTabIndex === 1) {
      dispatch(fetchMusic({ activeTabIndex: 1, extras: { ...extras, token: idToken } }));
    }
    else if (activeTabIndex === 0) {
      dispatch(fetchArt({ activeTabIndex: 0, extras: { ...extras, token: idToken } }));
    }
    else if (activeTabIndex === 2) {
      dispatch(fetchColletibles({ activeTabIndex: 2, extras: { ...extras, token: idToken } }));
    }
    else {
      dispatch(fetchFashion({ activeTabIndex: 3, extras: { ...extras, token: idToken } }));
    }

  }, [selectedDropdownDate]);

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

      if (activeTabIndex === 0) {
        dispatch(fetchArt({ activeTabIndex: 0, token: idToken, extras: extras }));
      }
      else if (activeTabIndex === 1) {
        dispatch(fetchMusic({ activeTabIndex: 1, token: idToken, extras: extras }));
      }
      else if (activeTabIndex === 2) {
        dispatch(fetchColletibles({ activeTabIndex: 2, token: idToken, extras: extras }));
      }
      else {
        dispatch(fetchFashion({ activeTabIndex: 3, token: idToken, extras: extras }));
      }
      setLoadMore(false)

    }
  }, [fetchMore])

  const getCurrentDate = (date) => {
    let d = new Date(date)
    const curDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    return curDate
  }
  const currentTabId = getCategoryFromTab(tabList[activeTabIndex]);;
  const { activeBucket } = useSelector((state) => {
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

  const handleActiveTabIndex = (index) => {

    const activeTab = getCategoryFromTab(tabList[index]);

    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: "",
    }

    if (activeTab === "music") {
      dispatch(fetchMusic({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "art") {
      dispatch(fetchArt({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "collectible") {
      dispatch(fetchColletibles({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "fashion") {
      dispatch(fetchFashion({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
  };

  const handleSwipe = (dir, drop_id, drop) => {
    currentUser.getIdToken().then((idToken) => {
      if (dir === "right") {
        // setInternalLoader(true);
        saveDrop(idToken, drop_id)
          .then(() => {})
          .catch(() => { })
          .finally(() => {
            // setInternalLoader(false);
            console.log("Ritgh")
            updateTokens(drop.artist.id)
            .then(res => {})
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
        {isLoading ?
          (
            <>
              <FadeIn delay={600}>
                <Tabs
                  activeTabIndex={activeTabIndex}
                  handleActiveTabIndex={handleActiveTabIndex}
                  tabList={tabList}
                />
              </FadeIn>
              <FadeIn delay={1000}>
                <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'}>
                  <LazyCard />
                </CardContainer>
              </FadeIn>
              <FadeIn delay={1000}>
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
            <FadeIn delay={600}>
              <Swiper
                reswipeModeActive={false}
                key={uniqueId}
                db={activeBucket}
                activeTabIndex={activeTabIndex}
                onSwipe={handleSwipe}
                handleActiveTabIndex={handleActiveTabIndex}
                tabList={tabList}
                setDetailView={setDetailView}
                nextIndex={nextIndex}
              />
            </FadeIn>
          )

        }

        {/* </div> */}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
