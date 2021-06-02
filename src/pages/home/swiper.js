import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "./swipe-main";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Card from "./card";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";

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
function Swiper(props) {

  const { db, reswipeModeActive, detailView, setDetailView } = props

  const [allCards, setAllCards] = useState(db);
  const [cards, setCards] = useState(db);
  // const [lastDirection, setLastDirection] = useState();
  const [newLoading, setNewLoading] = useState(true);
  const [curDrop, setCurDrop] = useState({})

  const dispatch = useDispatch();

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

  const swiped = (direction, drop_id) => {
    // console.log("direction:KKK " + direction);
    if (direction === "right") {
      dispatch({ type: "ADD_USER_DATA", payload: { drop_id } });
    }
    if (direction === "left") {
      dispatch({ type: "REMOVE_USER_DATA", payload: { drop_id } });
    }

    // setLastDirection(direction);
    alreadyRemoved.push(drop_id);
  };


  const outOfFrame = (name) => {
    // if (allCards.length === alreadyRemoved.length) {
    //   //if all cards are removed, reload new cards
    //   setNewLoading(true);
    //   return;
    // }
    //reset the cards to show
    // const currIndex = allCards.length - alreadyRemoved.length;
    // let start = currIndex < CARD_PRELOAD ? 0 : currIndex - CARD_PRELOAD;
    // setCards(allCards.slice(start, currIndex));
  };

  const swipe = (dir) => {
    const cardsLeft = cards.filter(
      (card) => !alreadyRemoved.includes(card.drop_id)
    ); //allCards
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].drop_id; // Find the card object to be removed
      const index = cards.map((card) => card.drop_id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  function openDrop(drop, param) {
    if (param === 'clicked') {

      // setDropToOpen(categoryList.findIndex(obj => obj.drop_id === drop.drop_id))
      setCurDrop(drop)
      setDetailView(true)
    }
  }

  function renderDetail() {
    return (
      <div>
        <DropDetail drop={curDrop} closeDetailView={() => setDetailView(false)} handleClick={() => console.log("Click")} />
      </div>
    )
  }

  return (
    [
      <div className="view-container home-container" style={{ display: `${!detailView ? 'none' : 'block'}` }} >
        {renderDetail()}
      </div>,
      <CardContainer key="cardContainer" style={{ display: `${detailView ? 'none' : 'flex'}` }}>
        {cards.map((cardDetails, index) => {
          const { drop_id } = cardDetails;
          return (
            <TinderCard
              ref={childRefs[index]}
              className={`swipe ${drop_id}`}
              data-id={drop_id}
              key={drop_id}
              onSwipe={(dir) => swiped(dir, drop_id)}
              onCardLeftScreen={() => outOfFrame(drop_id)}
              overlayLabels={true}
            >
              <Card {...cardDetails} handleDrop={openDrop} />
            </TinderCard>
          );
        })}
      </CardContainer>,
      <ActionSection key="footer" style={{ display: `${detailView ? 'none' : 'flex'}` }}>
        <MinusBtn onClick={() => swipe("left")}>
          <img src="./minus.svg" alt="minus" />
        </MinusBtn>
        <PlusBtn onClick={() => swipe("right")}>
          <img src="./plus.svg" alt="plus" />
        </PlusBtn>
      </ActionSection>,
    ]
  )
}

export default Swiper;
