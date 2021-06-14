
import React, { useState } from "react";
import { useHistory, useLocation} from "react-router";
import styled from "styled-components";
import IntroScreen from "./intro_screen";
import { useSelector, useDispatch } from "react-redux";
import qs from "querystring";
import Tabs from "../home/tabs";

import Swiper from "../home/swiper";
import ProgressBar from "../home/progress-bar";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
  flex-direction: column;
`;

const ReswipedButtonContainer = styled.div`
  margin-top: 20px;
`;

const Header = styled.div`
  align-self: flex-start;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: auto;
`;

function Reswipe() {
  const history = useHistory();
  const [isReswipeStarted, setIsReswipeStarted] = useState(false);
  const [initRestart, setInitRestart] = useState(false);
  const curTab = qs.parse(useLocation().search, "?").tab;
  const [detailView, setDetailView] = useState(false)

  const tabList = ["arts", "music", "collectables", "fashion"];

  const {reswipeBucket, selectionBucket}  = useSelector(
    (state) => {
      return state.category[curTab];
    }
  );

//   console.log(reswipeBucket,selectionBucket);
  return (
    <MainContainer className={'container-reswipe'}>
      <Header>
        <img
          alt={"close-btn"}
          style={{
            position: "fixed",
            top: "26px",
            right: "20px",
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => history.goBack()}
          src="./close-icon.png"
        />

        {/* <CircularButton className={'main-button'}>Back</CircularButton> */}
      </Header>

      <Tabs
        activeTabIndex={tabList.indexOf(curTab)}
        handleActiveTabIndex={(index) =>
          history.replace("/reswipe?tab=" + tabList[index])
        }
        tabList={tabList}
      />

        
      {!isReswipeStarted && <IntroScreen />}
      {isReswipeStarted && (
          <>
          <ProgressBar
            key="progressBar"
            size={reswipeBucket.length}
            handleReswipe={()=>null}
            selectedCount={selectionBucket.fav.length}
          />
          <Swiper
            key={'a000'}
            reswipeModeActive={true}
            db={reswipeBucket}
            detailView={detailView}
            setDetailView={setDetailView}
          />
          </>
        )}
      <ReswipedButtonContainer>
        {!isReswipeStarted && (
          <button
            className={"main-button-2 clickable"}
            onClick={() => setIsReswipeStarted(true)}
          >
            <h1 style={{ textAlign: "center", width: "300px" }}> Start </h1>
          </button>
        )}
        
      </ReswipedButtonContainer>
    </MainContainer>
  );
}

export default Reswipe;
