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

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser, idToken } = useAuth();

  const [selectedDropdownDate, setSelectedDropdownDate] = useState(new Date());
  const [detailView, setDetailView] = useState(false);
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [loadMore, setLoadMore] = useState(false)
  const tabList = ["arts", "music", "collectables", "fashion"];
  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const isLoading = useSelector((state) => state.category.general.isLoading);
  const reswipeModeActive = useSelector(
    (state) => state.category.general.reswipeModeActive
  );

  useEffect(() => {

    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: currentUser.uid,
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

  // useEffect(() => {
  //   console.log(loadMore)
  //   if (loadMore) {
  //     let date = new Date(selectedDropdownDate)
  //     const TO_DATE = date.setDate(date.getDate() + 5)
  //     const FROM_DATE = date.setDate(date.getDate() + 5)

  //     let toDate = getCurrentDate(TO_DATE)
  //     let fromDate = getCurrentDate(FROM_DATE)

  //     let extras = {
  //       token: idToken,
  //       fromDate: fromDate, // Date in future
  //       toDate: toDate, // Current date
  //       userID: currentUser.uid,
  //     }

  //     if (activeTabIndex === 0) {
  //       dispatch(fetchArt({ activeTabIndex: 0, token: idToken, extras: extras }));
  //     }
  //     else if (activeTabIndex === 1) {
  //       dispatch(fetchMusic({ activeTabIndex: 1, token: idToken, extras: extras }));
  //     }
  //     else if (activeTabIndex === 2) {
  //       dispatch(fetchColletibles({ activeTabIndex: 2, token: idToken, extras: extras }));
  //     }
  //     else {
  //       dispatch(fetchFashion({ activeTabIndex: 3, token: idToken, extras: extras }));
  //     }
  //     setLoadMore(false)

  //   }
  // }, [loadMore])

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
      userID: currentUser.uid,
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
        selectedDropdownDate={selectedDropdownDate}
        setSelectedDropdownDate={setSelectedDropdownDate}
        datePickerVisible={detailView ? false : true}
        userLoggedIn={props.userLoggedIn}
        userImageVisible={true}
      />
      <div className="rel">
        {isLoading && <Spinner />}
        {/* <div style={{display: internalLoader ? 'none': 'block'}}> */}
        {!isLoading && (
          <Swiper
            reswipeModeActive={false}
            key={uniqueId}
            db={activeBucket}
            activeTabIndex={activeTabIndex}
            onSwipe={handleSwipe}
            handleActiveTabIndex={handleActiveTabIndex}
            tabList={tabList}
            setDetailView={setDetailView}
            setLoadMore={setLoadMore}
          />

        )}
        {/* </div> */}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
