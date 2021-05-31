// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";

import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import Tabs from "./tabs";
import ProgressBar from "./progress-bar";
import DateMenu from '../../components/detail_page/DateMenu/DateMenu'

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
  useEffect(() => {
    dispatch(fetchArt({ activeTabIndex: 0 }));
  }, []);
  const [selectedDropdownDate, setSelectedDropdownDate] = useState(1617985941)
  const [detailView, setDetailView] = useState(false)
  const [dateMenuOpen, setDateMenuOpen] = useState(false)

  function selectDate(date) {
    console.log('opened item', date)
  }

  function setSelectedDate(date) {
    console.log('selected date is', date)
    setSelectedDropdownDate(date.date)
  }


  const tabList = ["arts", "music", "collectables", "fashion"];
  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const isLoading = useSelector((state) => state.category.general.isLoading);
  const reswipeModeActive = useSelector(
    (state) => state.category.general.reswipeModeActive
  );
  useSelector((state) => state.category.general.selectionCount);

  const currentTabId = tabList[activeTabIndex];

  const { activeBucket, reswipeBucket, selectionBucket } = useSelector(
    (state) => {
      return state.category[currentTabId];
    }
  );
  const uidChanged = useSelector((state) => state.category.general.uidChanged);
  const uniqueId = useMemo(
    () => Date.now(),
    [reswipeBucket.length, uidChanged]
  );

  const handleActiveTabIndex = (index) => {
    const activeTab = tabList[index];
    if (activeTab === "music") {
      dispatch(fetchMusic({ activeTabIndex: index }));
    }
    if (activeTab === "arts") {
      dispatch(fetchArt({ activeTabIndex: index }));
    }
    if (activeTab === "collectables") {
      dispatch(fetchColletibles({ activeTabIndex: index }));
    }
    if (activeTab === "fashion") {
      dispatch(fetchFashion({ activeTabIndex: index }));
    }
  };
  const handleReswipe = () => {
    dispatch(fetchReswipeList(activeTabIndex));
  };

  const openHome = ()=>{

  }

  const openMenu = ()=>{

  }

  const openDateMenu = ()=>{
    setDateMenuOpen(true)
  }

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
        userImageVisible={true}
      />
      {/* <FixedHeader {...props} /> */}
      <div className="rel">
        {!reswipeModeActive && (
          <Tabs
            activeTabIndex={activeTabIndex}
            handleActiveTabIndex={handleActiveTabIndex}
            tabList={tabList}
          />
        )}
        {isLoading && <Spinner />}
        {reswipeModeActive && (
          <ProgressBar
            key="progressBar"
            size={reswipeModeActive ? reswipeBucket.length : 10}
            handleReswipe={handleReswipe}
            selectedCount={selectionBucket.fav.length}
          />
        )}
        {!isLoading && (
          <Swiper
            key={uniqueId}
            reswipeModeActive={reswipeModeActive}
            db={reswipeModeActive ? reswipeBucket : activeBucket}
          />
        )}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);