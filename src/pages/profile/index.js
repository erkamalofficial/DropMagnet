import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import DropList from '../../components/elements/DropList/DropList'
import MainMenu from '../../components/detail_page/MainMenu/MainMenu'
import CategoryMenu from '../../components/elements/CategoryMenu/CategoryMenu'
import "./Profile.css"
import HeaderBar from '../../components/elements/HeaderBar/HeaderBar'

export default function Profile(props) {

  const [handle, setHandle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [instaHandle, setInstaHandle] = useState('')
  const [bio, setBio] = useState('dsadasdasdas')
  const [categoryList, setCategoryList] = useState([])
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [selectedProfileList, setSelectedProfileList] = useState('scheduled')
  const [scheduledPosts, setScheduledPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])

  let history = useHistory()

  useEffect(() => {
    setScheduledPosts(collectibleArts)
  }, [])

  let collectibleArts = [
    {
      "drop_id": 9,
      "title": "Best ever collectible you can get",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
			"category": "Art",
			"drop_date": "22-03-2021",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 10,
      "title": "Best ever collectible you can get",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
			"category": "Art",
			"drop_date": "22-03-2021",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    }
  ]

  let fashionArts = [
    {
      "drop_id": 9,
      "title": "Bring those Guccis out",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
			"category": "Art",
			"drop_date": "22-03-2021",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 10,
      "title": "Bring those Guccis out",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
			"category": "Art",
			"drop_date": "22-03-2021",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    }
  ]

  useEffect(() => {
    setCategoryList(collectibleArts)
  }, [])

  function fetchUser() {

  }

  function openDrop() {

  }

  function openItem(item) {
    console.log('opened item', item)
  }

  function openMenu() {
    setMainMenuOpen(true)
  }

  function openHome() {
    history.push("/");
  }

  function renderDrops() {
    return (
      <DropList drops={categoryList} onClick={openDrop} />
    )
  }

  return (
    <div className="profile-container">
      <MainMenu userDetails={props.userDetails} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />
      <div className="fixed-container">
        <HeaderBar openHome={() => openHome()} openMenu={() => openMenu()} userLoggedIn={props.userLoggedIn} userImage={props.userDetails.image} />
      </div>
      <div className="profile-detail-container">
        <img style={{borderRadius: '70px'}} width={120} height={120} src={props.userDetails.image}/>
        <div className="profile-large-title">{props.userDetails.name /* firstName + " " + lastName */}</div>
        <div className="profile-handle-title">{"@" + props.userDetails.handle}</div>
        <div style={{display: "flex", paddingBottom: '16px'}}>
          <div style={{display: "flex", paddingRight: '24px'}}>
            <img width={30} height={24} src="./twitter-icon.png" style={{paddingRight: '8px'}} />
            <div className="profile-medium-title">{twitterHandle !== "" ? twitterHandle : 'Add Twitter'}</div>
          </div>
          <div style={{display: "flex"}}>
            <img width={24} height={24} src="./insta-icon.png" style={{paddingRight: '8px'}} />
            <div className="profile-medium-title">{instaHandle !== "" ? instaHandle : 'Add Instagram'}</div>
          </div>
        </div>
        <div className="profile-bio-description">{props.userDetails.bio}</div>
      </div>
      <div style={{margin: '0 auto', maxWidth: '600px'}}>
        <div className="profile-button-option-holder">
          {scheduledPosts.length > 0 ? <div className={selectedProfileList === "scheduled" ? "profile-button-option-selected" : "profile-button-option"} onClick={() => {setSelectedProfileList("scheduled"); setCategoryList(collectibleArts)}}>Scheduled Drops</div> : <></> }
          <div className={selectedProfileList === "saved" ? "profile-button-option-selected" : "profile-button-option"} onClick={() => {setSelectedProfileList("saved"); setCategoryList(fashionArts)}}>Saved Drops</div>
        </div>
        {savedPosts.length > 0 || scheduledPosts.length > 0 ?
        renderDrops()
        :
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className="profile-bio-description">Your Saved Drops Will Appear Here</div>}
      </div>
    </div>
  );
}
