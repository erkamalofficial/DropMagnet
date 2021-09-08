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
import { useAuth } from '../../../contexts/FirebaseAuthContext';
import * as DropMagnetAPI from "../../../DropMagnetAPI"
import LoadingModal from '../LoadingModal/LoadingModal';

export default function DropList(props) {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [swiping, setSwiping] = useState(false)
  const [loading, setLoading] = useState(false)

  const { currentUser } = useAuth()

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

  const trailingActions = (drop) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          let ans = window.confirm("Do you really want to delete the drop?")
          if (ans) {
            setLoading(true)
            currentUser && currentUser.getIdToken().then((idToken) => {
              DropMagnetAPI.deleteDrop(drop.id, idToken)
                .then(res => {
                  alert(res.message)
                  setLoading(false)
                  window.location.reload()
                })
            })
          }
        }}
      >
        <div className="icon">
          <DeleteIcon className="svg-icon delete" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="drop-list">
      {loading && (<LoadingModal label={'Deleting Drop...'} />)}
      {!props.isSaved ? (
        <SwipeableList
          type={ListType.IOS}
          scrollStartThreshold={0}>
          {
            listItems.map(drop => (
              <SwipeableListItem
                swipeStartThreshold={0}
                // leadingActions={leadingActions()}
                trailingActions={trailingActions(drop)}
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
      ) : (
        <>
          {
            listItems.map(drop => (
              <div className="card" style={{marginBottom: '10px'}}>
                {renderDropCell(drop)}
              </div>
            ))}
        </>
      )}
      {/* {isFetching && 'Fetching more list items...'} */}
    </div >
  );
};