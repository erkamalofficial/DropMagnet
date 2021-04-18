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
import { dropArts, musicArts, collectibleArts, fashionArts } from './data';

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
            return <ReswipeCard drops={likedList} state={currentReswipeState} reswipeDone={() => setCurrentReswipeState()} />
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
            <div className="home-container" style={detailView ? { paddingTop: '67px', paddingLeft: '8px', paddingRight: '8px' } : {}}>
                {detailView ? renderDetail() : renderSwipeCards()}
            </div>
        </div>
    );
}