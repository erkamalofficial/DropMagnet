// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { saveDrop, unsaveDrop } from "../../DropMagnetAPI";
import LazyCard from "./LazyCard";
import LazyTab from "./LazyTab";
import { tabList } from "../../constants";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div.rel {
    position: relative;
    user-select: none;
    padding-top: var(--main-header-margin-top);
    @media (max-width: 500px) {
      padding-top: 10px
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

  const { currentUser, idToken } = useAuth();

  const curIndex = useSelector((state) => state.category.curIndex);


  const [selectedDropdownDate, setSelectedDropdownDate] = useState(new Date(curIndex));
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

  // useEffect(() => {
  //   if (curIndex !== 0) {
  //     setSelectedDropdownDate(new Date(curIndex))
  //   }
  // }, [curIndex])

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
  const currentTabId = tabList[activeTabIndex];
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

  function selectDate(date) {
    console.log("opened item", date);
  }

  function setSelectedDate(date) {
    console.log("selected date is", date);
    setSelectedDropdownDate(date.date);
  }

  const openHome = () => { };

  const openMenu = () => { };

  const openDateMenu = () => {
    setDateMenuOpen(true);
  };

  const handleActiveTabIndex = (index) => {

    const activeTab = tabList[index];

    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: "",
    }

    if (activeTab === "music") {
      dispatch(fetchMusic({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "arts") {
      dispatch(fetchArt({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "collectables") {
      dispatch(fetchColletibles({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "fashion") {
      dispatch(fetchFashion({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
  };

  const handleSwipe = (dir, drop_id) => {
    currentUser.getIdToken().then((idToken) => {
      if (dir === "right") {
        // setInternalLoader(true);
        saveDrop(idToken, drop_id)
          .then(() => {
            console.log("Success");
          })
          .catch(() => { })
          .finally(() => {
            // setInternalLoader(false);
          });
      } else if (dir === "left") {
        unsaveDrop(idToken, drop_id)
          .then(() => {
            console.log('Unsave Success');
          })
          .catch(() => {

          })
          .finally(() => {

          })
      }

    }).catch(() => {
      console.log('Error While Getting token');
    })
  };

  return (
    <HomeContainer>

      <HeaderBar
        openHome={() => openHome()}
        openMenu={() => openMenu()}
        isLogoNotVisible
        openDateMenu={() => openDateMenu()}
        curIndex={curIndex}
        selectedDropdownDate={selectedDropdownDate}
        setSelectedDropdownDate={setSelectedDropdownDate}
        datePickerVisible={detailView ? false : true}
        userLoggedIn={props.userLoggedIn}
        userImageVisible={true}
      />
      <div className="rel">
        {isLoading ?
          (
            <>
              <Tabs
                activeTabIndex={activeTabIndex}
                handleActiveTabIndex={handleActiveTabIndex}
                tabList={tabList}
              />
              <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'}>
                <LazyCard />
              </CardContainer>
              <ActionSection key="footer" style={{ display: 'flex'}}>
                <MinusBtn>
                  <img src="./minus.svg" alt="minus" />
                </MinusBtn>
                <PlusBtn>
                  <img src="./plus.svg" alt="plus" />
                </PlusBtn>
              </ActionSection>
            </>
          )
          : (
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
          )

        }

        {/* </div> */}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
