import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import TinderCard from "./swipe-main";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./card";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";
import Tabs from "./tabs";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import './swiper.css';

import { setOpen } from "../../store/OpenCard";

import * as DropMagnetAPI from "../../DropMagnetAPI";

import initialState from "../../store/initial-state";

import { getCategorySymbolByPosition } from "../../utils/category";
import { getCategorySavedDrops } from "../../DropMagnetAPI";
import axios from "axios";

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
`;
const CardContainer = styled.div`
  width: var(--card-container-width);
  height: var(--card-container-height);
  margin-bottom: 26px;
  justify-content: center;
  @media(max-width: 500px){
    width: 100%;
    margin-bottom: 18px;
  }
  
`;

const alreadyRemoved = [];
const CARD_PRELOAD = 25; //card count to preload
function Swiper(props) {
  const { db, reswipeModeActive, setDetailView, nextIndex, tabList2 } = props

  const { currentUser, idToken } = useAuth();


  const [allCards, setAllCards] = useState(db);
  const [cards, setCards] = useState(db);
  const [openView, setOpenView] = useState(false)
  const [curDrop, setCurDrop] = useState({})
  // const [lastDirection, setLastDirection] = useState();
  const [newLoading, setNewLoading] = useState(true);
  const [swiping, setSwiping] = useState(false)
  const EC = useSelector(state => state.category.EC)

  const allCategories = useSelector(state => state.category.allCategories)
  const activeTabIndex = useSelector((state) => state.category.general.activeTabIndex);

  console.log(allCategories, activeTabIndex)

  const history = useHistory()

  const dispatch = useDispatch();

  useEffect(() => {
    alreadyRemoved.length = 0;
  }, [reswipeModeActive]);

  // useEffect(() => {
  //   if (cards.length < 1 && !(reswipeModeActive) && nextIndex !== null) {
  //     dispatch({ type: "FETCH_MORE_FEEDS", payload: true })
  //   }

  // }, [cards.length, reswipeModeActive])

  const childRefs = useMemo(
    () =>
      allCards && allCards.length > 0 && Array(allCards.length)
        .fill(0)
        .map((i) => React.createRef()),
    [allCards.length]
  );
  //const childRefs = useMemo(() => Array(cards.length).fill(0).map(i => React.createRef()), [cards.length])

  const swiped = async (direction, drop_id, index, drop) => {
    const user_id = currentUser.uid;
    let id_token = ""
    currentUser.getIdToken(false).then(function (idToken) {
        id_token = idToken
        // DropMagnetAPI.getUserPosts(user_id, idToken)
        //   .then((res) => {
        //     console.log("posts")
        //     // console.log(res.data)
        //     console.log('DropMagnetAPI.getUserPosts', res)
        //   })
        //   console.log('currentUser.getIdToken', idToken)
      })

    if (reswipeModeActive) {
      props.onReswipe(direction, drop_id, index);
    } else {
      props.onSwipe && await props.onSwipe(direction, drop_id, drop);
      if (direction === "right") {
        const currentTab = await getCategorySymbolByPosition(activeTabIndex, allCategories);
        const length = await getCategorySavedDrops(idToken, currentTab)
        // console.log("prevLength: ", length?.length)
        dispatch({ type: "ADD_USER_DATA", payload: { drop_id, dropIndex: index, token: idToken, length: length === null ? 0 : length.length, currentTab: currentTab } });
      }
      if (direction === "left") {
        dispatch({ type: "REMOVE_USER_DATA", payload: { drop_id } });
      }
    }


    // setLastDirection(direction);
    alreadyRemoved.push(drop_id);
  };


  const outOfFrame = (name) => {
    if (allCards.length === alreadyRemoved.length) {
      //if all cards are removed, reload new cards
      dispatch({ type: "FETCH_MORE_FEEDS", payload: true })
      setNewLoading(true);
      return;
    }
    const currIndex = allCards.length - alreadyRemoved.length;
    let start = currIndex < CARD_PRELOAD ? 0 : currIndex - CARD_PRELOAD;
    setCards(allCards.slice(start, currIndex));
  };

  const swipe = (dir) => {
    const cardsLeft = cards.filter(
      (card) => !alreadyRemoved.includes(card.id)
    ); //allCards
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = cards.map((card) => card.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };


  function openDrop(d) {
    // setDropToOpen(categoryList.findIndex(obj => obj.drop_id === drop.drop_id))
    setCurDrop(d)
    setOpenView(true)
  }

  const selector = useSelector(state => state.card)

  function renderDetail() {
    // dispatch(setOpen({isOpen: !selector.isOpen, drop: curDrop}))
    // console.log(selector.isOpen)
    return (
      <div className="drop-detail-container">
        <DropDetail
          show={true}
          drop={curDrop}
          closeDetailView={() => setOpenView(false)}
          handleClick={() => console.log("Click")} />
      </div>
    )
  }


  return (
    <>

      <div className="view-container" id="detCnt" style={{ display: `${!openView ? 'none' : 'block'}` }} >
        {openView && renderDetail()}
      </div>
      <CardContainer onClick={renderDetail} key="cardContainer" className={'fix-minor-bug-swipe swiper-card-container'} style={{ display: `${openView ? 'none' : 'flex'}` }}>
        {cards.length > 0 ? cards.map((cardDetails, index) => {
          const { id } = cardDetails;

          return (
            <TinderCard
              ref={childRefs[index]}
              className={`swipe ${id}`}
              data-id={id}
              key={id}
              onSwipe={(dir) => {
                const u = JSON.parse(localStorage.getItem('userDetails'));
                if (u) {
                  setSwiping(true)
                  return swiped(dir, id, index, cardDetails)
                }
                else { history.push("/login") }
              }}
              onClickSwiperMain={() => openDrop(cardDetails)}
              onCardLeftScreen={() => outOfFrame(id)}
              overlayLabels={true}
            >
              {/* TODO: Truncate is not working */}
              <Card {...cardDetails} title={cardDetails.title.slice(0, 25)} />
            </TinderCard>
          );
        }) : <h4 style={{ textAlign: 'center', width: '100%', fontFamily: 'Azo Sans' }}>No Drops Available</h4>}
      </CardContainer>
      <ActionSection key="footer" style={{ display: `${openView ? 'none' : 'flex'}` }}>
        <MinusBtn onClick={() => {
          const u = JSON.parse(localStorage.getItem('userDetails'));
          if (u) { swipe("left") }
          else { history.push("/login") }
        }}>
          <img src="./minus.svg" alt="minus" />
        </MinusBtn>
        <PlusBtn onClick={() => {
          const u = JSON.parse(localStorage.getItem('userDetails'));
          if (u) { swipe("right") }
          else { history.push("/login") }
        }}>
          <img src="./plus.svg" alt="plus" />
        </PlusBtn>
      </ActionSection>
    </>
  )
}

export default Swiper;
