import React, { useState,useEffect, useRef } from "react";
import { useHistory, useLocation } from 'react-router-dom';
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

import "./index.css";
import ReswipeComplete from "./complete_reswipe";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { saveDrop, unsaveDrop } from "../../DropMagnetAPI";
import ProfileDropDetail from "../../components/detail_page/DropDetail/ProfileDropDetail";
import ReswipeCard from './reswipe_card';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 80px; */
  flex-direction: column;
`;

const ReswipedButtonContainer = styled.div`
  margin-top: 10px;
  width: 426px;
  @media (max-width: 576px) {
    width: 386px;
  }
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
  const [selectedDropdownDate, setSelectedDropdownDate] = useState(new Date());
  function selectDate(date) {
    console.log("opened item", date);
  }

  function setSelectedDate(date) {
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

  const { reswipedDrops = {} } = useSelector((state) => {
    if (!state.category[curTab]) {
      return {}
    }

    return state.category[curTab];
  });

  console.log('reswipedDrops',reswipedDrops)

  const { reswipeModeActive } = useSelector((state) => state.category.general);
  if (!reswipeModeActive) {
    sessionStorage.removeItem('headerLoad')
  }

  const [tempReswipeBucket, setTempReswipeBucket] = useState([]);

  const tempRef = useRef(tempReswipeBucket);

  const [currentCounter, setCurrentCounter] = useState(0);
  const counterRef = useRef(currentCounter);
  const [roundLength, setRoundLength] = useState(0);
  const [reswipeComplete, setReswipeComplete] = useState(false);
  const [deletedFinalFour, setDeletedFinalFour] = useState([false,false,false,false]);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(null);

  useEffect(() => {
    if(Object.keys(reswipedDrops).length === 4){
      setRoundLength(4);
      setCurrentCounter(4);
      counterRef.current = 4;
      setIsReswipeStarted(false);
      setIsFinal4Left(true);
      setDeletedFinalFour(new Array(4).fill(false));
    }
  }, []);

  useEffect(()=>{
    tempRef.current  = [...tempReswipeBucket];
  },[tempReswipeBucket]);

  useEffect(() => {
    if (!Object.keys(reswipedDrops).length) return;

    setTempReswipeBucket(Object.keys(reswipedDrops).map((key) => reswipedDrops[key]))
    setCurrentCounter(Object.keys(reswipedDrops).length);
    setRoundLength(Object.keys(reswipedDrops).length);
    counterRef.current = Object.keys(reswipedDrops).length;
  }, [reswipedDrops]);

  const openDateMenu = () => {
    setDateMenuOpen(true);
  };

  const handleReswipe = (dir, drop_id) => {
    let newArray = tempRef.current.filter((value) => value.id !== drop_id);
    let currCAndCurrL = newArray.length;

    if (dir === "right") {
      saveDrop(idToken, drop_id);
      currCAndCurrL += 1;
    } else {
      unsaveDrop(idToken, drop_id);
      setTempReswipeBucket(newArray);
    }
    if (newArray.length === 4 && dir !== "right") {
      setRoundLength(4);
      setCurrentCounter(4);
      counterRef.current = 4;
      setIsReswipeStarted(false);
      setIsFinal4Left(true);
      setDeletedFinalFour(new Array(4).fill(false));
    } else if (
      (newArray.length === 0 && dir === "right") ||
      (newArray.length === 0 && dir === "left")
    ) {
      setReswipeComplete(true);
      setIsReswipeStarted(false);
    }else if(newArray.length === 1 && dir==="left" && counterRef.current - 1 === 0){
      setReswipeComplete(true);
      setIsReswipeStarted(false);
    }else if (counterRef.current - 1 === 0) {
      setRoundLength(currCAndCurrL);
      setCurrentCounter(currCAndCurrL);
      counterRef.current = counterRef.current - 1;
      setIsReswipeStarted(false);
      setShowRestartReSwipeMessage(true);
    } else {
      setCurrentCounter(counterRef.current - 1);
      counterRef.current = counterRef.current - 1;
    }
  };

  const onChangeFinalFourDelete = (isDeleted, index) => {
    let newDeletedFinal4 = [...deletedFinalFour];
    newDeletedFinal4[index] = isDeleted;
    setDeletedFinalFour(newDeletedFinal4);
  };

  const handleFinalFourClose = () => {
    setIsFinal4Left(false);
    let newTempReswipeBuckets = [];
    tempRef.current.map((drop, index) => {
      if (deletedFinalFour[index]) {
        unsaveDrop(idToken, drop.id);
      } else {
        saveDrop(idToken, drop.id);
        newTempReswipeBuckets.push(drop);
      }
    });
    if (newTempReswipeBuckets.length === 4) {
      setRoundLength(4);
      setCurrentCounter(4);
      counterRef.current = 4;
      setIsReswipeStarted(false);
      setShowRestartReSwipeMessage(true);
    } else if (newTempReswipeBuckets.length > 1) {
      setRoundLength(newTempReswipeBuckets.length);
      setCurrentCounter(newTempReswipeBuckets.length);
      counterRef.current = newTempReswipeBuckets.length;
      setIsReswipeStarted(true);
    } else {
      setReswipeComplete(true);
      setIsReswipeStarted(false);
    }
    setTempReswipeBucket(newTempReswipeBuckets);
  };

  const handleClose = () => {
    const newBucket = {};
    tempReswipeBucket.map((drop) => {
      newBucket[drop.id] = drop;
    });
    dispatch({
      type: "SET_RESWIPE_BUCKET",
      payload: { newBucket, tab: curTab },
    });
    // history.push("/profile/saved");
    history.push("/profile")
  };

  return (
    <MainContainer className={"container-reswipe"}>
      <DateMenu
        open={dateMenuOpen}
        setOpen={setDateMenuOpen}
        openItem={selectDate}
        setSelectedDate={setSelectedDate}
      />
      {/* <HeaderBar
        // openHome={() => openHome()}
        // openMenu={() => openMenu()}
        isLogoNotVisible
        curIndex={new Date().getTime()}
        openDateMenu={() => openDateMenu()}
        selectedDropdownDate={selectedDropdownDate}
        datePickerVisible={detailView ? false : true}
        userLoggedIn={currentUser && currentUser.uid}
        userImageVisible={true}
      /> */}
      {currentDetailIndex === null ? (
        !reswipeComplete ? (
          <>
            {!isFinal4Left &&
              !showRestartReSwipeMessage &&
              !isReswipeStarted && <IntroScreen />}
            {showRestartReSwipeMessage && (
              <RestartScreen selectionCount={tempReswipeBucket.length} />
            )}
            {isFinal4Left && (
              <FinalFour
                deleted={deletedFinalFour}
                bucket={tempReswipeBucket}
                onChange={onChangeFinalFourDelete}
                onExpand={(index) => setCurrentDetailIndex(index)}
              />
            )}
            {isReswipeStarted && (
              <div classNAme="rel"
              style={{marginTop: 'var(--main-header-margin-top)'}}>
                <ProgressBar
                  key="progressBar"
                  size={roundLength}
                  closeReswipe={() => {
                    handleClose();
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
        )
      ) : (
        <ReswipeCard>
          <ProfileDropDetail
            drop={tempReswipeBucket[currentDetailIndex]}
            isSaved={true}
            closeDetailView={() => {
              setCurrentDetailIndex(null);
            }}
            style={{width: '100%'}}
          />
        </ReswipeCard>
        
      )}
      {}

      <ReswipedButtonContainer
        style={{ display: currentDetailIndex === null ? "block" : "none" }}
      >
        {!reswipeComplete ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            {!!tempReswipeBucket.length && !isFinal4Left && !showRestartReSwipeMessage && !isReswipeStarted && (
              <button
                className={"main-button-2 clickable"}
                onClick={() => setIsReswipeStarted(true)}
                style={{ width: "calc(100% - 50px )", textAlign: "center" }}
              >
                <h1 style={{ textAlign: "center", width: "100%", fontSize: '24px' }}> Start </h1>
              </button>
            )}
            {showRestartReSwipeMessage && (
              <div
                style={{
                  width: "calc(100% - 50px)",
                  borderRadius: "8px",
                  display: "flex",
                }}
              >
                <button
                  className={"main-button-2 clickable"}
                  onClick={() => handleClose()}
                  style={{
                    width: "50%",
                    borderRadius: "0px",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }}
                >
                  <h1 style={{ textAlign: "center", width: "100%" }}>
                    I want {tempReswipeBucket.length}!
                  </h1>
                </button>
                <button
                  className={"main-button-2 clickable"}
                  style={{
                    width: "50%",
                    borderRadius: "0px",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                  onClick={() => {
                    if (tempReswipeBucket.length !== 4) {
                      setIsReswipeStarted(true);
                      setShowRestartReSwipeMessage(false);
                      counterRef.current = tempReswipeBucket.length;
                    } else {
                      setIsFinal4Left(true);
                      setShowRestartReSwipeMessage(false);
                      setDeletedFinalFour(new Array(4).fill(false));
                      counterRef.current = tempReswipeBucket.length;
                    }
                  }}
                >
                  <h1 style={{ textAlign: "center", width: "100%" }}>
                    Reswipe
                  </h1>
                </button>
              </div>
            )}
            {isFinal4Left && (
              <>
                <button
                  className={"main-button-2 clickable"}
                  onClick={() => handleFinalFourClose()}
                  style={{ width: "calc(100% - 50px )" }}
                >
                  <h1 style={{ textAlign: "center", width: "100%" }}>Save</h1>
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            className={"main-button-2 clickable"}
            style={{ width: "calc(100% - 50px )", margin: "0 auto" }}
            onClick={() => {
              handleClose();
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
