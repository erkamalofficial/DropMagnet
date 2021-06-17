// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import DateMenu from '../../components/detail_page/DateMenu/DateMenu';
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
import { useAuth } from "../../contexts/FirebaseAuthContext"

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div.rel {
    position: relative;
    user-select: none;
    padding-top: var(--main-header-margin-top);
  }
`;

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useAuth()

  useEffect(() => {
    currentUser.getIdToken(true).then(function (idToken) {
      dispatch(fetchArt({ activeTabIndex: 0, token: idToken }));
    })

  }, []);



  const [selectedDropdownDate, setSelectedDropdownDate] = useState(1617985941)
  const [detailView, setDetailView] = useState(false)
  const [dateMenuOpen, setDateMenuOpen] = useState(false)
  const tabList = ["arts", "music", "collectables", "fashion"];
  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const isLoading = useSelector((state) => state.category.general.isLoading);
  const reswipeModeActive = useSelector((state) => state.category.general.reswipeModeActive);

  const currentTabId = tabList[activeTabIndex];

  const { activeBucket, reswipeBucket } = useSelector(
    (state) => {
      return state.category[currentTabId];
    }
  );


  // const {reswipeModeActive} = useSelector((state)=>state.category.general)
  useEffect(() => {
    if (reswipeModeActive) {
      history.push(`/reswipe?tab=${currentTabId}`);
    }
  }, [reswipeModeActive, currentTabId, history])
  const uniqueId = Date.now()

  function selectDate(date) {
    console.log('opened item', date)
  }

  function setSelectedDate(date) {
    console.log('selected date is', date)
    setSelectedDropdownDate(date.date)
  }

  const openHome = () => {

  }

  const openMenu = () => {

  }

  const openDateMenu = () => {
    setDateMenuOpen(true)
  }

  const handleActiveTabIndex = (index) => {
    const activeTab = tabList[index];
    if (activeTab === "music") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchMusic({ activeTabIndex: index, token: idToken }));
      })
    }
    if (activeTab === "arts") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchArt({ activeTabIndex: index, token: idToken }));
      })
    }
    if (activeTab === "collectables") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchColletibles({ activeTabIndex: index, token: idToken }));
      })
    }
    if (activeTab === "fashion") {
      currentUser.getIdToken(true).then(function (idToken) {
        dispatch(fetchFashion({ activeTabIndex: index, token: idToken }));
      })

    }
  };
  const handleReswipe = () => {
    dispatch(fetchReswipeList(activeTabIndex));
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
        openDateMenu={() => openDateMenu()}
        selectedDropdownDate={selectedDropdownDate}
        datePickerVisible={detailView ? false : true}
        userLoggedIn={props.userLoggedIn}
        userImage={props.userDetails.image}
        userDetails={props.userDetails}
        userImageVisible={true}
      />
      <div className="rel">
        {isLoading && <Spinner />}

        {!isLoading && (
          <Swiper
            reswipeModeActive={false}
            key={uniqueId}
            db={activeBucket}
            activeTabIndex={activeTabIndex}
            handleActiveTabIndex={handleActiveTabIndex}
            tabList={tabList}
            setDetailView={setDetailView}
          />
        )}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
