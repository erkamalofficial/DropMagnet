import React, { useState, useEffect } from 'react';
import DropCell from '../DropCell/DropCell'
import "./DropList.css"
// import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
// import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


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

  // const leadingActions = () => (
  //   <LeadingActions>
  //     <SwipeAction onClick={() => console.info('leading action triggered')}>
  //       Action name
  //     </SwipeAction>
  //   </LeadingActions>
  // );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => alert('Delete action will be triggered.')}
      >
        <div className="icon">
          <DeleteIcon className="svg-icon delete" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="drop-list">
      <SwipeableList
        type={ListType.IOS}
        scrollStartThreshold={0}>
        {
          listItems.map(drop => (
            <SwipeableListItem
              swipeStartThreshold={0}
              // leadingActions={leadingActions()}
              trailingActions={trailingActions()}
              onSwipeProgress={progress => {
                console.log(progress)
                setSwiping(true)
              }}
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