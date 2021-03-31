import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import DropCell from '../../components/DropCell/DropCell'
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu'
import DropList from '../../components/DropList/DropList'
import '../../css/buttons.css'
import { render } from 'react-dom'
import MainMenu from '../../components/MainMenu/MainMenu'
import DateMenu from '../../components/DateMenu/DateMenu'
import SwipeCard from '../../components/SwipeCard/SwipeCard'
import DropDetail from '../../components/DropDetail/DropDetail'

export default function Home(props) {

  const [category, setCategory] = useState('Art')
  const [categoryList, setCategoryList] = useState([])
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [dateMenuOpen, setDateMenuOpen] = useState(false)
  const [viewIsList, setViewIsList] = useState(true)
  const [detailView, setDetailView] = useState(false)
  const [dropToOpen, setDropToOpen] = useState(0)
  const [selectedDropdownDate, setSelectedDropdownDate] = useState("26-03-2021")
  const [dropOnSwipe, setDropOnSwipe] = useState(0)

  let user = {
    "name" : "crypto art man",
    "handle" : "cryptoartman"
  }

  useEffect(() => {
    // Fetch list again
    setCategoryList(dropArts)
  }, [])

  useEffect(() => {
    // Fetch list again
    if (category === 'Art') {
      setCategoryList(dropArts)
    } else if (category === 'Music') {
      setCategoryList(musicArts)
    } else if (category === 'Collectibles') {
      setCategoryList(collectibleArts)
    } else if (category === 'Fashion') {
      setCategoryList(fashionArts)
    }
  }, [category])

  useEffect(() => {
    // Fetch drops again
  }, [selectedDropdownDate])

  let dropArts = [
    {
      "drop_id": 9,
      "title": "Awesome O Art",
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
      "title": "Awesome O Art",
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
      "drop_id": 11,
      "title": "Awesome O Art",
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
      "drop_id": 12,
      "title": "Awesome O Art",
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
      "drop_id": 13,
      "title": "Awesome O Art",
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
      "drop_id": 14,
      "title": "Awesome O Art",
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
      "drop_id": 15,
      "title": "Awesome O Art",
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
      "drop_id": 16,
      "title": "Awesome O Art",
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
      "drop_id": 17,
      "title": "Awesome O Art",
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

  let musicArts = [
    {
      "drop_id": 9,
      "title": "Awesome OOOOOOO Art",
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
      "title": "Awesome OOOOOOO Art",
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

  function changeCategory(changedCategory) {
    console.log('changed category', changedCategory)
    setCategory(changedCategory)
  }

  function openItem(item) {
    console.log('opened item', item)
  }

  function openMenu() {
    setMainMenuOpen(true)
  }

  function selectDate(date) {
    console.log('opened item', date)
  }

  function openDateMenu() {
    setDateMenuOpen(true)
  }

  function openDrop(drop) {
    setDropToOpen(categoryList.findIndex(obj => obj.drop_id === drop.drop_id))
    setDetailView(true)
  }

  function setSelectedDate(date) {
    console.log('selected date is', date)
    setSelectedDropdownDate(date.date)
  }

  function likeDrop(drop) {
    console.log('liked drop', drop)
    if (dropOnSwipe < categoryList.length - 1) {
      setDropOnSwipe(dropOnSwipe + 1)
    }
  }

  function dislikeDrop(drop) {
    console.log('disliked drop', drop)
    if (dropOnSwipe < categoryList.length - 1) {
      setDropOnSwipe(dropOnSwipe + 1)
    }
  }

  // Render functions

  function renderDropCell(drop) {
    return <DropCell key={drop.drop_id} drop={drop} />
  }

  function renderSwipeCards() {
    if (categoryList.length > 0) {
      return (
        <div>
          { /* <div className='card-holder'> */ }
          {/* Traversing through cards arrray using map function
          and populating card with different image and color */}
          <SwipeCard drop={categoryList[dropOnSwipe]} no={dropOnSwipe} likeDrop={() => likeDrop(categoryList[dropOnSwipe])} dislikeDrop={() => dislikeDrop(categoryList[dropOnSwipe])} />
          {/* {categoryList.map((drop, i) => (
            <SwipeCard drop={drop} key={i} no={i} />
          ))} */}
        </div>
      )
    }
  }

    function renderDropCell(drop) {
    return <DropCell style={{
      position: "absolute"
    }} key={drop.drop_id} drop={drop} />
  }

  function renderList() {
    return (
      <DropList drops={categoryList} onClick={openDrop} />
    )
  }

  function renderDetail() {
    return (
      <div>
        <DropDetail drop={categoryList[dropToOpen]} closeDetailView={() => setDetailView(false)} />
      </div>
    )
  }

  function renderMainView() {
    return (
      <>
        <div className="hidden_desktop">
          {viewIsList ? renderList() : renderSwipeCards()}
        </div>
        <div className="hidden_mobile">
          {renderSwipeCards()}
        </div>
      </>
    )
  }

  return (
    <div className="page-style">
      <MainMenu userDetails={props.userDetails} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />
      <DateMenu open={dateMenuOpen} setOpen={setDateMenuOpen} openItem={selectDate} setSelectedDate={setSelectedDate} />
      <div className="fixed-container">
          <div className="header-container">
            <img className="header-left-image" src="./dropmagnet-small-logo.png" />
            <div onClick={() => openDateMenu()} className="dropdown-button">
              <p1 className="dropdown-button-title">{selectedDropdownDate}</p1>
              <img className="dropdown-button-icon" src="./dropdown.png"/>
            </div>
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
          <CategoryMenu hidden={detailView} changeCategory={changeCategory} />
        </div>
      <div className="home-container">
        {detailView ? renderDetail() : renderMainView()}
      </div>
      <div className="hidden_desktop">
        {detailView ? 
            <></> : 
            <div className="list-card-view">
              <div className={viewIsList ? "list-card-view-selected" : "list-card-view-unselected"} onClick={() => setViewIsList(true)}>
                <img height={28} width={32} src="./list-tab-icon.png" />
                <div className={viewIsList ? "list-card-view-text-selected" : "list-card-view-text"} >List View</div>
              </div>
              <div className={!viewIsList ? "list-card-view-selected" : "list-card-view-unselected"} onClick={() => setViewIsList(false)}>
                <img style={{paddingTop: '2px'}} height={23} width={26} src="./cards-tab-icon.png" />
                <div className={!viewIsList ? "list-card-view-text-selected" : "list-card-view-text"}>Card View</div>
              </div>
            </div>
        }
      </div>
    </div>
  );
}