import React, { useState, useEffect } from 'react'
import "./DropDetail.css"
import { formatDate } from '../../../helpers/DateFormatter'
import UserIcon from "../../../asstes/add-user-icon.png"

export default function ProfileDropDetail(props) {

  function closeDetail() {
    props.closeDetailView()
  }
  const { user } = props
  let artist_image = props.isSaved ? (props.drop.artist.avatar_url || UserIcon):(user ? (user.avatar_url || UserIcon): UserIcon)
  let artist_name = props.isSaved ? props.drop.artist.name: (user ? user.name: '')
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
        <img className="detail-view-header-image" src={artist_image}/>
        <h1 className="drop-detail-title">{artist_name}</h1>
        <img className="close-detail-button close-button view-close-btn" style={{width: '39px', height: '39px',cursor: 'pointer'}} onClick={() => closeDetail()} src="./close-icon.png" />
      </div>
      <div className="drop-detail-image" onClick={() => props.handleClick()}>
        {props.drop.type === "music" ? renderMusicSideDetails() : <></>}
        {props.drop.type === "music" ? renderPlayButton() : <></>}
        <img style={{height: '244px', width: '244px', borderRadius: '6px'}}  
        src={props.drop.media[0].url} />
      </div>
      <h1 className="drop-detail-title">{props.drop.title}</h1>
      <div style={{height: '1px', background: '#2F2F2F', margin: '12px 50px 0 50px'}} />
      <div className="drop-detail-holder" style={{marginTop: '12px'}}>
        <p2 className="drop-marketplace-title">{props.drop.marketplace}</p2>
        <p2 className="drop-category-title">{props.drop.category}</p2>
        <p2 className="drop-price"><span>Ξ</span> 
             {props.drop.price !== '' && props.drop.price!==undefined ? props.drop.price 
            : props.drop.auction_price && props.drop.auction_price!==undefined ? props.drop.auction_price 
            : 0}
        </p2>
      </div>
      <div className="drop-detail-holder" style={{marginTop: '0px'}}>
        {props.drop.drop_pieces !== undefined && <p2 className="drop-detail-piece-no">{props.drop.drop_pieces} Pieces</p2>}
        <p2 className="drop-detail-date">{formatDate(props.drop.drop_date,true)}</p2>
      </div>
      <div className="drop-description-holder">
        <p1 className="drop-detail-description-text">
          {props.drop.desc}
        </p1>
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
