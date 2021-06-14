import React, { useState } from "react";
import "./DropCell.css";
import DropDetail from "../../detail_page/DropDetail/DropDetail";

export default function DropCell(props) {

  const { user } = props


  let artist_image = user !== null ? user.avatar_url : "./add-user-icon.png"
  let artist_name = user !== null ? user.name : "Null"

  const getDate = (timestamp) => {
    let date = new Date(timestamp)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

  function renderDrop() {
    return <div key={props.drop.id} className="landing-cell" onClick={props.onClick}>
      <div className="drop-inner" onClick={() => {
        props.setDetailView(true);
        props.setCurDrop(props.drop)}
      }>
        <div className="drop-details">
          <div className="drop-header">
            <img className="drop-artist-image" src={artist_image} />
            <div className="drop-header-title" >
              {/* <Marquee> */}
              {artist_name}
              {/* </Marquee> */}
            </div>
          </div>
          <div className="drop-name">{props.drop.title}</div>
          <div className="drop-date">{getDate(props.drop.drop_date)}</div>
          <div className="drop-footer">
            <p2 className="drop-marketplace-title">{props.drop.marketplace}</p2>
            <p2 className="drop-category-title">{props.drop.category}</p2>
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