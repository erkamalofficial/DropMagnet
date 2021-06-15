import React, { useState, useEffect } from 'react'
import "./DropDetail.css"
import { epochToDayMonthHour } from '../../../helpers/DateFormatter'

export default function DropDetail(props) {

  function closeDetail() {
    props.closeDetailView()
  }

  
  function renderMusicSideDetails() {
    return <div className="music-info-detail">
      <p2 style={{color: '#F5F5F5', opacity: '0.66', fontWeight: 'bold', transform: 'rotate(-90deg)', position: 'absolute', bottom: '24px', left: '8px', transformOrigin: '0 0', width: '164px'}} >30 Second Song Preview</p2>
    </div>
  }

  function renderPlayButton() {
    return <div className="play-button-icon">
      <img height={38} width={38} style={{paddingLeft: '4px'}} src="./play-icon.png" />
    </div>
  }

  return (
    <div className="detail-view">
      <div className="detail-view-header">
        <img className="detail-view-header-image" src={props.drop.artist_image}/>
        <h1 className="drop-detail-title">{props.drop.artist}</h1>
        <img style={{width: '39px', height: '39px',cursor: 'pointer'}} onClick={() => closeDetail()} className="close-detail-button close-button" src="./close-icon.png" />
      </div>
      <div className="drop-detail-image" onClick={() => props.handleClick()}>
        {props.drop.type === "music" ? renderMusicSideDetails() : <></>}
        {props.drop.type === "music" ? renderPlayButton() : <></>}
        <img style={{height: '244px', width: '244px', borderRadius: '6px'}}  src={props.drop.drop_image} />
      </div>
      <h1 className="drop-detail-title">{props.drop.title}</h1>
      <div style={{height: '1px', background: '#2F2F2F', margin: '12px 50px 0 50px'}} />
      <div className="drop-detail-holder" style={{marginTop: '12px'}}>
        <p2 className="drop-marketplace-title">{props.drop.marketplace}</p2>
        <p2 className="drop-category-title">{props.drop.category}</p2>
      </div>
      <div className="drop-detail-holder" style={{marginTop: '0px'}}>
        <p2 className="drop-detail-piece-no">{props.drop.drop_pieces} Pieces</p2>
        <p2 className="drop-detail-date">{epochToDayMonthHour(props.drop.drop_date)}</p2>
      </div>
      <div className="drop-description-holder">
        <p1 className="drop-detail-description-text">{props.drop.description}</p1>
      </div>
      <div className="bottom-button-holder">
        <div className="dismiss-button-unselected">
          <div style={{margin: '-6px auto 0 auto'}}>
            <img width={32} src="./discard-icon.png" className={'clickable'} />
          </div>
        </div>
        <div className="add-button-unselected">
        <img style={{margin: '0 auto'}} width={32} height={32} className={'clickable'} src="./add-icon.png" />
        </div>
      </div>
    </div>
  );
}
