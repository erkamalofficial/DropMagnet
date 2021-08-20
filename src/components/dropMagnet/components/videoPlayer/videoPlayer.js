import React, {useState} from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import dots from "../../assets/dots.svg";
import GalleryModal from "../galleryModal";
import LikeButton from "../newUserContent/styled-components/likeButton";


const PlayerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`;
const ReactPlayerWrapper = styled.div`
    max-width: 640px;
    // max-height: 360px;
    width: 100%;
    // height: calc(100vw/1.8);
    position: absolute;
     
`;
const GalleryButtonWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-top:16px;
    // margin-bottom: 50px;
    .button{
        // width: 51px;
        // height: 51px;
        // border-radius: 100px;
        // background-color: #ffffff;
        width: 99px;
        height: 40px;
        border-radius: 9px;
        border: 0.75px solid #000000;
        // border:none;
        outline: none;
        // margin: 0 8px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content: center;
        background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
        
        img{
        width: 27px;
        }
    }
`;

const VideoPlayer = ({iOS}) => {
    const [overlay, setOverlay] = useState(false);

    const closeOverlay = () => {
        setOverlay(false)
    }

    const openOverlay = () => {
        setOverlay(true)
    }
    return (
        <>
            <PlayerWrapper>
                <ReactPlayerWrapper className={iOS && 'safari'}>
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=MzI_CIYSsfQ'
                        controls={true}
                        width='100%'
                        height='414px'
                    />

                    <GalleryButtonWrapper>

                        {/*<button>*/}
                        {/*    <img src={share} alt="share"/>*/}
                        {/*</button>*/}

                        <LikeButton galleryStyle='gallery-style'/>

                        <div onClick={openOverlay} className='button'>
                            <img src={dots} alt="dots"/>
                        </div>
                    </GalleryButtonWrapper>
                </ReactPlayerWrapper>

            </PlayerWrapper>
            <GalleryModal isOpen={overlay} closeModal={closeOverlay}/>
        </>
    )
}

export default VideoPlayer