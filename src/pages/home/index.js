// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
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
  fetchReswipeList,
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

  useEffect(() => {
    currentUser.getIdToken(true).then(function (idToken) {
      let today = getCurrentDate()
      dispatch(fetchArt({ activeTabIndex: 0, token: idToken, fromDate: today }));
    })

  }, []);

  const [selectedDropdownDate, setSelectedDropdownDate] = useState(1617985941);
  const [detailView, setDetailView] = useState(false);
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const tabList = ["arts", "music", "collectables", "fashion"];
  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const isLoading = useSelector((state) => state.category.general.isLoading);
  const reswipeModeActive = useSelector(
    (state) => state.category.general.reswipeModeActive
  );

  const getCurrentDate = () => {
    let d = new Date()
    const curDate = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
    return curDate
  }
  const currentTabId = tabList[activeTabIndex];
  const { activeBucket} = useSelector((state) => {
    return state.category[currentTabId];
  });

  // const {reswipeModeActive} = useSelector((state)=>state.category.general)
  useEffect(() => {
    if (reswipeModeActive) {
      history.push(`/reswipe?tab=${currentTabId}`);
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

  const openHome = () => {};

  const openMenu = () => {};

  const openDateMenu = () => {
    setDateMenuOpen(true);
  };

  const handleActiveTabIndex = (index) => {
    const activeTab = tabList[index];
    let today = getCurrentDate()
    if (activeTab === "music") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchMusic({ activeTabIndex: index, token: idToken, fromDate: today }));
      })
    }
    if (activeTab === "arts") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchArt({ activeTabIndex: index, token: idToken, fromDate: today }));
      })
    }
    if (activeTab === "collectables") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchColletibles({ activeTabIndex: index, token: idToken, fromDate: today }));
      })
    }
    if (activeTab === "fashion") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchFashion({ activeTabIndex: index, token: idToken, fromDate: today }));
      })

    }
  };

  const handleSwipe = (dir, drop_id) => {
    if (dir === "right") {
      // setInternalLoader(true);
      saveDrop(idToken, drop_id)
        .then(() => {
          console.log("Success");
        })
        .catch(() => {})
        .finally(() => {
          // setInternalLoader(false);
        });
    }else if(dir === "left"){
       unsaveDrop(idToken, drop_id)
       .then(()=>{
        console.log('Unsave Success');
       })
       .catch(()=>{

       })
       .finally(()=>{

       })
    }
  };
  return (
    <HomeContainer>
      <DateMenu
        open={dateMenuOpen}
        setOpen={setDateMenuOpen}
        openItem={selectDate}
        setSelectedDate={setSelectedDate}
      />

      <HeaderBar
        openHome={() => openHome()}
        openMenu={() => openMenu()}
        isLogoNotVisible
        openDateMenu={() => openDateMenu()}
        selectedDropdownDate={selectedDropdownDate}
        datePickerVisible={detailView ? false : true}
        userLoggedIn={props.userLoggedIn}
        userImageVisible={true}
      />
      <div className="rel">
        {(isLoading) && <Spinner />}
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
            />
          )}
        {/* </div> */}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
