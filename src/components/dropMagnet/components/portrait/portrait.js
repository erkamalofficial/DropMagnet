import React, {useState} from "react";
import styled from "styled-components";
import portraitImg from "../../assets/portrait.png"
import dots from "../../assets/dots.svg";
import share from "../../assets/share.svg";
import GalleryModal from "../galleryModal";

const PortraitWrapper = styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   width:100%;
   height:100%;
   flex-direction: column;
`;

const PortraitImgWrapper = styled.div`
    max-width:400px;
    max-height:550px;
    border-radius: 10px;
    width: 60%;
    overflow:hidden;
`;

const PortraitImg = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`;
const GalleryButtonWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-top:25px;
    button{
        width: 51px;
        height: 51px;
        border-radius: 100px;
        background-color: #ffffff;
        border:none;
        outline: none;
        margin: 0 8px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content: center;
        img{
        width: 27px;
        }
    }
`;

const Portrait = () => {
    const [overlay, setOverlay] = useState(false);

    const closeOverlay = () => {
        setOverlay(false)
    }

    const openOverlay = () => {
        setOverlay(true)
    }
    return (
        <>
            <PortraitWrapper>
                <PortraitImgWrapper>
                    <PortraitImg src={portraitImg} />
                </PortraitImgWrapper>
                <GalleryButtonWrapper>
                    <button onClick={openOverlay}>
                        <img src={dots} alt="dots"/>
                    </button>
                    <button>
                        <img src={share} alt="share"/>
                    </button>
                </GalleryButtonWrapper>
            </PortraitWrapper>
            <GalleryModal isOpen={overlay} closeModal={closeOverlay}/>
        </>
    )
}

export default Portrait