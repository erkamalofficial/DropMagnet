import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as DropMagnetAPI from "../../DropMagnetAPI";
import DropList from "../../components/elements/DropList/DropList";
import "./Profile.css";
import TextField from "../../components/elements/TextField/TextField";

import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import Modal from "../../components/elements/Modal/Modal";
import TextView from "../../components/elements/TextView/TextView";
import Avatar from "../../components/elements/Avatar/Avatar";
import ProfileDropDetail from "../../components/detail_page/DropDetail/ProfileDropDetail";
import DropDetail from '../../components/detail_page/DropDetail/DropDetail';
import Spinner from "../../components/blocks/spinner";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../home/tabs";
import { getCategoryFromTab, tabList } from "../../constants";
import { getInitials } from "../../utils";
import EditIcon from '@material-ui/icons/Edit';
import LazyProfile from "./LazyProfile";
import FadeIn from 'react-fade-in';
import LazyDropCells from "./LazyDropCells";
import InstaIcon from "../../assets/insta-icon.png"
import TwitterIcon from "../../assets/twitter-icon.png"
import LoadingModal from "../../components/elements/LoadingModal/LoadingModal";
import { useFetchUserProfileQuery, useGetCategoriesQuery, useFetchUserSavedDropsQuery } from "../../store/api/DropApi";
import { categorySavedBuckets } from "../../store/reducers/CategoryReducer";

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
  const profilePic = useRef(null)
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [selectedProfileList, setSelectedProfileList] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const [userProfile, setUserProfile] = useState(null)

  const dispatch = useDispatch();
  /* For profile edit */
  const [openEditModal, setOpenEditModal] = useState(false);
  const [usernameForm, setUsernameForm] = useState("");
  const [firstNameForm, setFirstNameForm] = useState("");
  const [currentEditField, setCurrentEditField] = useState("");
  const [descriptionForm, setDescriptionForm] = useState("");
  const [twitterHandleForm, setTwitterHandleForm] = useState("");
  const [instaHandleForm, setInstaHandleForm] = useState("");
  const [loading, setLoading] = useState({ profile: true, drops: true });
  const [fetchingPosts, setFetchingPosts] = useState(true)

  const [curDrop, setCurDrop] = useState({});
  const [detailView, setDetailView] = useState(false);
  const [cropModal, setCropModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [seprateTL, setseprateTL] = useState([])
  const [currSavedPosts, setCurrSavedPosts] = useState([])

  const currentTabName = useMemo(() => seprateTL[activeTabIndex], [seprateTL, activeTabIndex]);

  const currUserSavedPosts = savedPosts && savedPosts.filter((value) => value.category === currentTabName);
  const currUserPosts = scheduledPosts.filter((value) => value.category === currentTabName);

  useEffect(() => {
    if (currUserSavedPosts !== undefined) {
      setCurrSavedPosts(currUserSavedPosts)
    }
  }, [currUserSavedPosts])

  useEffect(() => {
    if (allCategories) {
      const en = [];

      for (let i = 0; i < allCategories.categories.length; i++) {
        en.push(allCategories.categories[i].value)
      }
      for (let i = 0; i < allCategories.external_creators.length; i++) {
        en.push(allCategories.external_creators[i].symbol)
      }
      setseprateTL([...en]);
    }
  }, [allCategories])

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
  }, [scheduledPosts.length, fetchingPosts])


  const { data: fetchedProfile, isSuccess: isProfileFetched } = useFetchUserProfileQuery({ token, userId })
  useEffect(() => {
    if (!isProfileFetched) {
      setLoading({ ...loading, profile: true })
    }
    else {
      setLoading({ ...loading, profile: false })
      setFetchingPosts(false)
      setUserProfile(fetchedProfile)
    }
  }, [token, fetchedProfile])

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

  const { data: userSavedPosts, refetch } = useFetchUserSavedDropsQuery({ token: token, symbol: currentTabName })
  useEffect(() => {
    if (!currentTabName || !userId) return;
    refetch()
    if (userSavedPosts === null) {
      setLoading({ ...loading, drops: false })
      setSavedPosts([]);
    }
    else {
      setSavedPosts(userSavedPosts);
    }
    setLoading({ ...loading, drops: false })
  }, [userId, userSavedPosts])


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

  const handleProfileEdit = (field = "") => {
    setCurrentEditField(field);
    setOpenEditModal(true);
    setUsernameForm(userProfile.usename);
    setInstaHandleForm(userProfile.instaHandle);
    setTwitterHandleForm(userProfile.twitterHandle);
    setDescriptionForm(userProfile.bio);
    // setLastNameForm(lastName);
    setFirstNameForm(userProfile.name);
  };

  const renderInput = () => {
    switch (currentEditField) {
      case "username":
        return (
          <TextField
            setInputValue={setUsernameForm}
            title={"Username"}
            titleTopMargin={"24px"}
            value={usernameForm}
            placeholder={"Enter a username"}
          />
        );
      case "insta":
        return (
          <TextField
            setInputValue={setInstaHandleForm}
            title={"Instagram Handle"}
            titleTopMargin={"24px"}
            value={instaHandleForm}
            placeholder={"Enter your Instagram Handle"}
          />
        );

      case "twitter":
        return (
          <TextField
            setInputValue={setTwitterHandleForm}
            title={"Twitter Handle"}
            titleTopMargin={"24px"}
            value={twitterHandleForm}
            placeholder={"Enter your Twitter Handle"}
          />
        );

      case "bio":
        return (
          <TextView
            height={"100px"}
            titleTopMargin={"24px"}
            setInputValue={setDescriptionForm}
            value={descriptionForm}
            title={"Your Bio"}
            placeholder={"Tell us about your self (max 300 words)"}
          />
        );

      case "name":
        return (
          <>
            <TextField
              setInputValue={setFirstNameForm}
              title={"Full Name"}
              titleTopMargin={"24px"}
              value={firstNameForm}
              placeholder={"Enter your Full Name"}
            />
            {/* <TextField
              setInputValue={setLastNameForm}
              title={"Last Name"}
              titleTopMargin={"24px"}
              value={lastNameForm}
              placeholder={"Enter your Last Name"}
            /> */}
          </>
        );

      default:
        return null;
    }
  };

  const updateDetails = (field, value) => {
    setUpdating(true)
    if (field === 'username') {
      if (value.split(' ').length > 1) {
        alert("Username cannot have space.")
        setUpdating(false)
        return
      }
    }
    if (value === undefined) {
      setUpdating(false)
      return;
    }

    if (value === userProfile[field]) {
      alert(`It is same as previous ${field}. Try new one.`)
      setUpdating(false)
      return;
    }

    DropMagnetAPI.updateUserDetails(field, value, token).then((res) => {
      DropMagnetAPI.getUserProfile(userId, token).then(function (response) {
        if (response.status === "error") {
        } else {
          setUserProfile(response)
        }
      });
      if (res.status === 200) {
        alert("Successfully updated.")
        setUpdating(false)
      }
      else {
        alert("Username already exists. Try different username.")
        setUpdating(false)
      }
    });
  };


  const saveForm = () => {
    switch (currentEditField) {
      case "username": {
        /*API Call*/
        updateDetails("username", usernameForm);
        setUsernameForm("");
        break;
      }
      case "insta": {
        /*API Call to save*/
        updateDetails("insta_url", instaHandleForm);
        setInstaHandleForm("");
        break;
      }

      case "twitter": {
        // API Call TO Save
        updateDetails("twitter_url", twitterHandleForm);
        setTwitterHandleForm("");
        break;
      }

      case "bio": {
        // API Call To Save
        updateDetails("bio", descriptionForm);
        setDescriptionForm("");
        break;
      }

      case "name": {
        // API Call To Save
        updateDetails("name", firstNameForm);
        setFirstNameForm("");

        break;
      }

      default:
        return null;
    }
    setOpenEditModal(false);
  };

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


  return (
    <div>
      {updating && (
        <LoadingModal label="Updating...." />
      )}
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
      ) : (loading.drops) ?
        (
          <>
            <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
              {renderInput()}
              <div
                className={"main-button-container"}
                style={{ textAlign: "center" }}
              >
                <button className="main-button" onClick={saveForm}>
                  {"Save"}
                </button>
              </div>
            </Modal>
            <div className="profile-container">
              <div
                className="profile-detail-container"
                style={{ display: `${detailView ? "none" : "flex"}` }}
              >

                <div className="acc-profile-pic">
                  <Avatar
                    userImage={userProfile.userImage}
                    initial={getInitials(userProfile.name)}
                    picRef={profilePic}
                    cropModal={cropModal}
                    setCropModal={setCropModal}
                    setUploading={setUploading}
                    uploading={uploading}
                    onChange={(file) => {
                      DropMagnetAPI.updateUserAvatar(file, file.type, token)
                        .then(function (res) {
                          window.location.reload()
                        })
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        setUserProfile({ ...userProfile, userImage: fileReader.result })
                        // setUserImage(fileReader.result);
                      };
                      fileReader.readAsDataURL(file);
                    }}
                    onRemove={() => {
                      DropMagnetAPI.updateUserAvatar(null, '', token).then((res) =>
                        window.location.reload()
                      );
                    }
                    }
                  />
                  <div className="edit-btn"
                    onClick={() => profilePic.current.click()}>
                    <EditIcon className="svg-icon" />
                  </div>
                </div>
                {/* <img style={{borderRadius: '70px'}} width={120} height={120} src={userImage === "" ? "./add-user-icon.png" : userImage}/> */}
                <div
                  className="profile-large-title clickable"
                  onClick={() => handleProfileEdit("name")}
                >{`${userProfile.name}`}</div>
                <div
                  className="profile-handle-title clickable"
                  onClick={() => handleProfileEdit("username")}
                >
                  {`@${userProfile.username}`}
                </div>
                <div style={{ display: "flex", paddingBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      paddingRight: "24px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleProfileEdit("twitter")}
                  >
                    <img
                      width={37}
                      height={24}
                      src={TwitterIcon}
                      style={{ paddingRight: "8px" }}
                      alt="/"
                    />
                    <div className="profile-medium-title">

                      {userProfile && userProfile.twitter_url && userProfile.twitter_url.length > 8 ? (
                        <div className="socialHandle">
                          @
                          <p className="truncate">{userProfile.twitter_url.substring(0, userProfile.twitter_url.length - 4)}</p>
                          <p className="last">{userProfile.twitter_url.substring(userProfile.twitter_url.length - 4)}</p>
                        </div>
                      )
                        : userProfile.twitter_url.length <= 8 ? <p>@{userProfile.twitter_url}</p>
                          : <p>Add Twitter</p>
                      }
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", cursor: "pointer" }}
                    onClick={() => handleProfileEdit("insta")}
                  >
                    <img width={24} height={24} src={InstaIcon} alt="/" />
                    <div
                      className="profile-medium-title"
                      style={{ marginLeft: "10px" }}
                    >
                      {userProfile && userProfile.insta_url && userProfile.insta_url.length > 8 ? (
                        <div className="socialHandle">
                          @
                          <p className="truncate">
                            {userProfile.insta_url.substring(0, userProfile.insta_url.length - 4)}
                          </p>
                          <p className="last">
                            {userProfile.insta_url.substring(userProfile.insta_url.length - 4)}
                          </p>
                        </div>
                      ) : userProfile.insta_url.length <= 8 ? (
                        <p>@{userProfile.insta_url}</p>
                      ) : (
                        <p>Add Instagram</p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="profile-bio-edit-button clickable"
                  onClick={() => handleProfileEdit("bio")}
                >
                  {userProfile.bio ? userProfile.bio : "Tap to Add Bio"}
                </div>
              </div>

              <div
                style={{
                  margin: "0 auto",
                  display: `${detailView ? "none" : "block"}`,
                }}
              >
                <TabContainer>
                  <Tabs
                    activeTabIndex={activeTabIndex}
                    handleActiveTabIndex={(index) => {
                      setActiveTabIndex(index);
                    }}
                    tabList={tabList}
                  />
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
                        // dispatch(categorySavedBuckets({ newBucket: savedPosts }));
                        history.push(`/reswipe?tabs=${seprateTL[activeTabIndex]}`);
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
            <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
              {renderInput()}
              <div
                className={"main-button-container"}
                style={{ textAlign: "center" }}
              >
                <button className="main-button" onClick={saveForm}>
                  {"Save"}
                </button>
              </div>
            </Modal>
            <div className="profile-container">
              {userProfile &&
                <div
                  className="profile-detail-container"
                  style={{ display: `${detailView ? "none" : "flex"}` }}
                >

                  <div className="acc-profile-pic">
                    <Avatar
                      userImage={userProfile.avator_url || props.userImage}
                      initial={getInitials(userProfile.name)}
                      picRef={profilePic}
                      cropModal={cropModal}
                      setCropModal={setCropModal}
                      setUploading={setUploading}
                      uploading={uploading}
                      onChange={(file) => {
                        DropMagnetAPI.updateUserAvatar(file, file.type, token)
                          .then(function (res) {
                            window.location.reload()
                          })
                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                          setUserProfile({ ...userProfile, userImage: fileReader.result })
                        };
                        fileReader.readAsDataURL(file);
                      }}
                      onRemove={() => {
                        DropMagnetAPI.updateUserAvatar(null, '', token).then((res) =>
                          window.location.reload()
                        );
                      }
                      }
                    />
                    <div className="edit-btn"
                      onClick={() => profilePic.current.click()}>
                      <EditIcon className="svg-icon" />
                    </div>
                  </div>
                  {/* <img style={{borderRadius: '70px'}} width={120} height={120} src={userImage === "" ? "./add-user-icon.png" : userImage}/> */}
                  <div
                    className="profile-large-title clickable"
                    onClick={() => handleProfileEdit("name")}
                  >{`${userProfile.name || ''}`}</div>
                  <div
                    className="profile-handle-title clickable"
                    onClick={() => handleProfileEdit("username")}
                  >
                    {`@${userProfile.username}`}
                  </div>
                  <div style={{ display: "flex", paddingBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        paddingRight: "24px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleProfileEdit("twitter")}
                    >
                      <img
                        width={37}
                        height={24}
                        src={TwitterIcon}
                        style={{ paddingRight: "8px" }}
                        alt="/"
                      />
                      <div className="profile-medium-title">
                        {userProfile && userProfile.twitter_url.length > 8 ? (
                          <div className="socialHandle">
                            @
                            <p className="truncate">
                              {userProfile.twitter_url.substring(0, userProfile.twitter_url.length - 4)}
                            </p>
                            <p className="last">
                              {userProfile.twitter_url.substring(userProfile.twitter_url.length - 4)}
                            </p>
                          </div>
                        ) : userProfile.twitter_url.length <= 8 ? (
                          <p>@{userProfile.twitter_url}</p>
                        ) : (
                          <p>Add Twitter</p>
                        )}
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", cursor: "pointer" }}
                      onClick={() => handleProfileEdit("insta")}
                    >
                      <img width={24} height={24} src={InstaIcon} alt="/" />
                      <div
                        className="profile-medium-title"
                        style={{ marginLeft: "10px" }}
                      >
                        {userProfile && userProfile.insta_url.length > 8 ? (
                          <div className="socialHandle">
                            @
                            <p className="truncate">
                              {userProfile.insta_url.substring(0, userProfile.insta_url.length - 4)}
                            </p>
                            <p className="last">
                              {userProfile.insta_url.substring(userProfile.insta_url.length - 4)}
                            </p>
                          </div>
                        ) : userProfile.insta_url.length <= 8 ? (
                          <p>@{userProfile.insta_url}</p>
                        ) : (
                          <p>Add Instagram</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="profile-bio-edit-button clickable"
                    onClick={() => handleProfileEdit("bio")}
                  >
                    {userProfile.bio ? userProfile.bio : "Tap to Add Bio"}
                  </div>
                </div>
              }
              <div
                style={{
                  margin: "0 auto",
                  display: `${detailView ? "none" : "block"}`,
                }}
              >
                <TabContainer>
                  <Tabs
                    activeTabIndex={activeTabIndex}
                    handleActiveTabIndex={(index) => {
                      setActiveTabIndex(index);
                    }}
                    tabList={tabList}
                  />
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
                  {(selectedProfileList === "saved" && currSavedPosts && currSavedPosts.length !== 0) && (
                    <button
                      className={"main-button-2 floating clickable"}
                      style={{
                        margin: "16px auto 16px auto",
                      }}
                      onClick={() => {
                        dispatch(categorySavedBuckets({ newBucket: savedPosts }));
                        history.push(`/reswipe?tabs=${seprateTL[activeTabIndex]}`);
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

                {currUserPosts.length > 0 &&
                  selectedProfileList === "scheduled" ? (
                  renderDrops(currUserPosts)
                ) : currSavedPosts.length > 0 && selectedProfileList === "saved" ? (
                  renderDrops(
                    currSavedPosts,
                    true
                  )
                ) : currSavedPosts.length === 0 ? (
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
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                    className="profile-bio-description"
                  >
                    <p className="redirect-link">
                      You don't have any drops.{" "}
                      <span onClick={() => props.history.push("/create_drop")}>
                        Create drop
                      </span>{" "}
                      first.
                    </p>
                  </div>
                )}
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

