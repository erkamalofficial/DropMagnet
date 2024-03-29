import React from 'react';
import ReswipeCard from './reswipe_card';
import styled from 'styled-components';
import VideoPlayer from '../../components/VideoPlayer';


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
            <h1 className={'h1-large mid-title'} style={{fontSize: '32px',textAlign: 'center'}}>Reswipe Complete !!</h1>
            <VideoHolder className={'video-playback'}>
                <VideoPlayer url={'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'} caption={'What Next?'} />
            </VideoHolder>
            <h1 style={{"text-align": "center",fontSize: "20px", "margin-bottom": "17px", "margin-top": "0px"}}>You did a great job!</h1>
            <h1 style={{"text-align": "center",fontSize: "20px", "margin-bottom": "17px", "margin-top": "0px"}}>You’ve become a Pro Art Curator!</h1>
            <h1 style={{"text-align": "center",fontSize: "20px", "margin-bottom": "17px", "margin-top": "0px"}}>It's time to collect what we choose!</h1>

        </ReswipeCard>
    )
}