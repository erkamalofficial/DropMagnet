import React, { useState, useEffect, Fragment } from 'react'
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
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import PhotoSwipeWrapper from '../../components/wrappers/PhotoSwipeWrapper';


export default function Home(props) {

  const [category, setCategory] = useState('Art')
  const [categoryList, setCategoryList] = useState([])
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [dateMenuOpen, setDateMenuOpen] = useState(false)
  const [viewIsList, setViewIsList] = useState(true)
  const [detailView, setDetailView] = useState(false)
  const [dropToOpen, setDropToOpen] = useState(0)
  const [selectedDropdownDate, setSelectedDropdownDate] = useState("8th of April")
  const [dropOnSwipe, setDropOnSwipe] = useState(0)

  const [photoSwipeIsOpen, setPhotoSwipeIsOpen] = useState(false);
  const [photoSwipeIndex, setPhotoSwipeIndex] = useState(0);

  let user = {
    "name" : "crypto art man",
    "handle" : "cryptoartman"
  }

  let history = useHistory()

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
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
      "drop_images": [{src: "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992", w: 1200, h: 900}],
			"category": "Art",
			"drop_date": "22/03/2021 12:00 PM GMT",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 10,
      "title": "Awesome O Art",
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
      "drop_id": 11,
      "title": "Awesome O Art",
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
      "drop_id": 12,
      "title": "Awesome O Art",
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
      "drop_id": 13,
      "title": "Awesome O Art",
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
      "drop_id": 14,
      "title": "Awesome O Art",
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
      "drop_id": 15,
      "title": "Awesome O Art",
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
      "drop_id": 16,
      "title": "Awesome O Art",
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
      "drop_id": 17,
      "title": "Awesome O Art",
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

  let musicArts = [
    {
      "drop_id": 9,
      "title": "Awesome OOOOOOO Art",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
			"category": "Art",
			"drop_date": "22-03-2021",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
      "drop_pieces": 9,
      "type": "music"
    },
    {
      "drop_id": 10,
      "title": "Awesome OOOOOOO Art",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Crypto Art Man",
      "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
      "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
			"category": "Art",
			"drop_date": "22-03-2021",
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
      "drop_pieces": 9,
      "type": "music"
    }
  ]

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

  function openHome() {
    history.push("/");
  }

  const handleOpen = index => {
    setPhotoSwipeIsOpen(true);
    setPhotoSwipeIndex(index);
  };

  const handleClose = () => {
    setPhotoSwipeIsOpen(false);
  };

  // Render functions

  function renderDropCell(drop) {
    return <DropCell key={drop.drop_id} drop={drop} />
  }

  function renderSwipeCards() {
    let i = 0
    if (categoryList.length > 0) {
      return (
        <div className="card-deck-holder">
          { /* <div className='card-holder'> */ }
          {/* Traversing through cards arrray using map function
          and populating card with different image and color */}
          {/* {categoryList.map((drop, i) => ( */}
          <SwipeCard drop={categoryList[i]} key={i} no={i} likeDrop={() => likeDrop(categoryList[dropOnSwipe])} dislikeDrop={() => dislikeDrop(categoryList[dropOnSwipe])} handleClick={() => openDrop(categoryList[dropOnSwipe])} />
          {/* ))} */}
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
        <DropDetail drop={categoryList[dropToOpen]} handleClick={() => setPhotoSwipeIsOpen(true)} closeDetailView={() => setDetailView(false)} />
      </div>
    )
  }

  function renderGallery() {
    return (
      <Fragment>
        {photoSwipeIsOpen ? 
          <PhotoSwipeWrapper isOpen={photoSwipeIsOpen} index={photoSwipeIndex} items={categoryList[dropToOpen].drop_images} onClose={handleClose} />
        :
          <></>
        }
      </Fragment>
    );
  }

  function renderMainView() {
    return (
      <>
        {renderSwipeCards()}
      </>
    )
  }

  return (
    <div className="page-style">
      {renderGallery()}
      <MainMenu userDetails={props.userDetails} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />
      <DateMenu open={dateMenuOpen} setOpen={setDateMenuOpen} openItem={selectDate} setSelectedDate={setSelectedDate} />
      <div className="fixed-container">
        <HeaderBar openHome={() => openHome()} 
                  openMenu={() => openMenu()} 
                  openDateMenu={() => openDateMenu()} 
                  selectedDropdownDate={selectedDropdownDate} 
                  datePickerVisible={detailView ? false : true}
                  userLoggedIn={props.userLoggedIn}
                  userImage={props.userDetails.image}
                  userImageVisible={true} />
        <CategoryMenu hidden={detailView} changeCategory={changeCategory} />
      </div>
      <div className="home-container" style={detailView ? {paddingTop: '67px', paddingLeft: '8px', paddingRight: '8px'} : {}}>
        {detailView ? renderDetail() : renderMainView()}
      </div>
    </div>
  );
}