import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import TextField from '../../components/elements/TextField/TextField'
import PriceTextField from '../../components/elements/PriceTextField/PriceTextField'
import Dropdown from '../../components/elements/Dropdown/Dropdown'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../components/elements/Calendar/calendar.css'
import DropzoneComponent from "../../components/elements/DropzoneComponent/DropzoneComponent"
import PageIndexItem from "../../components/elements/PageIndexItem/PageIndexItem"
import TextView from '../../components/elements/TextView/TextView'
import PriceOptionButton from '../../components/elements/PriceOptionButton/PriceOptionButton'
import DateCell from '../../components/elements/DateCell/DateCell'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu, ArrowLeft, ArrowRight } from '../../components/elements/DateDragBarComponent/DateDragBarComponent'
import { useAuth } from "../../contexts/FirebaseAuthContext"
import '../../components/detail_page/DateMenu/DateMenu.css'

export default function DropCreation(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [launchDate, setLaunchDate] = useState('')
  const [marketplace, setMarketplace] = useState('')
  const [marketplaceId, setMarketplaceId] = useState('')
  const [dropPieces, setDropPieces] = useState('')
  const [listingType, setListingType] = useState('auction')
  const [price, setPrice] = useState(0)
  const [auction_price, setAuction_price] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState('April')
  const [files, setFiles] = useState([])


  const [date, setDate] = useState(new Date());

  const [dropCreationStep, setDropCreationStep] = useState(0)

  let history = useHistory()

  const { currentUser } = useAuth()

  // list of items
  const list = [
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' }]

  const days = [
    {
      date: 1617985941,
      arts: 1,
      music: 1,
      collectible: 1,
      fashion: 1
    },
    {
      date: 1618072341,
      arts: 19,
      music: 1,
      collectible: 1,
      fashion: 0
    },
    {
      date: 1618158741,
      arts: 0,
      music: 2,
      collectible: 5,
      fashion: 4
    }
  ]

  function onSelect(key) {
    setSelectedMonth(key)
  }

  const menu = Menu(list, selectedMonth)

  function createDrop() {
    currentUser.getIdToken(true).then(function (idToken) {
      let drop_date = new Date().getMilliseconds()
      DropMagnetAPI.createDrop(title,
        description,
        category,
        hashtag,
        drop_date,
        launchDate,
        marketplace,
        marketplaceId,
        dropPieces,
        idToken,
        listingType,
        Number(price),
        Number(auction_price),
        files).
        then(function (response) {
          if (response.status === "error") {
            // setLoginError(response.message);
          } else {
            // setLoginError('');
            // props.saveCredentials(idToken, idToken);
            // history.push("/home");
          }
        });
    })
  }

  function getTitle() {
    if (dropCreationStep === 0) {
      return "Hey @" + props.userHandle + ", Let’s Schedule Your Drop"
    } else if (dropCreationStep === 1) {
      return "Select Your Drop Launch Date"
    } else if (dropCreationStep === 2) {
      return "What Market Will Your Work Drop On?"
    } else if (dropCreationStep === 3) {
      return "Auction or a Set Price?"
    } else if (dropCreationStep === 4) {
      return "Upload your content"
    }
  }

  function setStepAction(action = 'decrease') {
    if(action === 'increase'){
      if (dropCreationStep === 4) {
        history.push("/")
        createDrop()
      } else {
        setDropCreationStep(dropCreationStep + 1)
      }
    }else{
      setDropCreationStep(dropCreationStep - 1);
    }
    
  }

  function renderFirstStep() {
    return <div>
      <TextField setInputValue={setTitle} title={"Drop Title"} placeholder={"Enter a title for your masterpiece"} />
      <TextView height={'62px'} titleTopMargin={'12px'} setInputValue={setDescription} title={"The Story of the Drop"} placeholder={"Tell the story behind the drop (max 300 words)"} />
      <Dropdown setInputValue={setCategory} title={"Category"} items={["Art", "Music", "Collectible", "Fashion"]} />
      <TextView height={'62px'} titleTopMargin={'12px'} setInputValue={setHashtag} title={"# Hashtag"} placeholder={"Enter one i.e #Electronic if it’s music or #Abstract if it’s art."} />
    </div>
  }

  function renderSecondStep() {
    return <div>
      <div className="main-menu-holder">
        <ScrollMenu
          style={{ boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(19, 19, 19, 0.56)', marginBottom: '14px' }}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selectedMonth}
          onSelect={onSelect}
        />
        {days.map(renderDateCell)}
      </div>
    </div>
  }

  function renderDateCell(date) {
    return <DateCell day={date} cellSelected={date.date === launchDate.date} setSelectedDate={() => { setLaunchDate(date) }} />
  }

  function renderThirdStep() {
    return <div>
      <Dropdown title={"Marketplace"} items={["OpenSea", "Mintable", "Rarible", "Other"]} />
      <TextField setInputValue={setMarketplaceId} title={"Your Profile Link on The Marketplace"} placeholder={"Enter your profile link"} />
      <PriceTextField setInputValue={setDropPieces} value={dropPieces} title={"Drop Piece"} placeholder={"Enter Drop Piece"} isPositiveOnly isCounterRequired />
      <div style={{ fontFamily: 'Quicksand', fontSize: '14px', fontWeight: '500', color: 'white', textAlign: 'center', padding: '24px 0' }}>You Can Add The item Link When You Mint The NFTs with *name of marketplace* forthis drop on *date user entered on previous page*</div>
    </div>
  }

  function renderFourthStep() {
    return <div style={{ marginLeft: '10px', marginRight: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '18px', paddingTop: '8px', maxWidth: '322px', margin: '0 auto' }}>
        <PriceOptionButton isSelected={listingType === 'auction'} setOptionSelected={() => setListingType('auction')} buttonType={'auction'} />
        <PriceOptionButton isSelected={listingType === 'fixed_price'} setOptionSelected={() => setListingType('fixed_price')} buttonType={'fixed_price'} />
      </div>
      {listingType === 'fixed_price' ? 
        <PriceTextField setInputValue={setPrice} value={price} title={"Starting Bid"} placeholder={"Enter a price"} />
        : <PriceTextField setInputValue={setAuction_price} value={auction_price}  title={"Starting Bid"} placeholder={"Enter a price"} />
      }
      
    </div>
  }

  function renderFifthStep() {
    return <div style={{ marginTop: '50px', marginBottom: '80px' }}>
      <DropzoneComponent setFiles={setFiles} files={files} />
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
      <img style={{ position: "fixed", top: '26px', right: '20px', width: '30px', height: '30px',cursor:'pointer' }} onClick={() => history.push("/")} src="./close-icon.png" />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '96px 36px 128px 36px' }}>
        <div style={{ display: 'flex', maxWidth: "238px", margin: '40px auto 30px auto' }}>
          <PageIndexItem index={1} selected={dropCreationStep >= 0} />
          <PageIndexItem index={2} selected={dropCreationStep >= 1} />
          <PageIndexItem index={3} selected={dropCreationStep >= 2} />
          <PageIndexItem index={4} selected={dropCreationStep >= 3} />
          <PageIndexItem index={5} selected={dropCreationStep >= 4} />
        </div>
        <h1 style={{ margin: '0px 0px 22px 0px', paddingTop: '12px', paddingBottom: '8px', color: '#B3BBC3', textAlign: 'center' }}>{getTitle()}</h1>
        {renderStep()}
      </div>
    <div className={'main-button-container'} style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translate(-50%, 0%)' }} >
      {dropCreationStep >0 && <button className="main-button create_drop_button"  onClick={() => setStepAction('decrease')}>{"Back"}</button>}
      <button className="main-button create_drop_button"  onClick={() => setStepAction('increase')}>{dropCreationStep === 4 ? "Finish" : "Next"}</button>
    </div>
    </div>
  );
}
