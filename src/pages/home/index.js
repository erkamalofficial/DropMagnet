import "../../server";
import styled from "styled-components";
import React, { useEffect } from "react";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div.rel {
    height: 100vh;
    width: 426px;
    @media (max-width: 600px) {
      width: 100%;
      height: 100vh;
    }
    position: relative;
    padding-top: 90px;
  }
`;

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArt({ activeTabIndex: 0 }));
  }, []);

  const tabList = ["arts", "music", "collectables", "fashion"];
  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const isLoading = useSelector((state) => state.category.general.isLoading);
  const reswipeModeActive = useSelector(
    (state) => state.category.general.reswipeModeActive
  );
  const selectionCount = useSelector(
    (state) => state.category.general.selectionCount
  );
  const currentTabId = tabList[activeTabIndex];

  const { activeBucket, reswipeBucket, selectionBucket } = useSelector(
    (state) => {
      return state.category[currentTabId];
    }
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
  return (
    <HomeContainer>
      <FixedHeader {...props} />
      <div className="rel">
        <Tabs
          activeTabIndex={activeTabIndex}
          handleActiveTabIndex={handleActiveTabIndex}
          tabList={tabList}
        />
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
          // <Deck
          //     key={reswipeModeActive}
          //     cardList={reswipeModeActive ? reswipeBucket : activeBucket}
          // />

          <Swiper
            key={reswipeBucket.length}
            db={reswipeModeActive ? reswipeBucket : activeBucket}
          />
        )}
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
