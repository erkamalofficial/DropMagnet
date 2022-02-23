import React, { useState } from "react";
import "./DropCell.css";
import DropDetail from "../../detail_page/DropDetail/DropDetail";
import { formatDate } from "../../../helpers/DateFormatter";
import Avatar from "../Avatar/Avatar";
import { getInitials } from "../../../utils";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../contexts/FirebaseAuthContext";

export default function DropCell(props) {

  const { user } = props
  const history = useHistory()

  const { currentUser } = useAuth();

  let dropTitle = props.drop.title

  let artist_image = user && user.avatar_url !== '' ? user.avatar_url : ""
  let artist_name = user && user.name

  let marketPlace = props.drop.marketplace
  let category = props.drop.category
  let price = props.drop.price !== "" && props.drop.price !== undefined ? props.drop.price
    : props.drop.auction_price !== undefined ? props.drop.auction_price
      : 0

  const getDate = (timestamp) => {
    if (timestamp > 1000000) {
      let date = new Date(timestamp)
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }
    else {
      return ''
    }
  }

  const openUser = (e) => {
    const user_id = currentUser.uid;
    if (user_id !== user?.id) {
      history.push(`/profile/${user?.id}`)
    }
  }

  function renderDrop() {
    return <div key={props.drop.id} className="landing-cell" onClick={props.onClick}>
      <div className="drop-inner" onClick={() => {
        props.setCurDrop(props.drop)
        if (!props.swiping) {
          props.setDetailView(true);
        }
      }
      }>
        <div className="drop-details">
          <div className="drop-header" >
            <Avatar initial={getInitials(artist_name)}
              userImage={artist_image} view_only small
              userId={user?.id} />
            {/* <img className="drop-artist-image" src={artist_image} /> */}
            {artist_name !== '' &&
              <div className="drop-header-title"
                onClick={openUser}>
                {artist_name}
              </div>}
          </div>
          {dropTitle !== '' && <div className="drop-name">{dropTitle}</div>}
          <div className="drop-date">{formatDate(props.drop.drop_date, true)}</div>
          <div className="drop-footer">
            {marketPlace !== '' && <p2 className="drop-marketplace-title">{marketPlace}</p2>}
            {category !== '' && <p2 className="drop-category-title">{category}</p2>}
            {price !== '' && <p2 className="drop-price"><span>Ξ</span> {price}</p2>}
          </div>
        </div>
        {props.drop.media[0].type === "video" ? (
          <video className="drop-image" width="100%" height="100%" autoPlay loop muted playsInline>
          <source src={props.drop.media[0].url} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        ) : (
        <img className="drop-image" src={props.drop.media[0].url} alt="/" />
        )}
      </div>
    </div>
  }


  return (
    <div>
      {/* <Link to={''props.drop} > */}
      {renderDrop()}
      {/* </Link> */}
    </div>
  );
}