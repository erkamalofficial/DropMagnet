import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import TinderCard from "../swipe-main";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PlusBtn from "../../../components/blocks/plus-btn";
import MinusBtn from "../../../components/blocks/minus-btn";
import Tabs from "../tabs";
import { data } from "../../../utils/DummyCardData"
import DummyCard from "./dummyCard";
import DummyDropDetail from "../../../components/detail_page/DropDetail/DummyDropDetail";
import { getVideoDrop } from "../../../DropMagnetAPI";
import FadeIn from 'react-fade-in';
import LazyCard from "../LazyCard";

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
`;
const CardContainer = styled.div`
  width: var(--card-container-width);
  height: var(--card-container-height);
  margin-bottom: var(--gap-bottom);
`;

const alreadyRemoved = [];
const CARD_PRELOAD = 25; //card count to preload
function DummySwiper(props) {

  const { db, reswipeModeActive, setDetailView, nextIndex } = props

  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [openView, setOpenView] = useState(false)
  const [curDrop, setCurDrop] = useState({})
  const [loading, setLoading] = useState(true)
  const [newLoading, setNewLoading] = useState(true);
  const [swiping, setSwiping] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch();

  useEffect(() => {
    getVideoDrop()
      .then(res => {
        setLoading(false)
        setAllCards([res])
        setCards([res])
      })
  }, [])

  useEffect(() => {
    alreadyRemoved.length = 0;
  }, [reswipeModeActive]);

  const childRefs = useMemo(
    () =>
      Array(allCards.length)
        .fill(0)
        .map((i) => React.createRef()),
    [allCards.length]
  );

  //const childRefs = useMemo(() => Array(cards.length).fill(0).map(i => React.createRef()), [cards.length])

  const swiped = (direction, drop_id, index) => {
    if (reswipeModeActive) {
      props.onReswipe(direction, drop_id, index);
    } else {
      props.onSwipe && props.onSwipe(direction, drop_id);
      if (direction === "right") {
        dispatch({ type: "ADD_USER_DATA", payload: { drop_id, dropIndex: index } });
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
    let element = document.getElementsByClassName("swipe")[0]
    setCurDrop(d)
    setOpenView(true)
    setDetailView(true)
  }

  function renderDetail() {
    return (
      <div>
        <DummyDropDetail
          show={true}
          drop={curDrop}
          closeDetailView={() => {
            setOpenView(false)
            setDetailView(false)
          }}
          handleClick={() => { }} />
      </div>
    )
  }


  return (
    <>
      <div className="view-container home-container" id="detCnt"
        style={{
          display: `${!openView ? 'none' : 'block'}`,
        }} >
        {openView && renderDetail()}
      </div>
      {loading &&
        (
          <>
            <FadeIn delay={600}>
            </FadeIn>
            <FadeIn delay={1000}>
              <CardContainer key="cardContainer"
                className={'fix-minor-bug-swipe'}
                style={{
                  marginTop: 'var(--main-header-margin-top)'
                }}>
                <LazyCard />
              </CardContainer>
            </FadeIn>
          </>
        )}
      {!loading && !openView && (
        <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'}
          style={{
            display: `${openView ? 'none' : 'flex'}`,
            marginTop: 'var(--main-header-margin-top)'
          }}>
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
                    return swiped(dir, id, index)
                  }
                  else { history.push("/login") }
                }}
                onClickSwiperMain={() => openDrop(cardDetails)}
                onCardLeftScreen={() => outOfFrame(id)}
                overlayLabels={true}
              >
                <DummyCard {...cardDetails} />
              </TinderCard>
            );
          }) : <h4 style={{ textAlign: 'center', width: '100%' }}>No Drops Available</h4>}
        </CardContainer>
      )}
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

export default DummySwiper;
