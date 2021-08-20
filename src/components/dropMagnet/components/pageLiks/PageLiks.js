import React, {useState} from "react";
// import userLogo from "../../assets/profile.svg";
import whiteUserLogo from "../../assets/profileWhiteSvg.svg";
import userLogo from "../../assets/account (1).svg";
import styled from "styled-components";

const PageLiks = styled.div`
  max-width: 122px;
  height: 36px;
  border-radius: 54.5px;
  display: flex:
  text-align: center;
  background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
  border: 0.75px solid #000000;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 13px 5px 16px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 32px;
  z-index: 100!important;
  margin: 0 auto;
  -webkit-transform: translateZ(10px)!important;
  
  &.light {
    background-image: linear-gradient(rgb(247, 247, 247), rgb(247, 247, 247));
    border: 1px solid #D6D6D6;
    box-shadow: 0 2px 4px #C3C3C3;
  }
  
  img {
    position: relative;
    bottom: 1px;
  }
  
  &.user-component-styles {
     // position: fixed;
     // bottom: 10px;
  }
  
  &.modal-page-styles {
    margin-top: 20px;
    color: linear-gradient(to right, #d600ff 0%, #6600ff 100%);
  }
  
  @media screen and (max-height: 666px) {
    bottom: 20px;
  }
  
  @media screen and (max-height: 633px) {
    bottom: 15px;
  }
  
`;

const Tab = styled.p`
    font-size: 21px;
    font-weight: 900;
    font-style: italic;
    color: #ffffff;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    margin: 0;
    cursor: pointer;
    
    &.nft {
      font-style: italic;
      padding-top: 2px;
    }
    
    &.light {
      color: #5F5F5F;
    }
    
    .bg-gradient {
      background-image: linear-gradient(270deg, #9B00FF 0%, #6600FF 100%);
      -webkit-background-clip: text;
      color: transparent;
    } 
    
    &.active{
        background: linear-gradient(to right, #d600ff 0%, #6600ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    &.modal-page-styles { 
      background: -webkit-linear-gradient(45deg, #d600ff, #6600ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
`;

const PageLiksComponent = ({darkTheme, galleryRef, coverPageRef, modalPageStyles, userComponentStyles}) => {

    const [isNFTActive, setIsNFTActive] = useState(false);

    const scrollToCover = () => {
        coverPageRef.current.scrollIntoView();
        setIsNFTActive(false)
        // setActiveTab(1)
    };
    const scrollToGallery = () => {
        galleryRef.current.scrollIntoView();
        setIsNFTActive(true)
        // setActiveTab(2)
    };

    return (
        <PageLiks className={`${darkTheme ? 'light' : '' } ${modalPageStyles} ${userComponentStyles}`}>
            <Tab className={"active"} onClick={scrollToCover}>
                <img src={isNFTActive ? whiteUserLogo : userLogo} alt="user logo"/>
            </Tab>
            <Tab className={`${darkTheme ? 'light nft' : 'nft'} ${modalPageStyles}`} onClick={scrollToGallery}>
                <span className={isNFTActive && 'bg-gradient'}>NFTs</span>
            </Tab>
        </PageLiks>
    );
}

export default PageLiksComponent;