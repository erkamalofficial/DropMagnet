import React, { useCallback, useState } from "react";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styled from "styled-components";
import GalleryModal from "../galleryModal";
import dots from "../../assets/dots.svg";
import LikeButton from "../newUserContent/styled-components/likeButton";
import { get } from "lodash";
// import ShareModal from "../sharingIconsModal";
// import share from "../../assets/share.svg"

// const size = window.innerHeight;

const GalleryWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
     @media(max-height: 550px){
      // align-items: stretch;
    }
`;
const GalleryContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    width: 100%;
    margin: 0 auto;
    // position: absolute;
    margin: 0 auto;
    // top: 50%;
    // left: 50%;
    // -webkit-transform: translate(-50%,-50%);
    //  -moz-transform: translate(-50%,-50%);
    //   -ms-transform: translate(-50%,-50%);
    //    -o-transform: translate(-50%,-50%);
    //       transform: translate(-50%,-50%);
          
    // &.safari {
    //   top: 50%;
    //   left: 50%;
    //   -webkit-transform: translate(-50%, -50%);
    //    -moz-transform: translate(-50%, -50%);
    //     -ms-transform: translate(-50%, -50%);
    //      -o-transform: translate(-50%, -50%);
    //       transform: translate(-50%, -50%);
    // }      
`;
const ImgWrapper = styled.div`
    // max-width: 440px;
    // max-height: 440px;
    // min-width: 250px;
    // min-height: 250px;
    // width: 40vw;
    // height: 40vw;
    // border-radius: 15px;
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 100%;
    // height: 414px;
    // margin-top: 139px;
    
    img{
    position: absolute;
    top: 0;
    width:100%;
    height:100%;
    object-fit: contain;
    }
`;
const GalleryButtonWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-top: 16px;
    // margin-bottom: 55px; 
    .button{
        width: 99px;
        height: 40px;
        border-radius: 9px;
        border: 0.75px solid #000000;
        outline: none;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content: center;
        background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
        
        img{
        width: 27px;
        }
    }
`

const Gallery = (props) => {
    const { iOS, nft } = props;
    const [isZoomed, setIsZoomed] = useState(false);
    const [margin, setMargin] = useState(70);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false)

    const handleZoomChange = useCallback(shouldZoom => {
        setIsZoomed(shouldZoom)
    }, []);


    window.addEventListener("resize", () => {
        if (document.body.clientWidth <= 576) {
            setMargin(20)
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    })

    // const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))

    const closeModal = (e) => {
        e.view.document.querySelector('article').style.overflowY = 'auto'
        setIsOpen(false)
    }

    const openModal = (e) => {
        e.view.document.querySelector('article').style.overflowY = 'hidden'
        setIsOpen(true)
    }

    const getCorrectUrl = (url) => {
        if (url && url.startsWith("ipfs://ipfs/")) {
            url = url.split("ipfs://ipfs/").slice(-1)[0]
            return `https://ipfs.moralis.io:2053/ipfs/${url}`
        }
        else if (url && url.startsWith("ipfs")) {
            url = url.split("ipfs://").slice(-1)[0]
            return `https://ipfs.moralis.io:2053/ipfs/${url}`
        }
        return url
    }

    const getImage = () => {
        if (nft.image) return getCorrectUrl(nft.image)
        else if (nft.image_url) return getCorrectUrl(nft.image_url)
        else if (nft.image_data) {
            let svg = nft.image_data;
            let blob = new Blob([svg], { type: 'image/svg+xml' });
            let url = URL.createObjectURL(blob);
            return url
        }
        return null
    }

    return (
        <>
            <GalleryWrapper >
                <GalleryContent className={iOS && 'safari'}>
                    <ControlledZoom
                        overlayBgColorEnd={"rgba(0,0,0,.7)"}
                        isZoomed={isZoomed}
                        onZoomChange={handleZoomChange}
                        zoomMargin={margin}
                    >
                        <ImgWrapper>
                            <img
                                style={{ objectFit: `${isZoomed && isMobile ? 'contain' : isMobile ? 'cover' : 'contain'}` }}
                                src={getImage()}
                                alt="gallery" />
                        </ImgWrapper>

                    </ControlledZoom>
                    <GalleryButtonWrapper>

                        {/*<button>*/}
                        {/*    <img src={share} alt="share"/>*/}
                        {/*</button>*/}

                        <div>
                            <LikeButton galleryStyle='gallery-style' />
                        </div>

                        <div onClick={openModal} className='button'>
                            <img src={dots} alt="dots" />
                        </div>
                    </GalleryButtonWrapper>

                </GalleryContent>
            </GalleryWrapper>
            <GalleryModal
                nft={nft}
                isOpen={isOpen}
                closeModal={closeModal} />
        </>
    );
};

export default Gallery