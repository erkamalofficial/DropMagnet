// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo } from "react";
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
  return (
    <HomeContainer>
      <FixedHeader {...props} />
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
