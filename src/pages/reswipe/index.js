import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import IntroScreen from "./intro_screen";
import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import DateMenu from "../../components/detail_page/DateMenu/DateMenu";

import { useSelector, useDispatch } from "react-redux";
import qs from "querystring";

import Swiper from "../home/swiper";
import ProgressBar from "../home/progress-bar";
import RestartScreen from "./restart_screen";
import FinalFour from "./final_4";
import { cloneDeep } from "lodash";

import "./index.css";
import ReswipeComplete from "./complete_reswipe";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { saveDrop, unsaveDrop } from "../../DropMagnetAPI";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 80px; */
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

function Reswipe(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedDropdownDate, setSelectedDropdownDate] = useState(1617985941);
  function selectDate(date) {
    console.log("opened item", date);
  }

  function setSelectedDate(date) {
    console.log("selected date is", date);
    setSelectedDropdownDate(date.date);
  }
  const [dateMenuOpen, setDateMenuOpen] = useState(false);

  const [isReswipeStarted, setIsReswipeStarted] = useState(false);
  const curTab = qs.parse(useLocation().search, "?").tabs;
  const [detailView, setDetailView] = useState(false);
  const [showRestartReSwipeMessage, setShowRestartReSwipeMessage] =
    useState(false);

  const [isFinal4Left, setIsFinal4Left] = useState(false);
  const { idToken } = useAuth();

  const tabList = ["arts", "music", "collectables", "fashion"];

  const { reswipeBucket } = useSelector((state) => {
    return state.category[curTab];
  });

  const { currentUser } = useAuth();

  const [tempReswipeBucket, setTempReswipeBucket] = useState(reswipeBucket);

  const [currentCounter, setCurrentCounter] = useState(reswipeBucket.length);
  const [roundLength, setRoundLength] = useState(reswipeBucket.length);
  const [reswipeComplete, setReswipeComplete] = useState(false);
  const [deletedFinalFour, setDeletedFinalFour] = useState(null);
  const openDateMenu = () => {
    setDateMenuOpen(true);
  };

  const handleReswipe = (dir, drop_id) => {
    let newArray = tempReswipeBucket.filter((value) => value.id !== drop_id);
    let currCAndCurrL = newArray.length;

    if (dir === "right") {
      saveDrop(idToken, drop_id);
      currCAndCurrL += 1;
    } else {
      unsaveDrop(idToken, drop_id);
      setTempReswipeBucket(newArray);
    }
    if (currentCounter - 1 === 0 ) {
      if (newArray.length === 0) {
        return handleFinish();
      }
      setRoundLength(currCAndCurrL);
      setCurrentCounter(currCAndCurrL);
      setIsReswipeStarted(false);
      if (currCAndCurrL <= 4) {
        setDeletedFinalFour(new Array(currCAndCurrL).fill(false));
        setIsFinal4Left(true);
      } else {
        setShowRestartReSwipeMessage(true);
      }
    } else if(newArray.length === 4) {
      setRoundLength(4);
      setCurrentCounter(4);
      setIsReswipeStarted(false);
      setIsFinal4Left(true);
      setDeletedFinalFour(new Array(4).fill(false));
    }else{
      setCurrentCounter(currentCounter - 1);
    }
  };

  const onChangeFinalFourDelete = (isDeleted, index) => {
    let newDeletedFinal4 = [...deletedFinalFour];
    newDeletedFinal4[index] = isDeleted;
    setDeletedFinalFour(newDeletedFinal4);
  };

  const handleFinish = (isExit = false) => {
    if (isExit)
      return dispatch({
        type: "SET_RESWIPE_BUCKET",
        payload: { newBucket: tempReswipeBucket, tab: curTab },
      });
    const currentReswipeBucket = cloneDeep(tempReswipeBucket);
    if (deletedFinalFour !== null) {
      deletedFinalFour.map((isDeleted, index) => {
        if (currentReswipeBucket[index]) {
          const id = currentReswipeBucket[index].id;
          if (isDeleted) {
            unsaveDrop(idToken, id);
            currentReswipeBucket.splice(index, 1);
          } else {
            saveDrop(idToken,id);
          }
        }
      });
    }
    dispatch({
      type: "SET_RESWIPE_BUCKET",
      payload: { newBucket: tempReswipeBucket, tab: curTab },
    });
    // API to save on the backend
    setTempReswipeBucket(currentReswipeBucket);
    setReswipeComplete(true);
  };

  //   console.log(reswipeBucket,selectionBucket);
  return (
    <MainContainer className={"container-reswipe"}>
      <DateMenu
        open={dateMenuOpen}
        setOpen={setDateMenuOpen}
        openItem={selectDate}
        setSelectedDate={setSelectedDate}
      />
      <HeaderBar
        // openHome={() => openHome()}
        // openMenu={() => openMenu()}
        isLogoNotVisible
        openDateMenu={() => openDateMenu()}
        selectedDropdownDate={selectedDropdownDate}
        datePickerVisible={detailView ? false : true}
        userLoggedIn={currentUser && currentUser.uid}
        userImageVisible={true}
      />
      {!reswipeComplete ? (
        <>
          {!isFinal4Left && !showRestartReSwipeMessage && !isReswipeStarted && (
            <IntroScreen />
          )}
          {showRestartReSwipeMessage && (
            <RestartScreen selectionCount={tempReswipeBucket.length} />
          )}
          {isFinal4Left && (
            <FinalFour
              deleted={deletedFinalFour}
              bucket={tempReswipeBucket}
              onChange={onChangeFinalFourDelete}
            />
          )}
          {isReswipeStarted && (
            <div classNAme="rel">
              <ProgressBar
                key="progressBar"
                size={roundLength}
                closeReswipe={() => {
                  handleFinish(true);
                  history.push("/home");
                }}
                selectedCount={tempReswipeBucket.length}
              />
              <Swiper
                key={"a000"}
                reswipeModeActive={true}
                onReswipe={handleReswipe}
                db={tempReswipeBucket}
                detailView={detailView}
                setDetailView={setDetailView}
              />
            </div>
          )}
        </>
      ) : (
        <ReswipeComplete />
      )}

      <ReswipedButtonContainer>
        {!reswipeComplete ? (
          <div style={{ display: "flex" }}>
            {!isFinal4Left && !showRestartReSwipeMessage && !isReswipeStarted && (
              <button
                className={"main-button-2 clickable"}
                onClick={() => setIsReswipeStarted(true)}
              >
                <h1 style={{ textAlign: "center", width: "300px" }}> Start </h1>
              </button>
            )}
            {showRestartReSwipeMessage && (
              <>
                <button
                  className={"main-button-2 clickable"}
                  onClick={() => handleFinish()}
                >
                  <h1 style={{ textAlign: "center", width: "150px" }}>
                    I want {tempReswipeBucket.length}!
                  </h1>
                </button>
                <button
                  className={"main-button-2 clickable"}
                  onClick={() => {
                    setIsReswipeStarted(true);
                    setShowRestartReSwipeMessage(false);
                  }}
                >
                  <h1 style={{ textAlign: "center", width: "150px" }}>
                    Reswipe
                  </h1>
                </button>
              </>
            )}
            {isFinal4Left && (
              <>
                <button
                  className={"main-button-2 clickable"}
                  onClick={() => handleFinish()}
                >
                  <h1 style={{ textAlign: "center", width: "150px" }}>SAVE</h1>
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            className={"main-button-2 clickable"}
            onClick={() => {
              history.push("/home");
            }}
          >
            <h1 style={{ textAlign: "center", width: "100%" }}>
              Go To Collection Page
            </h1>
          </button>
        )}
      </ReswipedButtonContainer>
    </MainContainer>
  );
}

export default Reswipe;
