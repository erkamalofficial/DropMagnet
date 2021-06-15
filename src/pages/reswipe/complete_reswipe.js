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

export default function ReswipeComplete(props){
    return(
        <ReswipeCard>
            <h1 className={'h1-large'} style={{fontSize: '32px',textAlign: 'center'}}>Reswipe Complete !!</h1>
            <VideoHolder className={'video-playback'}>
                <h1 style={{"text-align": "center", fontSize: "22px"}}>What Next?</h1>
                <div className={'play-button-icon'}>
                    <img src= {'./play-icon.png'} height={38} width={38} alt={'play-btn'} />
                </div>
            </VideoHolder>
            <h1 style={{"text-align": "center",fontSize: "16px", "margin-bottom": "12px", "margin-top": "0px"}}>You did a great job!</h1>
            <h1 style={{"text-align": "center",fontSize: "16px", "margin-bottom": "12px", "margin-top": "0px"}}>You’ve become a Pro Art Curator!</h1>
            <h1 style={{"text-align": "center",fontSize: "16px", "margin-bottom": "12px", "margin-top": "0px"}}>It's time to collect what we choose!</h1>

        </ReswipeCard>
    )
}