import React, { useState } from "react";
import "./DropCell.css";
import DropDetail from "../../detail_page/DropDetail/DropDetail";
import { formatDate } from "../../../helpers/DateFormatter";
import Avatar from "../Avatar/Avatar";
import { getInitials } from "../../../utils";

export default function DropCell(props) {

  const { user } = props

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
    else{
      return ''
    }

  }

  function renderDrop() {
    return <div key={props.drop.id} className="landing-cell" onClick={props.onClick}>
      <div className="drop-inner" onClick={() => {
        props.setDetailView(true);
        props.setCurDrop(props.drop)
      }
      }>
        <div className="drop-details">
          <div className="drop-header">
            <Avatar initial={getInitials(artist_name,"")} userImage={artist_image} view_only small />
            {/* <img className="drop-artist-image" src={artist_image} /> */}
            {artist_name!=='' && 
            <div className="drop-header-title" >
              {/* <Marquee> */}
              {artist_name}
              {/* </Marquee> */}
            </div>}
          </div>
          {dropTitle!=='' && <div className="drop-name">{dropTitle}</div>}
          <div className="drop-date">{formatDate(props.drop.drop_date,true)}</div>
          <div className="drop-footer">
            {marketPlace !== '' && <p2 className="drop-marketplace-title">{marketPlace}</p2>}
            {category !== '' && <p2 className="drop-category-title">{category}</p2>}
            {price !== '' && <p2 className="drop-price"><span>Ξ</span> {price}</p2>}
          </div>
        </div>
        <img className="drop-image" src={props.drop.media[0].url} />
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