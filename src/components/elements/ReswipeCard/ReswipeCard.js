import React, { useState, useEffect } from 'react'
import './ReswipeCard.css'

export default function ReswipeCard(props) {

  function renderPlayButton() {
    return <div className="play-button-icon">
      <img height={38} width={38} style={{ paddingLeft: '4px' }} src="./play-icon.png" />
    </div>
  }

  function renderState() {
    if (props.state === 'swipe_done') {
      return <div
        id={"card"}
        className={"card"}
        style={{ marginLeft: 'auto', marginRight: 'auto', borderRadius: '0px', height: '494px' }}
      >
        <div className="h1-mid-large" style={{ textAlign: 'center', margin: '22px 44px 16px 44px', fontWeight: 'bold' }}>You’re so good at this!</div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', paddingBottom: '12px' }}>
            <img width={174} height={174}
              style={{
                borderRadius: '3px',
                paddingRight: '12px',
                objectFit: 'cover',
                objectPosition: '50% 0%'
              }}
              src={props.drops[0].drop_image} />
            <img width={174} height={174} style={{
              borderRadius: '3px',
              objectFit: 'cover',
              objectPosition: '50% 0%'
            }} src={props.drops[1].drop_image} />
          </div>
          <div style={{ display: 'flex' }}>
            <img width={174} height={174} style={{
              borderRadius: '3px',
              paddingRight: '12px',
              objectFit: 'cover',
              objectPosition: '50% 0%'
            }} src={props.drops[2].drop_image} />
            <img width={174} height={174} style={{
              borderRadius: '3px',
              objectFit: 'cover',
              objectPosition: '50% 0%'
            }} src={props.drops[3].drop_image} />
          </div>
        </div>
        <h1 style={{ textAlign: 'center', marginBottom: '22px', marginTop: '14px' }}>Keep All Or Remove With A Tap</h1>
      </div>
    } else if (props.state === 'reswipe_again') {
      return <div
        id={"card"}
        className={"card"}
        style={{ marginLeft: '12px', marginRight: '12px', borderRadius: '0px', height: '494px' }}
      >
        <div className="h1-mid-large" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Let's ReSwipe Again</div>
        <div className="reswipe-video-holder">
          <h1 style={{ textAlign: 'center' }}>Why?</h1>
          {renderPlayButton()}
        </div>
        <h1 style={{ textAlign: 'center', marginBottom: '16px', marginTop: '0px' }}>You’re now a Budding Collector</h1>
        <h1 style={{ textAlign: 'center', marginBottom: '16px', marginTop: '0px' }}>You’ve earned another Gem!</h1>
        <h1 style={{ textAlign: 'center', marginBottom: '22px', marginTop: '0px' }}>Soon you’ll be a Professional!</h1>
      </div>
    } else if (props.state === 'first_reswipe') {
      return <div
        id={"card"}
        className={"card"}
        style={{ marginLeft: '12px', marginRight: '12px', borderRadius: '0px', height: '494px' }}
      >
        <h3 style={{ textAlign: 'center', margin: '22px 66px 24px 66px' }}>You’re On Your Way To Becoming A Top Art Collector!</h3>
        <div className="h1-large" style={{ fontWeight: 'bold', textAlign: 'center' }}>It’s Time To ReSwipe!</div>
        <div className="reswipe-video-holder">
          <h1 style={{
            textAlign: 'center',
            fontSize: "24px",
            whiteSpace: 'nowrap',
            fontWeight: '700',
            fontStyle: 'italic',
            fontFamily: 'Azo Sans',
          }}>
            What Is ReSwipe?
          </h1>
          {renderPlayButton()}
        </div>
        <h1 style={{ textAlign: 'center', marginBottom: '22px', marginTop: '0px' }}>You’ve Earned A Noob Gem!</h1>
      </div>
    }
  }

  return (
    <div>
      {renderState()}
      <div className="swipe-card-bottom-button-holder">
        <div onClick={() => props.reswipeDone()} className="reswipe-button">
          <h1 style={{ margin: '14px auto 16px auto', width: '355px', textAlign: 'center' }}>Start</h1>
        </div>
      </div>
    </div>
  );
}