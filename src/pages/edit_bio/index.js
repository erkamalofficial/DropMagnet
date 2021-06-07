import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as DropMagnetAPI from "../../DropMagnetAPI";
import TextField from "../../components/elements/TextField/TextField";
import PriceTextField from "../../components/elements/PriceTextField/PriceTextField";
import Dropdown from "../../components/elements/Dropdown/Dropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../components/elements/Calendar/calendar.css";
import DropzoneComponent from "../../components/elements/DropzoneComponent/DropzoneComponent";
import PageIndexItem from "../../components/elements/PageIndexItem/PageIndexItem";
import TextView from "../../components/elements/TextView/TextView";
import PriceOptionButton from "../../components/elements/PriceOptionButton/PriceOptionButton";
import DateCell from "../../components/elements/DateCell/DateCell";
import ScrollMenu from "react-horizontal-scrolling-menu";
import {
  Menu,
  ArrowLeft,
  ArrowRight,
} from "../../components/elements/DateDragBarComponent/DateDragBarComponent";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import "../../components/detail_page/DateMenu/DateMenu.css";
import Avatar from "../../components/elements/Avatar/Avatar";

export default function EditBio(props) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [userImage, setUserImage] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [instaHandle, setInstaHandle] = useState("");

  let history = useHistory();

  const { currentUser } = useAuth();

  function saveProfile() {
    // API Call
  }

  function getTitle() {
    return (
      "Hey" +
      (props.userHandle ? " @" + props.userHandle : "!") +
      ", Let’s Update Your Profile."
    );
  }

  function renderForm() {
    return (
      <div>
        <div style={{display: 'flex',justifyContent: 'center'}}>
          <Avatar
            userImage={userImage}
            onChange={(e) => {
              console.log('file Change',e);
              if (e.target.files) {
                if(e.target.files[0]){
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    setUserImage(fileReader.result);
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }
              }
            }}
            onRemove={()=>setUserImage('')}
          />
        </div>

        <TextField
          setInputValue={setUsername}
          title={"Username"}
          value={username}
          placeholder={"Enter a username"}
        />
        <div className={"social-handle-fields"}>
          <TextField
            setInputValue={setTwitterHandle}
            value={twitterHandle}
            title={"Twitter Handle"}
            placeholder={"Enter twitter Handle"}
          />
          <TextField
            setInputValue={setInstaHandle}
            value={instaHandle}
            title={"Instagram Handle"}
            placeholder={"Enter Instagram Handle"}
          />
        </div>
        <TextView
          height={"62px"}
          titleTopMargin={"12px"}
          setInputValue={setDescription}
          value={description}
          title={"Your Bio"}
          placeholder={"Tell us about your self (max 300 words)"}
        />
      </div>
    );
  }

  return (
    <div className="create-drop-container">
      <img
        alt={"Close-Form-btn"}
        style={{
          position: "fixed",
          top: "26px",
          right: "20px",
          width: "30px",
          height: "30px",
          cursor: "pointer",
        }}
        onClick={() => history.push("/profile")}
        src="./close-icon.png"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px 36px 128px 36px",
        }}
      >
        <h1
          style={{
            margin: "0px 0px 22px 0px",
            paddingTop: "12px",
            paddingBottom: "8px",
            color: "#B3BBC3",
            textAlign: "center",
          }}
        >
          {getTitle()}
        </h1>
        {renderForm()}
      </div>
      <div
        className={"main-button-container"}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translate(-50%, 0%)",
        }}
      >
        <button className="main-button" onClick={() => saveProfile()}>
          {"Save"}
        </button>
      </div>
    </div>
  );
}
