import React, { useState, useEffect } from 'react'
import "./DropDetail.css"

export default function DropDetail(props) {

  function closeDetail() {
    props.closeDetailView()
  }

  return (
    <div className="detail-view">
      <div className="detail-view-header">
        <img className="detail-view-header-image" src={props.drop.artist_image}/>
        <h1 className="drop-detail-title">{props.drop.artist}</h1>
        <img onClick={() => closeDetail()} className="close-detail-button" src="./close-icon.png" />
      </div>
      <img className="drop-detail-image" src={props.drop.drop_image}/>
      <h1 className="drop-detail-title">{props.drop.title}</h1>
      <div className="drop-detail-holder">
        <div className="drop-marketplace-title">{props.drop.marketplace}</div>
        <div className="drop-category-title">{props.drop.category}</div>
      </div>
      <div className="drop-detail-holder">
        <p2 className="drop-detail-piece-no">{props.drop.drop_pieces} Pieces</p2>
        <p2 className="drop-detail-date">{props.drop.drop_date}</p2>
      </div>
      <div className="drop-description-holder">
        <p1 className="drop-detail-description-text">{props.drop.description}</p1>
      </div>
      <div className="bottom-button-holder">
        <div className="dismiss-button-unselected">
          <div style={{margin: '-6px auto 0 auto'}}>
            <img width={34} src="./discard-icon.png" />
          </div>
        </div>
        <div className="add-button-unselected">
        <img style={{margin: '0 auto'}} width={34} height={34} src="./add-icon.png" />
        </div>
      </div>
    </div>
  );
}
