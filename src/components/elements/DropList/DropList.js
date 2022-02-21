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
import InfiniteScroll from 'react-infinite-scroll-component';

export default function DropList(props) {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [swiping, setSwiping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(20)
  const [index, setIndex] = useState(0)

  const { currentUser } = useAuth()

  const loadItems = () => {
    if (window.location.pathname === "/profile") {
      const arr = props.drops.slice(0, stage)
      setListItems(arr)
      setStage(prev => prev + 20)
    }
    else {
      if(index > 0) {
      currentUser
      .getIdToken(false)
      .then(function (idToken) {
        DropMagnetAPI.getFeeds2(props.user_id, {curTime: index, token: idToken}).then((res) => {
          const drops = listItems
          for(let i = 0; i < res.drops.length; i++) {
            drops.push(res.drops[i])
          }
          setIndex(res.index)
          setListItems(drops)
          setStage(prev => prev + 20)
        })
      })
    }
  }
  }

  // useEffect(() => {
  //   currentUser
  //     .getIdToken(false)
  //     .then(function (idToken) {
  //       DropMagnetAPI.getFeeds2(props.user_id, {curTime: index > 0 ? index : Date.now(), token: idToken}).then((res) => {
  //         setIndex(res.index)
  //         setListItems(res.drops)
  //         setStage(prev => prev + 20)
  //       })
  //     })
  // }, [index])

  useEffect(() => {
    console.log(props)
    if(props.isSaved !== true) {
    currentUser
      .getIdToken(false)
      .then(function (idToken) {
        DropMagnetAPI.getFeeds2(props.user_id, {curTime: Date.now(), token: idToken}).then((res) => {
          setIndex(res.index)
          setListItems(res.drops)
          setStage(prev => prev + 20)
        })
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadItems()
    // setListItems(props.drops)
  }, [props.drops])

  useEffect(() => {
    if (!isFetching) return;
    // fetchMoreListItems();
    loadItems()
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
            <InfiniteScroll 
            dataLength={listItems.length}
            next={loadItems}
            hasMore={true}
            loader={<><h4>Loading...</h4></>}
            endMessage={<></>}
            >
          {
            listItems.length > 0 && listItems.map(drop => (
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
            </InfiniteScroll>
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