import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "./swipe-main";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Card from "./card";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
const SwipeCard = styled.div`
  cursor: pointer;
  background-color: #262626;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  background-size: auto 70%;
  background-repeat: no-repeat;
  background-position: center center;
  max-width: 100%;
  display: flex;
  will-change: transform;
  border-radius: 8px;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  color: white;
  height: auto;
`;
const alreadyRemoved = [];
const CARD_PRELOAD = 25; //card count to preload
function Swiper({ db, reswipeModeActive }) {
  const [allCards, setAllCards] = useState(db);
  const [cards, setCards] = useState(db);
  // const [lastDirection, setLastDirection] = useState();
  const [newLoading, setNewLoading] = useState(true);

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

  return (
    <div>
      <div className="cardContainer">
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
              <SwipeCard className="card">
                <Card {...cardDetails} />
              </SwipeCard>
            </TinderCard>
          );
        })}
      </div>
      <ActionSection key="footer">
        <MinusBtn onClick={() => swipe("left")}>
          <img src="./minus.svg" alt="minus" />
        </MinusBtn>
        <PlusBtn onClick={() => swipe("right")}>
          <img src="./plus.svg" alt="plus" />
        </PlusBtn>
      </ActionSection>
    </div>
  );
}

export default Swiper;
