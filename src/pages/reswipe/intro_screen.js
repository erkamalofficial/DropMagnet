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
margin-top: 20px;
margin-bottom: 20px;
`

export default function IntroScreen(props){
    return(
        <ReswipeCard>
            {/* <h3 className={'top-title'} style={{fontSize: '18px',textAlign: 'center'}}>You’re On Your Way To Becoming A Top Art Collector!</h3> */}
            <h1 className={'h1-large mid-title'} 
            style={{fontSize: '32px',textAlign: 'center', fontFamily: 'Azo Sans', marginTop: '16px'}}
            >It's Time To Reswipe</h1>
            <VideoHolder className={'video-playback'}>
                <VideoPlayer url={'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'} caption={'What is ReSwipe?'} />
            </VideoHolder>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '22px',
                marginTop: '0px',
                fontFamily: 'Azo Sans',
                fontStyle: 'italic',
                fontWeight: '900',
                opacity: '19%',
                fontSize: '32px'
            }}
            >Collecting is an art</h1>
        </ReswipeCard>
    )
}