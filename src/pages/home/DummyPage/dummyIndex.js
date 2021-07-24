// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import HeaderBar from "../../../components/elements/HeaderBar/HeaderBar";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchMusic,
    fetchArt,
    fetchColletibles,
    fetchFashion,
    fetchReswipeBuckets,
} from "../actions";
import "../index.css";
import { useHistory } from "react-router";
import { useAuth } from "../../../contexts/FirebaseAuthContext";
import { saveDrop, unsaveDrop } from "../../../DropMagnetAPI";
import { tabList } from "../../../constants";
import DummySwiper from "./dummySwiper";
import LandingPageHeader from "../../../components/elements/HeaderBar/LandingPageHeader";
import PersonalLinksPreview from "../../wallet/personal-links-preview";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div.rel {
    position: relative;
    user-select: none;
    // margin-bottom: 30px;
    padding-top: var(--main-header-margin-top);
    @media (max-width: 500px) {
      padding-top: 10px
    }
  }
`;

const LinksPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  @media (max-width: 576px){
    margin: 0;
  }
`;

const CardContainer = styled.div`
  width: var(--card-container-width);
  height: var(--card-container-height);
  margin-bottom: var(--gap-bottom);
`;

const DummyHome = (props) => {
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

    // useEffect(() => {

    //     let curTime = new Date(selectedDropdownDate).getTime()
    //     let extras = {
    //         token: idToken,
    //         curTime: curTime,
    //         userID: currentUser.uid,
    //         random: true
    //     }
    //     if (activeTabIndex === 1) {
    //         dispatch(fetchMusic({ activeTabIndex: 1, extras: { ...extras, token: idToken } }));
    //     }
    //     else if (activeTabIndex === 0) {
    //         dispatch(fetchArt({ activeTabIndex: 0, extras: { ...extras, token: idToken } }));
    //     }
    //     else if (activeTabIndex === 2) {
    //         dispatch(fetchColletibles({ activeTabIndex: 2, extras: { ...extras, token: idToken } }));
    //     }
    //     else {
    //         dispatch(fetchFashion({ activeTabIndex: 3, extras: { ...extras, token: idToken } }));
    //     }

    // }, [selectedDropdownDate]);

    // useEffect(() => {
    //     currentUser && currentUser.getIdToken().then((idToken) => {
    //         dispatch(fetchReswipeBuckets(idToken));

    //     })
    // }, [dispatch, currentUser]);

    // useEffect(() => {
    //     if (fetchMore) {
    //         let extras = {
    //             token: idToken,
    //             curTime: nextIndex,
    //             userID: currentUser.uid,
    //             random: false
    //         }

    //         if (activeTabIndex === 0) {
    //             dispatch(fetchArt({ activeTabIndex: 0, token: idToken, extras: extras }));
    //         }
    //         else if (activeTabIndex === 1) {
    //             dispatch(fetchMusic({ activeTabIndex: 1, token: idToken, extras: extras }));
    //         }
    //         else if (activeTabIndex === 2) {
    //             dispatch(fetchColletibles({ activeTabIndex: 2, token: idToken, extras: extras }));
    //         }
    //         else {
    //             dispatch(fetchFashion({ activeTabIndex: 3, token: idToken, extras: extras }));
    //         }
    //         setLoadMore(false)

    //     }
    // }, [fetchMore])

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
    // useEffect(() => {
    //     if (reswipeModeActive) {
    //         if (window.confirm("Your Bucket Limit has reached its End ? \n 1. Press ok to 'Upgrade Your Subscription' \n 2. Press Cancel to 'Go To Reswipe'?")) {
    //             history.push('/upgradeSub');
    //         } else {
    //             history.push(`/reswipe?tabs=${currentTabId}`);
    //         }
    //     }
    // }, [reswipeModeActive, currentTabId, history]);
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
        <LinksPage>

            <LandingPageHeader 
            isLoggedIn={localStorage.getItem("userDetails") ? true : false} />
            <HomeContainer>
                <div className="rel">
                    <DummySwiper
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
                </div>
            </HomeContainer>
        </LinksPage>
    );
};

export default React.memo(DummyHome);