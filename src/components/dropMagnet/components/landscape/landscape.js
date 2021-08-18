import React, {useState} from "react";
import styled from "styled-components";
import landscapeImg from "../../assets/landscape.png"
import dots from "../../assets/dots.svg";
import share from "../../assets/share.svg";
import GalleryModal from "../galleryModal";

const LandscapeWrapper = styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   width:100%;
   height:100%;
   flex-direction:column;
`;

const LandscapeImgWrapper = styled.div`
    max-width:600px;
    max-height:350px;
    border-radius: 10px;
    width: 90%;
    overflow:hidden;
`;

const LandscapeImg = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`;

const GalleryButtonWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-top:25px;
    margin-bottom: 20px;
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

const Landscape = () => {
    const [overlay, setOverlay] = useState(false);

    const closeOverlay = () => {
        setOverlay(false)
    }

    const openOverlay = () => {
        setOverlay(true)
    }
    return (
        <>
            <LandscapeWrapper>
                <LandscapeImgWrapper>
                    <LandscapeImg src={landscapeImg} />
                </LandscapeImgWrapper>
                <GalleryButtonWrapper>
                    <button onClick={openOverlay}>
                        <img src={dots} alt="dots"/>
                    </button>
                    <button>
                        <img src={share} alt="share"/>
                    </button>
                </GalleryButtonWrapper>
            </LandscapeWrapper>
            <GalleryModal isOpen={overlay} closeModal={closeOverlay}/>
        </>
    )
}

export default Landscape