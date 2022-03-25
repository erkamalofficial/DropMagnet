import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as DropMagnetAPI from "../../DropMagnetAPI";
import DropList from "../../components/elements/DropList/DropList";
import "./Profile.css";
import TextField from "../../components/elements/TextField/TextField";

import Modal from "../../components/elements/Modal/Modal";
import TextView from "../../components/elements/TextView/TextView";
import Avatar from "../../components/elements/Avatar/Avatar";
import DropDetail from '../../components/detail_page/DropDetail/DropDetail';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../home/tabs";
import { getInitials } from "../../utils";
import EditIcon from '@material-ui/icons/Edit';
import LazyProfile from "./LazyProfile";
import FadeIn from 'react-fade-in';
import LazyDropCells from "./LazyDropCells";
import InstaIcon from "../../assets/insta-icon.png"
import TwitterIcon from "../../assets/twitter-icon.png"
import LoadingModal from "../../components/elements/LoadingModal/LoadingModal";
import { useFetchUserProfileQuery, useGetCategoriesQuery, useFetchUserSavedDropsQuery } from "../../store/api/DropApi";
import { getCategorySymbolByPosition } from "../../utils/category";
import { UserDetails } from "./UserDetails";

const FooterContainer = styled.div`
  margin-top: 16px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  backdrop-filter: blur(50px);
  background-color: #1a1a1a66;
  background-image: none
  @media(max-width: 576px){
    width: calc(100vw-24px);
  }
`;

const TabContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ul {
    margin-bottom: 0;
  }
`;



export default function Profile(props) {
  const { data: allCategories, isSuccess: isCategorySuccess } = useGetCategoriesQuery();
  const { token, userId } = useSelector((state) => state.auth);

  let history = useHistory();
  const [selectedProfileList, setSelectedProfileList] = useState(null);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null)

  const [loading, setLoading] = useState({ profile: true, drops: true });
  const [fetchingPosts, setFetchingPosts] = useState(true)

  const [curDrop, setCurDrop] = useState({});
  const [detailView, setDetailView] = useState(false);
  const [currSavedPosts, setCurrSavedPosts] = useState([])

  const currUserPosts = scheduledPosts.filter((value) => value.category === activeTabSymbol);

  const [activeTabSymbol, setActiveTabSymbol] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);


  useEffect(() => {
    setTimeout(() => {
      props.setReload(false)
    }, 500);
  }, [])

  useEffect(() => {
    const isSaved = history.location.pathname.split('/')[2] === 'saved'
    if (scheduledPosts.length > 0 && !isSaved) {
      setSelectedProfileList("scheduled")
    }
    else if (isSaved) {
      setSelectedProfileList("saved")
    }
    else if (!fetchingPosts) {
      setSelectedProfileList("saved")
    }
  }, [scheduledPosts.length, fetchingPosts]) //scheduledPosts.length, fetchingPosts


  const { data: fetchedProfile, isSuccess: isProfileFetched } = useFetchUserProfileQuery(userId, { skip: !userId })
  useEffect(() => {
    if (!isProfileFetched) {
      setLoading({ ...loading, profile: true })
    }
    else {
      setLoading({ ...loading, profile: false })
      setFetchingPosts(false)
      setUserProfile(fetchedProfile)
    }
  }, [userId, fetchedProfile]) //

  useEffect(() => {
    if (userId) {
      if (!loading.drops) {
        setLoading({ ...loading, drops: true })
      }
      DropMagnetAPI.getUserPosts(userId, token).then((res) => {
        setScheduledPosts(res || []);
        setFetchingPosts(false)
        setTimeout(() => {
          setLoading({ ...loading, drops: false })
        }, 400)

      }).catch((err) => {
        setLoading({ ...loading, drops: false })
      });
    }
  }, []);

  const { data: userSavedPosts, isSuccess, isFetching } = useFetchUserSavedDropsQuery(activeTabSymbol, { skip: !activeTabSymbol })
  useEffect(() => {
    if (!activeTabSymbol || !userId) return;
    if (userSavedPosts === null && isSuccess) {
      setLoading({ ...loading, drops: false })
      setSavedPosts([]);
      setCurrSavedPosts([]);
    } else {
      setSavedPosts(userSavedPosts);
      setLoading({ ...loading, drops: false })
      const currUserSavedPosts = userSavedPosts && userSavedPosts.filter((value) => value.category === activeTabSymbol);
      setCurrSavedPosts(currUserSavedPosts ? currUserSavedPosts : [])
    }
  }, [userId, userSavedPosts, activeTabSymbol])


  function openDrop() { }

  function openHome() {
    history.push("/");
  }

  function renderDrops(drops, isSaved = false) {
    return (
      <DropList
        drops={drops}
        user={userProfile}
        isSaved={isSaved}
        onClick={openDrop}
        setDetailView={setDetailView}
        setCurDrop={setCurDrop}
      />
    );
  }

  function renderDetail() {
    return (
      <div>
        <DropDetail
          isSaved={selectedProfileList === "saved"}
          show={true}
          drop={curDrop}
          closeDetailView={() => setDetailView(false)}
          handleClick={() => console.log("Click")}
          user={userProfile}
        />
      </div>
    );
  }


  useEffect(() => {
    // First rendering
    if (props.reload) {
      sessionStorage.setItem('headerLoad', 'true')
    }
    else if (!props.reload && sessionStorage.headerLoad) {
      sessionStorage.removeItem('headerLoad')
    }
  }, [])

  useEffect(() => {
    if (!isCategorySuccess) return
    const categorySymbol = getCategorySymbolByPosition(activeTabIndex, allCategories)
    setActiveTabSymbol(categorySymbol)
  }, [activeTabIndex, isCategorySuccess])

  const handleActiveIndex = (index) => {
    setActiveTabIndex(index)
  }

  return (
    <div>
      {(loading.profile && loading.drops) ? (
        <div>
          <LazyProfile />
          <div
            style={{
              margin: "0 auto",
              maxWidth: "600px",
              display: `${detailView ? "none" : "block"}`,
            }}
          >
            <FadeIn delay={300}>
              <LazyDropCells />
            </FadeIn>
          </div>

        </div>
      ) : ((loading.drops || isFetching) && userProfile) ?
        (
          <>
            <div className="profile-container">
              <UserDetails userProfile={userProfile} detailView={detailView} />

              <div
                style={{
                  margin: "0 auto",
                  display: `${detailView ? "none" : "block"}`,
                }}
              >
                <TabContainer>
                  <Tabs activeTabIndex={activeTabIndex} setActiveTabIndex={handleActiveIndex} />
                </TabContainer>
              </div>

              <div
                style={{
                  margin: "0 auto",
                  maxWidth: "600px",
                  display: `${detailView ? "none" : "block"}`,
                }}
              >
                <FooterContainer>
                  {selectedProfileList === "saved" && currSavedPosts && currSavedPosts.length > 0 && (
                    <button
                      className={"main-button-2 floating clickable"}
                      style={{
                        margin: "16px auto 16px auto",
                      }}
                      onClick={() => {
                        history.push(`/reswipe?tabs=${activeTabSymbol}`);
                      }}
                    >
                      <h1 style={{ textAlign: "center", width: "100%" }}>
                        Start Reswipe
                      </h1>
                    </button>
                  )}

                  <div className="profile-button-option-holder">
                    <div className={"profile-button-option"}>My Drops</div>
                    <div className={"profile-button-option"}>Saved</div>
                  </div>

                </FooterContainer>

                <LazyDropCells />
              </div>

              <div style={{ display: `${!detailView ? "none" : "block"}` }}>
                <div className="home-container profile-view-container">
                  {detailView && renderDetail()}
                </div>
              </div>
            </div>
          </>
        )
        :
        (
          <>
            <div className="profile-container">
              {userProfile &&
                <UserDetails userProfile={userProfile} detailView={detailView} />
              }
              <div
                style={{
                  margin: "0 auto",
                  display: `${detailView ? "none" : "block"}`,
                }}
              >
                <TabContainer>
                  <Tabs activeTabIndex={activeTabIndex} setActiveTabIndex={handleActiveIndex} />
                </TabContainer>
              </div>

              <div
                style={{
                  margin: "0 auto",
                  maxWidth: "600px",
                  display: `${detailView ? "none" : "block"}`,
                }}
              >
                <FooterContainer>
                  {(selectedProfileList && selectedProfileList === "saved" && currSavedPosts && currSavedPosts.length !== 0) && (
                    <button
                      className={"main-button-2 floating clickable"}
                      style={{
                        margin: "16px auto 16px auto",
                      }}
                      onClick={() => {
                        history.push(`/reswipe?tabs=${activeTabSymbol}`);
                      }}
                    >
                      <h1 style={{ textAlign: "center", width: "100%" }}>
                        Start Reswipe
                      </h1>
                    </button>
                  )}

                  <div className="profile-button-option-holder">
                    {/* {scheduledPosts.length > 0 ? (
                      <div
                        className={
                          selectedProfileList === "scheduled"
                            ? "profile-button-option-selected"
                            : "profile-button-option"
                        }
                        onClick={() => {
                          setSelectedProfileList("scheduled");
                          setCategoryList(collectibleArts);
                        }}
                      >
                        My Drops ({scheduledPosts.length})
                      </div>
                    ) : (
                      <></>
                    )} */}
                    <div
                      className={
                        selectedProfileList === "scheduled"
                          ? "profile-button-option-selected"
                          : selectedProfileList !== "scheduled" && scheduledPosts.length === 0
                            ? "profile-button-option-disabled"
                            : "profile-button-option"
                      }
                      onClick={() => {
                        if (scheduledPosts.length > 0) {
                          setSelectedProfileList("scheduled");
                        }
                      }}
                    >
                      My Drops ({scheduledPosts.length})
                    </div>
                    <div
                      className={
                        selectedProfileList === "saved"
                          ? "profile-button-option-selected"
                          : "profile-button-option"
                      }
                      onClick={() => {
                        setSelectedProfileList("saved");
                      }}
                    >
                      Saved Drops ({savedPosts && savedPosts.length})
                    </div>
                  </div>

                </FooterContainer>
                {(currUserPosts && currUserPosts.length > 0 && selectedProfileList === "scheduled") ? (
                  renderDrops(currUserPosts)
                ) : (currSavedPosts && currSavedPosts.length > 0 && selectedProfileList === "saved") ? (
                  renderDrops(currSavedPosts, true)
                ) : (currSavedPosts && currSavedPosts.length === 0) ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", height: 50 }}
                    className="profile-bio-description">
                    <p className="redirect-link"> You don't have any drops saved yet. Go to the{" "}
                      <span onClick={() => {
                        sessionStorage.removeItem('headerLoad')
                        props.history.push("/swiper")
                      }}> swiper page
                      </span>{" "}
                      to explore or change category.
                    </p>
                  </div>)
                  :
                  (<div className="profile-bio-description" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", }}>
                    <p className="redirect-link">
                      You don't have any drops.{" "}
                      <span onClick={() => props.history.push("/create_drop")}>
                        Create drop
                      </span>{" "}
                      first.
                    </p>
                  </div>)
                }
              </div>

              <div style={{ display: `${!detailView ? "none" : "block"}` }}>
                <div className="home-container profile-view-container">
                  {detailView && renderDetail()}
                </div>
              </div>
            </div>
          </>
        )}

    </div>
  );
}

