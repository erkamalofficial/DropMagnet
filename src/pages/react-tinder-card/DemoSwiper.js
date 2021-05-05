import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "../react-tinder-card/index";

const alreadyRemoved = [];
const CARD_PRELOAD = 4; //card count to preload

function DemoSwiper() {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [newLoading, setNewLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);

  useEffect(() => {
    if (newLoading) {
      let db = [];

      for (let i = 0; i < 100; i++) {
        //get random images
        db.push({
          name: "card " + i,
          url: `https://picsum.photos/${i + 200}/300`,
        });
        //db.push({name: 'card ' + i, url: `https://media.tenor.com/images/1a6e398331272fbd91c1f5b4d87d4418/tenor.gif`})
      }
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

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete, swiping);
    setLastDirection(direction);
    setSwiping(true);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    if (allCards.length === alreadyRemoved.length) {
      //if all cards are removed, reload new cards
      // alert("All Done!")
      return;
    }
    //reset the cards to show
    const currIndex = allCards.length - alreadyRemoved.length;
    let start = currIndex < CARD_PRELOAD ? 0 : currIndex - CARD_PRELOAD;
    setCards(allCards.slice(start, currIndex));
    setSwiping(false);
  };

  const swipe = (dir) => {
    if (swiping) return;
    const cardsLeft = cards.filter(
      (card) => !alreadyRemoved.includes(card.name)
    ); //allCards
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = cards.map((card) => card.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div className="cardWrapper">
      <h3>Tinder Card</h3>
      <div className="cardContainer" disabled={swiping}>
        {cards.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>Swipe left!</button>
        <button onClick={() => swipe("up")}>Swipe up!</button>
        <button onClick={() => swipe("right")}>Swipe right!</button>
      </div>
      {/* {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>} */}
    </div>
  );
}

export default DemoSwiper;
