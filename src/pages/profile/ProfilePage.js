import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as DropMagnetAPI from "../../DropMagnetAPI";
import DropList from "../../components/elements/DropList/DropList";
import "./Profile.css";
import TextField from "../../components/elements/TextField/TextField";

import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import TextView from "../../components/elements/TextView/TextView";
import Avatar from "../../components/elements/Avatar/Avatar";
import ProfileDropDetail from "../../components/detail_page/DropDetail/ProfileDropDetail";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail"
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Tabs from "../home/tabs";
import { getCategoryFromTab, tabList } from "../../constants";
import { getInitials } from "../../utils";
import FadeIn from "react-fade-in";
import LazyProfile from "./LazyProfile";
import InstaIcon from "../../assets/insta-icon.png"
import TwitterIcon from "../../assets/twitter-icon.png"

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
  const { id } = useParams()

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
    const user_id = id;
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

        // DropMagnetAPI.getSaveDrops(idToken).then((res) => {
        //   console.log(res);
        //   setSavedPosts(res);
        // });

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

  function renderDetail() {
    return (
      <div>
        <DropDetail
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
        <div>
          <LazyProfile hasTabs={false} />
        </div>
      </div>
    );
  } 
  
  else {
    return (
      <>

        <div className="profile-container">
          <div
            className="profile-detail-container"
            style={{ display: `${detailView ? "none" : "flex"}` }}
          >

            <div className="acc-profile-pic">
              <Avatar
                userImage={userImage}
                initial={getInitials(firstName)}
                view_only
                picRef={profilePic}
                onChange={(e) => { }}
                onRemove={() => { }}
              />
            </div>

            <div
              className="profile-large-title clickable"
            >{`${firstName}`}</div>
            <div
              className="profile-handle-title clickable"
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
              >
                <img
                  width={37}
                  height={24}
                  src={TwitterIcon}
                  style={{ paddingRight: "8px" }}
                  alt="/"
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
                    <p>-----</p>
                  )}
                </div>
              </div>
              <div
                style={{ display: "flex", cursor: "pointer" }}
              >
                <img width={24} height={24} src={InstaIcon} alt="/" />
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
                    <p>-----</p>
                  )}
                </div>
              </div>
            </div>
            <div
              className="profile-bio-edit-button clickable"
            >
              {bio ? bio : "-----"}
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
                  {firstName.split(' ')[0]}'s Drops ({scheduledPosts.length})
                </div>
              ) : (
                <></>
              )}
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
            {renderDrops(scheduledPosts)}
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
