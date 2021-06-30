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

export default function RestartScreen({selectionCount}){
    return(
        <ReswipeCard>
            <h1 className={'h1-large'} style={{fontSize: '32px',marginTop: "22px",marginBottom: "-2px",textAlign: 'center'}}>You’ve got a top {selectionCount}!</h1>
            <VideoHolder className={'video-playback'}>
                <VideoPlayer url={'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'} caption={'What Next?'} />
                
            </VideoHolder>
            <h1 style={{"text-align": "center", "margin-bottom": "17px", "margin-top": "0px"}}>Now You're a curator!</h1>
            <h1 style={{"text-align": "center", "margin-bottom": "17px", "margin-top": "0px"}}>And now can exit reswipe</h1>
            <h1 style={{"text-align": "center", "margin-bottom": "17px", "margin-top": "0px"}}>Or Continue to Find the one!</h1>

        </ReswipeCard>
    )
}