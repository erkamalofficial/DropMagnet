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

export default function RestartScreen({selectionCount}){
    return(
        <ReswipeCard>
            <h1 className={'h1-large'} style={{fontSize: '32px',textAlign: 'center'}}>You’ve got a top {selectionCount}!</h1>
            <VideoHolder className={'video-playback'}>
                <h1 style={{"text-align": "center", fontSize: "22px"}}>What Next?</h1>
                <div className={'play-button-icon'}>
                    <img src= {'./play-icon.png'} height={38} width={38} alt={'play-btn'} />
                </div>
            </VideoHolder>
            <h1 style={{"text-align": "center", "margin-bottom": "22px", "margin-top": "0px"}}>Now You're a curator!</h1>
            <h1 style={{"text-align": "center", "margin-bottom": "22px", "margin-top": "0px"}}>And now can exit reswipe</h1>
            <h1 style={{"text-align": "center", "margin-bottom": "22px", "margin-top": "0px"}}>Or Continue to Find the one!</h1>

        </ReswipeCard>
    )
}