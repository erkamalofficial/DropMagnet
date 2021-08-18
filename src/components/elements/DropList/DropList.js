import React, { useState, useEffect } from 'react';
import DropCell from '../DropCell/DropCell'
import "./DropList.css"
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

export default function DropList(props) {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [swiping, setSwiping] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setListItems(props.drops)
  }, [props.drops])

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  function fetchMoreListItems() {
    // setTimeout(() => {
    // setListItems(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
    // setIsFetching(false);
    // }, 2000);
  }

  // Render functions

  function renderDropCell(drop) {
    return <DropCell style={{
      position: "absolute"
    }} key={drop.drop_id} drop={drop} user={props.isSaved ? drop.artist : props.user} onClick={() => props.onClick(drop)}
      setDetailView={props.setDetailView}
      swiping={swiping}
      setCurDrop={props.setCurDrop} />
  }

  return (
    <div className="drop-list">
      <SwipeableList threshold={0.25}>
        {
          listItems.map(drop => (
            <SwipeableListItem
              swipeLeft={{
                content: <div className="delete-sec">Delete</div>,
                action: () => alert('delete action will be triggered')
              }}
              swipeRight={{
                content: <div className="edit-sec">Edit</div>,
                action: () => alert('edit action will be triggered')
              }}
              onSwipeProgress={progress => setSwiping(true)}
              onSwipeEnd={p => {
                setTimeout(() => {
                  setSwiping(false)
                }, 800);
              }}
              onSwipeStart={p => setSwiping(true)}
            >

              <div className="card">
                {renderDropCell(drop)}
              </div>
            </SwipeableListItem>

          ))}
      </SwipeableList>
      {/* {isFetching && 'Fetching more list items...'} */}
    </div >
  );
};