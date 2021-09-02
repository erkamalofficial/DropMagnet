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
margin-top: 29px;
margin-bottom: 21px;
`

export default function RestartScreen({ selectionCount }) {
    return (
        <ReswipeCard>
            <h1 className={'h1-large'}
                style={{
                    fontSize: '32px',
                    marginTop: "16px",
                    marginBottom: "0",
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    fontWeight: '900',
                    fontFamily: 'Azo Sans',
                }}>
                You’ve got a top {selectionCount}!
            </h1>
            <VideoHolder className={'video-playback'}>
                <VideoPlayer url={'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'} caption={'What Next?'} />

            </VideoHolder>
            <h1
                className={"h1-large"}
                style={{
                    textAlign: 'center',
                    marginBottom: '24px',
                    marginTop: '0px',
                    fontFamily: 'Azo Sans',
                    fontStyle: 'italic',
                    fontWeight: '900',
                    opacity: '19%',
                    fontSize: '31px',
                    whiteSpace: 'nowrap',
                }}
            >
                You’re great at this
            </h1>

        </ReswipeCard>
    )
}