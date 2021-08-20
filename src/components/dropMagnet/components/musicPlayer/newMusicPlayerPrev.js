import React, {useRef, useState} from "react";
import playBtn from "../../assets/play-btn.svg";
import pauseBtn from "../../assets/pause-btn.svg";
import styled from "styled-components";
import playerBackground from "../../assets/player-background.png";
import buttonBackground from "../../assets/circle.svg";
import song1 from "../../musics/Be a Music.mp3";
import ProgressBar from "./progressBar-";


const MusicPlayerWrapper = styled.div`
  max-width: 336px;
  width: 100%;
  height: 158px;
  border-radius: 11px;
  border: 1px solid #6f4b8f;
  background-color: #d8d8d8;
  background-image: url(${playerBackground});
  background-origin: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin: 0 auto;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  @media(max-width: 400px){
       // max-width: 90%;
  }
  @media(max-width: 370px){
       max-width: 85%;
  }
`;
const MusicSecond = styled.p`
  color: #f3f3f3;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  padding: 9px 15px 11px 24px;
  border-radius: 11px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  margin: 0 0 0 auto;
  @media(max-width: 400px){
   font-size: 14px;
  }
`;
const MusicName = styled.p`
 color: #f3f3f3;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: right;
  padding: 13px 15px 11px 24px;
  border-radius: 11px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
  @media(max-width: 400px){
   font-size: 16px;
  }
`;

const MusicPlayBtn = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 28px;
    width: 89px;
    height: 89px;
    box-shadow: 0 6px 13px rgba(0, 0, 0, 0.5), inset 0 4px 6px rgba(0, 0, 0, 0.5);
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none !important;
    // border:none;
    // overflow: hidden;
      z-index: 1000;
    
    img{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%);
      width: 34px;
      height: 35px;
      object-fit: contain;
      z-index: 10;
    }
    @media(max-width: 400px){
    width: 70px;
    height: 70px;
    }
`;
const PlayBtnBack = styled.div`
   width:100%;
   height: 100%;
   position: absolute;
   background: #070707;
   border-radius: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    &.animate{
    animation: anime 6s infinite linear;
    }
    @keyframes anime {
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
}
`


// const useAudio = (url, audioRef) => {
//     const audio = audioRef.current;
//
//     const [playing, setPlaying] = useState(false);
//
//     const toggle = () => {
//         setPlaying(!playing)
//     };
//
//     useEffect(() => {
//             playing ? audio.play() : audio.pause();
//         },
//         [playing, audio]
//     );
//
//     useEffect(() => {
//         audio.addEventListener('ended', () => setPlaying(false));
//         return () => {
//             audio.removeEventListener('ended', () => setPlaying(false));
//         };
//     }, [audio]);
//
//     return [playing, toggle];
// };

const NewMusicPlayer = () => {
    // const [playing, toggle] = useAudio(song1);
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const toggle = (audio) => {
        if(playing){
            audio.pause()
        }else {
            audio.play()
        }
        setPlaying(!playing)
    };
    return (
        <MusicPlayerWrapper>
            <ProgressBar />
            {/*<MusicSecond>*/}
            {/*    30 second preview*/}
            {/*</MusicSecond>*/}
            {/*<MusicName>*/}
            {/*    I Wanna Be A Spaceman*/}
            {/*</MusicName>*/}
            {/*<audio src={song1} controls ref={audioRef} style={{display: "none"}}/>*/}
            {/*    <MusicPlayBtn onClick={() => toggle(audioRef.current)}>*/}

            {/*        <PlayBtnBack className={`${playing && "animate"}`}/>*/}
            {/*        {*/}
            {/*            playing*/}
            {/*                ?*/}
            {/*                <img src={pauseBtn} alt="pauseBtn" />*/}
            {/*                :*/}
            {/*                <img src={playBtn} alt="playBtn" />*/}
            {/*        }*/}
            {/*    </MusicPlayBtn>*/}
        </MusicPlayerWrapper>
    )
}

export default NewMusicPlayer