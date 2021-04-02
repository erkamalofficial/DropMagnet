import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import DropList from '../../components/DropList/DropList'
import MainMenu from '../../components/MainMenu/MainMenu'
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu'
import "./Profile.css"

export default function Profile(props) {

  const [handle, setHandle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [instaHandle, setInstaHandle] = useState('')
  const [bio, setBio] = useState('dsadasdasdas')
  const [categoryList, setCategoryList] = useState([])
  const [mainMenuOpen, setMainMenuOpen] = useState(false)

  let collectibleArts = [
    {
      "drop_id": 9,
      "title": "Best ever collectible you can get",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1363617537171353601/rpc1sv1s_400x400.jpg",
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
      "artist_image": "https://pbs.twimg.com/profile_images/1363617537171353601/rpc1sv1s_400x400.jpg",
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
      "artist_image": "https://pbs.twimg.com/profile_images/1363617537171353601/rpc1sv1s_400x400.jpg",
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
      "artist_image": "https://pbs.twimg.com/profile_images/1363617537171353601/rpc1sv1s_400x400.jpg",
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

  function renderDrops() {
    return (
      <DropList drops={categoryList} onClick={openDrop} />
    )
  }

  return (
    <div className="profile-container">
      <MainMenu userDetails={props.userDetails} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />
      <div className="fixed-container">
          <div className="header-container">
            <img className="header-left-image" src="./dropmagnet-small-logo.png" />
            <div className="header-right-holder">
              <img onClick={() => openMenu()} className="header-right-image" src="./menu-mobile.png" />
              {props.userLoggedIn ? 
                <Link to={'/profile'}>
                  <img className="header-right-image" src="https://pbs.twimg.com/profile_images/1363617537171353601/rpc1sv1s_400x400.jpg"/>
                </Link> :
                <Link to={'/login'}>
                  <button className="login-button">Log in</button>
                </Link>
              }
            </div>
          </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 32px 0 32px'}}>
        <img style={{borderRadius: '70px'}} width={140} height={140} src="https://pbs.twimg.com/profile_images/1363617537171353601/rpc1sv1s_400x400.jpg"/>
        <div className="profile-large-title">{props.userDetails.name /* firstName + " " + lastName */}</div>
        <div className="profile-handle-title">{"@" + props.userDetails.handle}</div>
        <div style={{display: "flex", paddingBottom: '16px'}}>
          <div style={{display: "flex", paddingRight: '24px'}}>
            <img width={30} height={24} src="./twitter-icon.png" style={{paddingRight: '8px'}} />
            <div className="profile-medium-title">{twitterHandle !== "" ? twitterHandle : 'Connect your Twitter'}</div>
          </div>
          <div style={{display: "flex"}}>
            <img width={24} height={24} src="./insta-icon.png" style={{paddingRight: '8px'}} />
            <div className="profile-medium-title">{instaHandle !== "" ? instaHandle : 'Connect your Instagram'}</div>
          </div>
        </div>
        <div className="profile-medium-title">Your Bio</div>
        <div className="profile-bio-description">{props.userDetails.bio}</div>
        <div className="profile-button-option-holder">
          <div className="profile-button-option" onClick={() => setCategoryList(collectibleArts)}>Scheduled Drops</div>
          <div className="profile-button-option" onClick={() => setCategoryList(fashionArts)}>Saved Drops</div>
        </div>
      </div>
      <div style={{margin: '0 auto', maxWidth: '600px'}}>
        {renderDrops()}
      </div>
    </div>
  );
}
