import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import video from '../../assets/sample-mp4-file.mp4';

const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--lightBlack);
`;

const VideoPlayerBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
`;

const ExtraContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function VideoPlayer({ url, caption }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [isPlayerReady, setIsPlayerReady] = useState(true);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)


  const config = {
    file: {
      forceHLS: !isSafari,
      forceVideo: true,
      hlsVersion: '0.12.4'
    }
  };

  return (
    <VideoPlayerContainer>
      {!isPlaying && isPlayerReady && (
        <ExtraContainer>
          <div style={{ "text-align": "center", fontSize: "22px",marginBottom: "12px" }}>
            {caption}
          </div>
          <div
            className={"play-button-icon"}
            style={{position: 'static',transform: 'none'}}
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={"./play-icon.png"}
              height={38}
              width={38}
              alt={"play-btn"}
            />
          </div>
        </ExtraContainer>
      )}

      <VideoPlayerBody>
        <ReactPlayer url={video}  stopOnUnmount playing={isPlaying} controls={isPlaying && isPlayerReady} width={'100%'} height={'100%'} onReady={()=>{
            setIsPlayerReady(true);
        }}   />
      </VideoPlayerBody>
    </VideoPlayerContainer>
  );
}
