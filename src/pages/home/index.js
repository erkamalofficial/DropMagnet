import React, { useState, useEffect, Fragment } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import DropCell from '../../components/elements/DropCell/DropCell'
import CategoryMenu from '../../components/elements/CategoryMenu/CategoryMenu'
import DropList from '../../components/elements/DropList/DropList'
import '../../css/buttons.css'
import { render } from 'react-dom'
import MainMenu from '../../components/detail_page/MainMenu/MainMenu'
import DateMenu from '../../components/detail_page/DateMenu/DateMenu'
import SwipeCard from '../../components/elements/SwipeCard/SwipeCard'
import DropDetail from '../../components/detail_page/DropDetail/DropDetail'
import HeaderBar from '../../components/elements/HeaderBar/HeaderBar'
import PhotoSwipeWrapper from '../../components/wrappers/PhotoSwipeWrapper';
import ReswipeCard from '../../components/elements/ReswipeCard/ReswipeCard'


export default function Home(props) {

  const [category, setCategory] = useState('Art')
  const [categoryList, setCategoryList] = useState([])
  const [likedList, setLikedList] = useState([])
  const [reswipeState, setReswipeState] = useState('list')
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [dateMenuOpen, setDateMenuOpen] = useState(false)
  const [viewIsList, setViewIsList] = useState(true)
  const [detailView, setDetailView] = useState(false)
  const [dropToOpen, setDropToOpen] = useState(0)
  const [selectedDropdownDate, setSelectedDropdownDate] = useState(1617985941)
  const [dropOnSwipe, setDropOnSwipe] = useState(0)

  const [photoSwipeIsOpen, setPhotoSwipeIsOpen] = useState(false);
  const [photoSwipeIndex, setPhotoSwipeIndex] = useState(0);

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
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 10,
      "title": "FLYING SKULL",
      "description": "My wonderful art was done by da Vinci",
      "artist": "Zonked",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmXnyRawTJUanAV9VNp8uxWmixX2YhQpVNbiauT6d6kG6D&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/QmYaVCBzBvaRjLWxwws3L5uojA4Aoz9dYQJmmVAXNbTSF9/image.jpeg",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 11,
      "title": "Sitting On Air",
      "description": `In 1987 Nike created their first air max shoe.
      In 1967 Paolo Lomazzi & crew designed the Blow Chair which was the first mass-produced inflatable chair.
      In 2021, I decided to merge the two and call it “Sitting on Air”."`,
      "artist": "no_fun_studio",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmaswCxMqPN22Ad9qcimmYYFzJywtuTX5oym7zvZ6F4kY7&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/QmNXeNk2UTrNNETFjTzojvjSQezjAEc39mcJKWVb5usuZG/nft.jpg",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 12,
      "title": "42 Artists Collaboration: 24/42 - TWO FATES",
      "description": `This is a story about unity 🧡
      Meet a piece of our gorgeous collaboration of 42 artists who came together in the name of love to create.`,
      "artist": "Georgie Yana",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmXRGWgtMbervRtrHuLu1NFyPjCDGQxHB1GBGMqqLiN2Wb&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/Qmck4PRMWYqopAmUv1jquhN7jY7LoM1xseKk8679qUCxdr/image.jpeg",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 13,
      "title": "ℭ𝔥𝔯𝔬𝔪𝔬 𝔚𝔞𝔱𝔢𝔯",
      "description": "Water",
      "artist": "044",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmTaMvVofe1wYkEfhZvi8Bk6bn9VtUjsYuSjZQcpry6btq&w=240",
      "drop_image": "https://lh3.googleusercontent.com/DtvZJHfdNtCvS1zNsF2ttFEpCSJHVNFZA-PXRyNKMIR-VLUoklPTvOM77DSwX7TysDXWJwDAe69rIUuG0NUKCwUmv_fOO5j3QKT8=s250",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 14,
      "title": `Soulja Boy "Crank That"`,
      "description": "Get this super exclusive collectible from Soulja Boy, the iconic rapper and the brand-new man in crypto!",
      "artist": "Jivinci", 
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmQqvtujakbaHGPBvjkM1c7omquoxXHTLCfJXhyX5o8iJU&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/QmRjXTdLQERKCF88ug55MbbHARrcjPuF569AeLgZBGzvei/image.jpeg",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 15,
      "title": "PORTRAIT",
      "description": "A NEVER BEFORE PUBLISHED PHOTOGRAPH OF ANDY WARHOL.",
      "artist": "JeffBezosForeskin",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmNqzHooV4UZkaEdX6RZuEyXYZmUEfm4b7K72iyo58xTPx&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/QmcautNq2Kob9UCM5bGTVqKHSmQPL5SScQYqrFwBuWeo2N/image.jpeg",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 16,
      "title": "Fenrir",
      "description": "The indomitable wolf",
      "artist": "Venomdts",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmQPfuingE1ZMf85KJ3C8io3Vo7L3mCEMP1CXsWbB98C3B&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/QmSGbm3g7sxhXBJ2frXB1wEHeUJuqaNsQUZewbsXWgPrWD/image.jpeg",
			"category": "Art",
			"drop_date": 1617985941,
			"marketplace": "Rarible",
			"marketplace_id": "https://rarible.com/iconow?tab=collectibles",
			"drop_pieces": 9
    },
    {
      "drop_id": 17,
      "title": "Diego Armando Maradona (10)",
      "description": `Tribute to Diego Armando Maradona. Giving up 10 pieces for free, you just have to pay gas.

      The unlockable content will take you back to good ol days, when futbol was futbol.`,
      "artist": "Veuve Gold",
      "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmQqfLKJW49GpfmkCUqRJDPVs5KnkGKGnZWCnFUMNLd86t&w=100",
      "drop_image": "https://ipfs.rarible.com/ipfs/QmaEddMwknbGRuWZHwJZjFnGsDDCHfc2KET4mQABBSjtpf/image.png",
			"category": "Art",
			"drop_date": 1617985941,
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
    if (dropOnSwipe <= categoryList.length) {
      setDropOnSwipe(dropOnSwipe + 1)
    }

    if (reswipeState !== "list") {
      return
    }
    
    if (likedList.length == 0) {
      let list = [drop]
      setLikedList(list)
    } else {
      likedList.push(drop)
      setLikedList(likedList)
    }
    console.log('liked list has', likedList)
    console.log('drop on swipe on like is', dropOnSwipe)
  }

  function dislikeDrop(drop) {
    if (likedList.length > 0) {
      let removedArr = likedList.filter(item => item !== drop)
      setLikedList(removedArr)
    }
    console.log('disliked drop', drop)
    if (dropOnSwipe < categoryList.length - 1) {
      setDropOnSwipe(dropOnSwipe + 1)
    }
    console.log('drop on swipe on dislike is', dropOnSwipe)
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

  function setCurrentReswipeState() {
    setDropOnSwipe(0)
    
    if (reswipeState === 'list') {
      setReswipeState('first_reswipe')
    } else if (reswipeState === 'first_reswipe') {
      setReswipeState('reswipe_again')
    } else if (reswipeState === 'reswipe_again') {
      setReswipeState('swipe_done')
    } else if (reswipeState === 'swipe_done') {
      setReswipeState('list')
    }
  }

  // Render functions


  function renderSwipeCardState() {
    let i = 0
    console.log('current reswipe state', reswipeState)
    let currentReswipeState = reswipeState === 'list' ? "first_reswipe" : reswipeState
    if (reswipeState === 'list' && likedList.length < 5) {
      currentReswipeState = 'swipe_done'
    }
    let listLength = reswipeState === 'list' ? categoryList.length : likedList.length
    console.log('list length', listLength)
    if (dropOnSwipe >= listLength) {
      return <ReswipeCard drops={likedList} state={currentReswipeState} reswipeDone={() => setCurrentReswipeState()}/>
    }
    if (reswipeState === 'list') {
      return <>
      {/* {categoryList.map((drop, i) => ( */}
        <SwipeCard drop={categoryList[dropOnSwipe]} key={i} no={i} likeDrop={() => likeDrop(categoryList[dropOnSwipe])} dislikeDrop={() => dislikeDrop(categoryList[dropOnSwipe])} handleClick={() => openDrop(categoryList[dropOnSwipe])} />
      {/* ))} */}
      </>
    } else if (reswipeState !== 'list') {
      return <>
      {/* {categoryList.map((drop, i) => ( */}
        <SwipeCard drop={likedList[dropOnSwipe]} key={i} no={i} likeDrop={() => likeDrop(likedList[dropOnSwipe])} dislikeDrop={() => dislikeDrop(likedList[dropOnSwipe])} handleClick={() => openDrop(likedList[dropOnSwipe])} />
      {/* ))} */}
      </>
    }
  }

  function renderSwipeCards() {
    let i = 0
    if (categoryList.length > 0) {
      return (
        <div className="card-deck-holder">
          {renderSwipeCardState()}
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