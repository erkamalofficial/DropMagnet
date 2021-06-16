import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import DropList from '../../components/elements/DropList/DropList'
import "./Profile.css"
import TextField from "../../components/elements/TextField/TextField";

import HeaderBar from '../../components/elements/HeaderBar/HeaderBar'
import { useAuth } from "../../contexts/FirebaseAuthContext"
import Modal from '../../components/elements/Modal/Modal'
import TextView from '../../components/elements/TextView/TextView'
import Avatar from '../../components/elements/Avatar/Avatar'
import ProfileDropDetail from '../../components/detail_page/DropDetail/ProfileDropDetail'
import Spinner from '../../components/blocks/spinner'

export default function Profile(props) {
  const [handle, setHandle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userImage, setUserImage] = useState(props.userImage)
  const [twitterHandle, setTwitterHandle] = useState('')
  const [instaHandle, setInstaHandle] = useState('')
  const [bio, setBio] = useState('Bio')
  const [categoryList, setCategoryList] = useState([])
  const [selectedProfileList, setSelectedProfileList] = useState('scheduled')
  const [scheduledPosts, setScheduledPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [user, setUser] = useState(null)

  /* For profile edit */
  const [openEditModal, setOpenEditModal] = useState(false);
  const [usernameForm, setUsernameForm] = useState("");
  const [firstNameForm, setFirstNameForm] = useState("");
  const [lastNameForm, setLastNameForm] = useState("");
  const [currentEditField, setCurrentEditField] = useState('');
  const [descriptionForm, setDescriptionForm] = useState("");
  const [twitterHandleForm, setTwitterHandleForm] = useState("");
  const [instaHandleForm, setInstaHandleForm] = useState("");
  const [loading, setLoading] = useState(true)


  const [curDrop, setCurDrop] = useState({})
  const [detailView, setDetailView] = useState(false)

  const { currentUser } = useAuth()

  let history = useHistory()

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
    const user_id = currentUser.uid
    currentUser.getIdToken(true).then(function (idToken) {
      // Send token to your backend via HTTPS
      // ...
      console.log('id token is', idToken)
      DropMagnetAPI.getUserProfile(user_id, idToken).then(function (response) {
        console.log('user profile response', response)
        if (response.status === "error") {
          // setLoginError(response.message);
        } else {
          let splitName = response.name.split(" "); // split the name by spaces
          setFirstName(splitName[0])
          setLastName(splitName[1])
          setHandle(response.username)
          setBio(response.bio)
          setInstaHandle(response.insta_url)
          setTwitterHandle(response.twitter_url)
          setUserImage(response.avatar_url || '')
          setUser(response)
        }
      })


      DropMagnetAPI.getUserPosts(user_id, idToken)
        .then(res => {
          setScheduledPosts(res)
          setLoading(false)
      })

    }).catch(function (error) {
      // Handle error
    });
  }, [])

  function fetchUser() {

  }

  function openDrop() {

  }





  function openHome() {
    history.push("/");
  }

  function renderDrops() {
    return (
      <DropList
        drops={scheduledPosts}
        user={user}
        onClick={openDrop}
        setDetailView={setDetailView}
        setCurDrop={setCurDrop} />
    )
  }

  const handleProfileEdit = (field = '') => {
    setCurrentEditField(field);
    setOpenEditModal(true);
    setUsernameForm(handle);
    setInstaHandleForm(instaHandle.split('/').pop());
    setTwitterHandleForm(twitterHandle.split('/').pop());
    setDescriptionForm(bio);
    setLastNameForm(lastName);
    setFirstNameForm(firstName);
  }

  const renderInput = () => {
    switch (currentEditField) {
      case 'username': return (<TextField
        setInputValue={setUsernameForm}
        title={"Username"}
        titleTopMargin={"24px"}
        value={usernameForm}
        placeholder={"Enter a username"}
      />)
      case 'insta': return (<TextField
        setInputValue={setInstaHandleForm}
        title={"Instagram Handle"}
        titleTopMargin={"24px"}
        value={instaHandleForm}
        placeholder={"Enter your Instagram Handle"}
      />)

      case 'twitter': return (<TextField
        setInputValue={setTwitterHandleForm}
        title={"Twitter Handle"}
        titleTopMargin={"24px"}
        value={twitterHandleForm}
        placeholder={"Enter your Twitter Handle"}
      />)

      case 'bio': return (<TextView
        height={"100px"}
        titleTopMargin={"24px"}
        setInputValue={setDescriptionForm}
        value={descriptionForm}
        title={"Your Bio"}
        placeholder={"Tell us about your self (max 300 words)"}
      />)

      case 'name': return (<>
        <TextField
          setInputValue={setFirstNameForm}
          title={"First Name"}
          titleTopMargin={"24px"}
          value={firstNameForm}
          placeholder={"Enter your First Name"}
        />
        <TextField
          setInputValue={setLastNameForm}
          title={"Last Name"}
          titleTopMargin={"24px"}
          value={lastNameForm}
          placeholder={"Enter your Last Name"}
        />
      </>)

      default: return null
    }
  }

  const saveForm = () => {
    switch (currentEditField) {

      case 'username': {
        /*API Call*/
        setHandle(usernameForm);
        setUsernameForm('');
        break;
      }
      case 'insta': {
        /*API Call to save*/
        setInstaHandle('https://www.instagram.com/' + instaHandleForm);
        setInstaHandleForm('');
        break;
      }

      case 'twitter': {
        // API Call TO Save
        setTwitterHandle('https://www.twitter.com/' + twitterHandleForm)
        setTwitterHandleForm('');
        break;
      }

      case 'bio': {
        // API Call To Save
        setBio(descriptionForm);
        setDescriptionForm('');
        break;
      }

      case 'name': {
        // API Call To Save
        setFirstName(firstNameForm);
        setLastName(lastNameForm);
        setFirstNameForm('');
        setLastNameForm('');

        break;
      }

      default: return null
    }
    setOpenEditModal(false)
  }
  function renderDetail() {
    return (
      <div>
        <ProfileDropDetail
          drop={curDrop}
          closeDetailView={() => setDetailView(false)}
          handleClick={() => console.log("Click")}
          user={user} />
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{marginTop: '60px'}}>
        <Spinner />
      </div>
    )
  }
  else {
    return (
      <>
        <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
          {renderInput()}
          <div className={'main-button-container'} >
            <button className="main-button" onClick={saveForm}>{"Save"}</button>
          </div>
        </Modal>
        <div className="profile-container">
          <div className="fixed-container">
            <HeaderBar openHome={() => openHome()} userLoggedIn={props.userLoggedIn} userImage={userImage} userDetails={props.userDetails} />
          </div>
          <div className="profile-detail-container" style={{ display: `${detailView ? 'none' : 'flex'}` }}>

            <Avatar
              userImage={userImage}
              onChange={(e) => {
                if (e.target.files) {
                  if (e.target.files[0]) {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      setUserImage(fileReader.result);
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }
                }
              }}
              onRemove={() => setUserImage('')}
            />
            {/* <img style={{borderRadius: '70px'}} width={120} height={120} src={userImage === "" ? "./add-user-icon.png" : userImage}/> */}
            <div className="profile-large-title clickable" onClick={() => handleProfileEdit('name')} >{firstName + " " + lastName !== undefined ? lastName : ''}</div>
            <div className="profile-handle-title clickable" onClick={() => handleProfileEdit('username')}>{"@" + handle}</div>
            <div style={{ display: "flex", paddingBottom: '16px' }}>
              <div style={{ display: "flex", paddingRight: '24px', cursor: 'pointer' }} onClick={() => handleProfileEdit('twitter')} >
                <img width={37} height={24} src="./twitter-icon.png" style={{ paddingRight: '8px' }} />
                <div className="profile-medium-title">{twitterHandle !== "" ? "@" + twitterHandle.split("/").pop() : 'Add Twitter'}</div>
              </div>
              <div style={{ display: "flex", columnGap: "8px", cursor: 'pointer' }} onClick={() => handleProfileEdit('insta')}>
                <img width={24} height={24} src="./insta-icon.png" />
                <div className="profile-medium-title">{instaHandle !== "" ? "@" + instaHandle.split("/").pop() : 'Add Instagram'}</div>
              </div>
            </div>
            <div className="profile-bio-edit-button clickable" onClick={() => handleProfileEdit('bio')}>{bio ? bio : 'Tap to Add Bio'}</div>

          </div>

          <div style={{ margin: '0 auto', maxWidth: '600px', display: `${detailView ? 'none' : 'block'}` }}>
            <div className="profile-button-option-holder">
              {scheduledPosts.length > 0 ? <div className={selectedProfileList === "scheduled" ? "profile-button-option-selected" : "profile-button-option"} onClick={() => { setSelectedProfileList("scheduled"); setCategoryList(collectibleArts) }}>My Drops ({scheduledPosts.length})</div> : <></>}
              <div className={selectedProfileList === "saved" ? "profile-button-option-selected" : "profile-button-option"} onClick={() => { setSelectedProfileList("saved"); setCategoryList(fashionArts) }}>Saved Drops ({savedPosts.length})</div>
            </div>
            {savedPosts.length > 0 || scheduledPosts.length > 0 ?
              renderDrops()
              :
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="profile-bio-description">Your Saved Drops Will Appear Here</div>}
          </div>

          <div className="rel" style={{ display: `${!detailView ? 'none' : 'flex'}` }}>
            <div className="home-container">
              {detailView && renderDetail()}
            </div>
          </div>

        </div>
      </>
    );
  }

}
