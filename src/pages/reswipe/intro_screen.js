import React from 'react';
import ReswipeCard from './reswipe_card';
import styled from 'styled-components';

const VideoHolder = styled.div`
height: 300px;
width: 300px;
cursor: pointer;
border-radius: 3px;
position: relative;
align-self: center;
background-color: #969292;
margin-top: 24px;
margin-bottom: 26px;
`

export default function IntroScreen(props){
    return(
        <ReswipeCard>
            <h3 style={{fontSize: '18px',textAlign: 'center'}}>You’re On Your Way To Becoming A Top Art Collector!</h3>
            <h1 className={'h1-large'} style={{fontSize: '32px',textAlign: 'center'}}>It's Time To Reswipe</h1>
            <VideoHolder className={'video-playback'}>
                <h1 style={{"text-align": "center", fontSize: "22px"}}>What Is ReSwipe?</h1>
                <div className={'play-button-icon'}>
                    <img src= {'./play-icon.png'} height={38} width={38} alt={'play-btn'} />
                </div>
            </VideoHolder>
            <h1 style={{"text-align": "center", "margin-bottom": "22px", "margin-top": "0px"}}>You’ve Earned A Noob Gem!</h1>
        </ReswipeCard>
    )
}