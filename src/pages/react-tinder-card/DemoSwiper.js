import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "./index";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";

const alreadyRemoved = [];
const CARD_PRELOAD = 25; //card count to preload
function DemoSwiper({ db }) {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  // const [lastDirection, setLastDirection] = useState();
  const [newLoading, setNewLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newLoading) {
      // for (let i = 0; i <  25; i++) {
      //   db.push({
      //     name: "card " + i,
      //     url: `https://picsum.photos/${i + 200}/300`,
      //   });
      // }

      setAllCards(db);
      let start = db.length < CARD_PRELOAD ? 0 : db.length - CARD_PRELOAD;
      setCards(db.slice(start, db.length));
      setNewLoading(false);
      alreadyRemoved.length = 0;
    }
  }, [newLoading]);

  const childRefs = useMemo(
    () =>
      Array(allCards.length)
        .fill(0)
        .map((i) => React.createRef()),
    [allCards.length]
  );
  //const childRefs = useMemo(() => Array(cards.length).fill(0).map(i => React.createRef()), [cards.length])

  const swiped = (direction, drop_id) => {
    console.log("direction: " + direction);
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
    if (allCards.length === alreadyRemoved.length) {
      //if all cards are removed, reload new cards
      setNewLoading(true);
      return;
    }
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
        {cards.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={`swipe ${character.drop_id}`}
            data-id={character.drop_id}
            key={character.drop_id}
            onSwipe={(dir) => swiped(dir, character.drop_id)}
            onCardLeftScreen={() => outOfFrame(character.drop_id)}
            overlayLabels={true}
          >
            <div
              style={{ backgroundImage: "url(" + character.drop_image + ")" }}
              className="card"
            >
              <h3>{character.title}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>Swipe left!</button>
        <button onClick={() => swipe("up")}>Swipe up!</button>
        <button onClick={() => swipe("right")}>Swipe right!</button>
      </div>
    </div>
  );
}

export default DemoSwiper;
