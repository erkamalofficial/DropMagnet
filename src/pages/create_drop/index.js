import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import TextField from '../../components/TextField/TextField'
import Dropdown from '../../components/Dropdown/Dropdown'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../components/Calendar/calendar.css'
import DropzoneComponent from "../../components/DropzoneComponent/DropzoneComponent"
import PageIndexItem from "../../components/PageIndexItem/PageIndexItem"
import TextView from '../../components/TextView/TextView'

export default function DropCreation(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [dropDate, setDropDate] = useState('')
  const [marketplace, setMarketplace] = useState('')
  const [marketplaceId, setMarketplaceId] = useState('')
  const [dropPieces, setDropPieces] = useState('')

  const [date, setDate] = useState(new Date());

  const [dropCreationStep, setDropCreationStep] = useState(0) 

  let history = useHistory()

  function createDrop(title, description, category, dropDate, marketplace, marketplaceId, dropPieces) {
    DropMagnetAPI.createDrop(title, description, category, dropDate, marketplace, marketplaceId, dropPieces).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        // history.push("/home");
      }
    });
  }

  function getTitle() {
    if (dropCreationStep === 0) {
      return "Hey @" + props.userHandle + ", Let’s Schedule Your Drop"
    } else if (dropCreationStep === 1) {
      return "Select Your Drop Launch Date"
    } else if (dropCreationStep === 2) {
      return "What Market Will Your Work Drop On?"
    } else if (dropCreationStep === 3) {
      return "How Many Works are in This Drop?"
    } else if (dropCreationStep === 4) {
      return "Upload your content"
    }
  }

  function renderFirstStep() {
    return <div>
        <TextField setInputValue={setTitle} title={"Drop Title"} placeholder={"Enter a title for your masterpiece"} />
        <TextView height={'62px'} titleTopMargin={'12px'} setInputValue={setDescription} title={"The Story of the Drop"} placeholder={"Tell the story behind the drop (max 300 words)"} />
        <Dropdown title={"Category"} items={["Art","Music","Collectible","Fashion"]} />
        <TextView height={'62px'} titleTopMargin={'12px'} setInputValue={setHashtag} title={"# Hashtag"} placeholder={"Enter one i.e #Electronic if it’s music or #Abstract if it’s art."} />
    </div>
  }

  function renderSecondStep() {
    return <div>
      <Calendar
        onChange={setDate}
        value={date}
      />
    </div>
  }

  function renderThirdStep() {
    return <div>
      <Dropdown title={"Marketplace"} items={["OpenSea","Mintable","Rarible","Other"]} />
      <TextField setInputValue={setMarketplaceId} title={"Your Profile Link on The Marketplace"} placeholder={"Enter your profile link"} />
      <div style={{fontFamily: 'Quicksand', fontSize: '14px', fontWeight: '500', color: 'white', textAlign: 'center', padding: '67px 0'}}>You Can Add The item Link When You Mint The NFTs with *name of marketplace* forthis drop on *date user entered on previous page*</div>
    </div>
  }

  function renderFourthStep() {
    return <div>
      <Dropdown title={"Pieces in Drop"} items={[1,2,3,4,5]}/>
    </div>
  }

  function renderFifthStep() {
    return <div style={{marginTop: '50px'}}>
      <DropzoneComponent />
    </div>
  }
 
  function renderStep() {
    if (dropCreationStep === 0) {
      return renderFirstStep()
    } else if (dropCreationStep === 1) {
      return renderSecondStep()
    } else if (dropCreationStep === 2) {
      return renderThirdStep()
    } else if (dropCreationStep === 3) {
      return renderFourthStep()
    } else if (dropCreationStep === 4) {
      return renderFifthStep()
    }
  }

  return (
    <div className="create-drop-container">
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 36px'}}>
        <img style={{alignSelf: "flex-end", marginTop: '26px', width: '30px', height: '30px', marginRight: '-16px'}} onClick={() => history.push("/")} src="./close-icon.png" />
        <div style={{display: 'flex', maxWidth: "238px", margin: '40px auto 30px auto'}}>
          <PageIndexItem index={1} selected={dropCreationStep >= 0}/>
          <PageIndexItem index={2} selected={dropCreationStep >= 1}/>
          <PageIndexItem index={3} selected={dropCreationStep >= 2}/>
          <PageIndexItem index={4} selected={dropCreationStep >= 3}/>
          <PageIndexItem index={5} selected={dropCreationStep >= 4}/>
        </div>
        <div style={{margin: '0px 0px 22px 0px', color: '#B3BBC3', textAlign: 'center'}} className={"profile-large-title"}>{getTitle()}</div>
        {renderStep()}
        <button className="main-button" onClick={() => {dropCreationStep === 4 ? history.push("/") : setDropCreationStep(dropCreationStep + 1)}}>{dropCreationStep === 4 ? "Finish" : "Next"}</button>
      </div>
    </div>
  );
}
