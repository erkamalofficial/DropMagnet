import React, { useState, useEffect, useRef } from "react";
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
import Spinner from "../../components/blocks/spinner";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Tabs from "../home/tabs";
import { getCategoryFromTab, tabList } from "../../constants";
import { getInitials } from "../../utils";
import EditIcon from '@material-ui/icons/Edit';

const ButtonContainer = styled.div`
  margin-top: 16px;
  position: fixed;
  bottom: 32px;
  z-index: 999;
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

export default function ProfilePage(props) {

  const profilePic = useRef(null)

  const [handle, setHandle] = useState("");

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [userImage, setUserImage] = useState(props.userImage);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [bio, setBio] = useState("Bio");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProfileList, setSelectedProfileList] = useState("scheduled");
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  /* For profile edit */
  const [openEditModal, setOpenEditModal] = useState(false);
  const [usernameForm, setUsernameForm] = useState("");
  const [firstNameForm, setFirstNameForm] = useState("");
  const [currentEditField, setCurrentEditField] = useState("");
  const [descriptionForm, setDescriptionForm] = useState("");
  const [twitterHandleForm, setTwitterHandleForm] = useState("");
  const [instaHandleForm, setInstaHandleForm] = useState("");
  const [loading, setLoading] = useState(true);

  const [curDrop, setCurDrop] = useState({});
  const [detailView, setDetailView] = useState(false);

  const { currentUser } = useAuth();

  let history = useHistory();

  const currentTabName = getCategoryFromTab(tabList[activeTabIndex]);

  const currSavedPosts = savedPosts.filter((value) => value.category === currentTabName);

  let collectibleArts = [
    {
      drop_id: 9,
      title: "Best ever collectible you can get",
      description: "My wonderful art was done by da Vinci",
      artist: "Crypto Art Man",
      artist_image:
        "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      drop_image:
        "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
      category: "Art",
      drop_date: "22-03-2021",
      marketplace: "Rarible",
      marketplace_id: "https://rarible.com/iconow?tab=collectibles",
      drop_pieces: 9,
    },
    {
      drop_id: 10,
      title: "Best ever collectible you can get",
      description: "My wonderful art was done by da Vinci",
      artist: "Crypto Art Man",
      artist_image:
        "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      drop_image:
        "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
      category: "Art",
      drop_date: "22-03-2021",
      marketplace: "Rarible",
      marketplace_id: "https://rarible.com/iconow?tab=collectibles",
      drop_pieces: 9,
    },
  ];

  let fashionArts = [
    {
      drop_id: 9,
      title: "Bring those Guccis out",
      description: "My wonderful art was done by da Vinci",
      artist: "Crypto Art Man",
      artist_image:
        "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      drop_image:
        "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
      category: "Art",
      drop_date: "22-03-2021",
      marketplace: "Rarible",
      marketplace_id: "https://rarible.com/iconow?tab=collectibles",
      drop_pieces: 9,
    },
    {
      drop_id: 10,
      title: "Bring those Guccis out",
      description: "My wonderful art was done by da Vinci",
      artist: "Crypto Art Man",
      artist_image:
        "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      drop_image:
        "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
      category: "Art",
      drop_date: "22-03-2021",
      marketplace: "Rarible",
      marketplace_id: "https://rarible.com/iconow?tab=collectibles",
      drop_pieces: 9,
    },
  ];

  useEffect(() => {
    setCategoryList(collectibleArts);
    const user_id = currentUser.uid;
    currentUser
      .getIdToken(false)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        console.log("id token is", idToken);
        console.log(currentUser);
        DropMagnetAPI.getUserProfile(user_id, idToken).then(function (
          response
        ) {
          console.log("user profile response", response);
          if (response.status === "error") {
            setLoading(false);
          } else {
            setFirstName(response.name);
            setHandle(response.username);
            setBio(response.bio);
            setInstaHandle(response.insta_url.split("/").pop());
            setTwitterHandle(response.twitter_url.split("/").pop());
            setUserImage(response.avatar_url || "");
            setUser(response);
          }
        });

        DropMagnetAPI.getSaveDrops(idToken).then((res) => {
          console.log(res);
          setSavedPosts(res);
        });

        DropMagnetAPI.getUserPosts(user_id, idToken)
          .then((res) => {
            setScheduledPosts(res);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch(function (error) {
        // Handle error
      });
  }, []);

  function fetchUser() { }

  function openDrop() { }

  function openHome() {
    history.push("/");
  }

  function renderDrops(drops, isSaved = false) {
    return (
      <DropList
        drops={drops}
        user={user}
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
    setUsernameForm(handle);
    setInstaHandleForm(instaHandle);
    setTwitterHandleForm(twitterHandle);
    setDescriptionForm(bio);
    // setLastNameForm(lastName);
    setFirstNameForm(firstName);
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
    currentUser.getIdToken(false).then(function (idToken) {
      DropMagnetAPI.updateUserDetails(field, value, idToken).then((res) =>
        alert("Successfully updated.")
      );
    });
  };
  const saveForm = () => {
    switch (currentEditField) {
      case "username": {
        /*API Call*/
        setHandle(usernameForm);
        updateDetails("username", usernameForm);
        setUsernameForm("");
        break;
      }
      case "insta": {
        /*API Call to save*/
        setInstaHandle(instaHandleForm);
        updateDetails("insta_url", instaHandleForm);
        setInstaHandleForm("");
        break;
      }

      case "twitter": {
        // API Call TO Save
        setTwitterHandle(twitterHandleForm);
        updateDetails("twitter_url", twitterHandleForm);
        setTwitterHandleForm("");
        break;
      }

      case "bio": {
        // API Call To Save
        setBio(descriptionForm);
        updateDetails("bio", descriptionForm);
        setDescriptionForm("");
        break;
      }

      case "name": {
        // API Call To Save
        setFirstName(firstNameForm);
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
        <ProfileDropDetail
          isSaved={selectedProfileList === "saved"}
          show={true}
          drop={curDrop}
          closeDetailView={() => setDetailView(false)}
          handleClick={() => console.log("Click")}
          user={user}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <HeaderBar
          openHome={() => openHome()}
          userLoggedIn={props.userLoggedIn}
          userImage={userImage}
          userDetails={props.userDetails}
        />
        <div style={{ marginTop: "60px" }}>
          <Spinner />
        </div>
      </div>
    );
  } else {
    return (
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
          <div className="fixed-container">
            <HeaderBar
              openHome={() => openHome()}
              userLoggedIn={props.userLoggedIn}
              userImage={userImage}
              userDetails={props.userDetails}
            />
          </div>
          <div
            className="profile-detail-container"
            style={{ display: `${detailView ? "none" : "flex"}` }}
          >

            <div className="acc-profile-pic">
              <Avatar
                userImage={userImage}
                initial={getInitials(firstName)}
                picRef={profilePic}
                onChange={(e) => {
                  if (e.target.files) {
                    if (e.target.files[0]) {
                      const file = e.target.files[0]
                      currentUser.getIdToken(false).then(function (idToken) {
                        DropMagnetAPI.updateUserAvatar(file, file.type, idToken).then((res) =>
                          alert("Successfully updated.")
                        );
                      });
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        setUserImage(fileReader.result);
                      };
                      fileReader.readAsDataURL(e.target.files[0]);
                    }
                  }
                }}
                onRemove={() => setUserImage("")}
              />
              <div className="edit-btn"
              onClick={() => profilePic.current.click()}>
                <EditIcon className="svg-icon"/>
              </div>
            </div>
            {/* <img style={{borderRadius: '70px'}} width={120} height={120} src={userImage === "" ? "./add-user-icon.png" : userImage}/> */}
            <div
              className="profile-large-title clickable"
              onClick={() => handleProfileEdit("name")}
            >{`${firstName}`}</div>
            <div
              className="profile-handle-title clickable"
              onClick={() => handleProfileEdit("username")}
            >
              {"@" + handle}
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
                  src="./twitter-icon.png"
                  style={{ paddingRight: "8px" }}
                />
                <div className="profile-medium-title">
                  {twitterHandle !== "" && twitterHandle.length > 8 ? (
                    <div className="socialHandle">
                      @
                      <p className="truncate">
                        {twitterHandle.substring(0, twitterHandle.length - 4)}
                      </p>
                      <p className="last">
                        {twitterHandle.substring(twitterHandle.length - 4)}
                      </p>
                    </div>
                  ) : twitterHandle.length <= 8 ? (
                    <p>@{twitterHandle}</p>
                  ) : (
                    <p>Add Twitter</p>
                  )}
                </div>
              </div>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => handleProfileEdit("insta")}
              >
                <img width={24} height={24} src="./insta-icon.png" />
                <div
                  className="profile-medium-title"
                  style={{ marginLeft: "10px" }}
                >
                  {instaHandle !== "" && instaHandle.length > 8 ? (
                    <div className="socialHandle">
                      @
                      <p className="truncate">
                        {instaHandle.substring(0, instaHandle.length - 4)}
                      </p>
                      <p className="last">
                        {instaHandle.substring(instaHandle.length - 4)}
                      </p>
                    </div>
                  ) : instaHandle.length <= 8 ? (
                    <p>@{instaHandle}</p>
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
              {bio ? bio : "Tap to Add Bio"}
            </div>
          </div>

          <div
            style={{
              margin: "0 auto",
              maxWidth: "600px",
              display: `${detailView ? "none" : "block"}`,
            }}
          >
            <div className="profile-button-option-holder">
              {scheduledPosts.length > 0 ? (
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
              )}
              <div
                className={
                  selectedProfileList === "saved"
                    ? "profile-button-option-selected"
                    : "profile-button-option"
                }
                onClick={() => {
                  setSelectedProfileList("saved");
                  setCategoryList(fashionArts);
                }}
              >
                Saved Drops ({savedPosts.length})
              </div>
            </div>
            {selectedProfileList === "saved" && savedPosts.length !== 0 && (
              <TabContainer>
                <Tabs
                  activeTabIndex={activeTabIndex}
                  handleActiveTabIndex={(index) => {
                    setActiveTabIndex(index);
                  }}
                  tabList={tabList}
                />
              </TabContainer>
            )}
            {selectedProfileList === "saved" && currSavedPosts.length !== 0 && (
              <ButtonContainer>
                <button
                  className={"main-button-2 floating clickable"}
                  style={{ margin: "0 12px" }}
                  onClick={() => {
                    dispatch({
                      type: "START_RESWIPE",
                      payload: { newBucket: savedPosts },
                    });
                    history.push(`/reswipe?tabs=${tabList[activeTabIndex]}`);
                  }}
                >
                  <h1 style={{ textAlign: "center", width: "100%" }}>
                    Start Reswipe
                  </h1>
                </button>
              </ButtonContainer>
            )}
            {scheduledPosts.length > 0 &&
              selectedProfileList === "scheduled" ? (
              renderDrops(scheduledPosts)
            ) : currSavedPosts.length > 0 && selectedProfileList === "saved" ? (
              renderDrops(
                currSavedPosts,
                true
              )
            ) : currSavedPosts.length === 0 ? (
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
                  You don't have any drops saved yet. Go to the{" "}
                  <span onClick={() => props.history.push("/home")}>
                    swiper page
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
    );
  }
}