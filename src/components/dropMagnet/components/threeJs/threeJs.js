import React, {useState} from "react";
import laptop from "../../assets/laptop.glb";
import styled from "styled-components";
import Modal from 'react-modal';
import dots from "../../assets/dots.svg";
import share from "../../assets/share.svg";
import GalleryModal from "../galleryModal";

const ThreeWrapper = styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   width:100%;
   height:100%;
   position:relative;
   flex-direction:column;
`;
const CloseButton = styled.button`
    color: #fff;
    font-size: 32px;
    background: transparent;
    border:none;
    outline: none;
    cursor:pointer;
    position: absolute;
    top: 30px;
    right: 32px;
    z-index: 9999;
    @media(max-width: 500px){
        top: 12px;
        right: 15px;
    }
`;
const OpenModalButton = styled.button`
    padding: 8px 16px;
    border-radius: 26px;
    background-color: #101010;
    color: #eaeaea;
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    border:none;
    outline: none;
    cursor: pointer;
    margin-top:20px;
`;
const StyledModal = styled(Modal)`
  background-color: #1a1a1a;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const GalleryButtonWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-top:25px;
    margin-bottom: 80px;
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

const MyModal = (props) => {
    return (
        <StyledModal
            isOpen={props.isOpen}
            contentLabel="Example Modal"
            className="MODAL"
            appElement={document.getElementById('portal')}>
            <CloseButton onClick={props.onRequestClose}>&#10005;</CloseButton>
            <model-viewer
                style={{width: "100%", height: "100%"}}
                src={laptop}
                ar
                ar-modes="webxr scene-viewer quick-look"
                environment-image="neutral"
                auto-rotate
                camera-controls />
        </StyledModal>
    )
}


const Three = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [overlay, setOverlay] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const closeOverlay = () => {
        setOverlay(false)
    }

    const openOverlay = () => {
        setOverlay(true)
    }
    return (
          <>
              <ThreeWrapper>
                  <model-viewer
                      style={{width: "100%", height: "300px"}}
                      src={laptop}
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      environment-image="neutral"
                      disable-zoom
                      auto-rotate
                  />
                  <OpenModalButton onClick={openModal}>Click to see it</OpenModalButton>
                  <MyModal isOpen={modalIsOpen} onRequestClose={closeModal} className="MODALIK"/>
                  <GalleryButtonWrapper>
                      <button onClick={openOverlay}>
                          <img src={dots} alt="dots"/>
                      </button>
                      <button>
                          <img src={share} alt="share"/>
                      </button>
                  </GalleryButtonWrapper>
              </ThreeWrapper>
              <GalleryModal isOpen={overlay} closeModal={closeOverlay}/>
          </>
    )
}


export default Three