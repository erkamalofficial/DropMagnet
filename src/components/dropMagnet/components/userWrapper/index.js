import React from "react";
import ProfilePic from "../../assets/profile_pic.png";
import CircleIcon from "../newUserContent/styled-components/icon-wrapper";
import blackLink from "../../assets/blackLink.svg";
import link from "../../assets/link.svg";
import blackMessage from "../../assets/blackMessage.svg";
import message from "../../assets/message.svg";
import LikeButton from "../newUserContent/styled-components/likeButton";
import blackBitcoin from "../../assets/blackBitcoin.svg";
import bitcoin from "../../assets/bitcoin.svg";
import styled from "styled-components";

const UserWrapper = styled.div`
    background-color: #1A1A1A;
    padding: 91px 10px 16px;
    position:relative;
    box-shadow: 0 -7px 10px rgba(28,28,28, .33);
    
    &.light {
      background-color: #FCFCFC;
      box-shadow: 0 -10px 10px rgba(0 0 0 / 16%);
    }
    
    .content-wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      margin-top: 60px;
      
      .wrapper-icon{
        margin: 0 16px;
       
            position: absolute;
            &.link {
                left: calc(50% - 181px);
                margin: 0;
            }
            &.bitcoin {
                right: calc(50% - 181px);
                margin: 0;
            }
            &.heart {
                right: calc(50% - 152px);
                top: -62px;
                margin: 0;
            }
            &.message {
                left: calc(50% - 152px);
                top: -62px;
                margin: 0;
             }
           
               
      }
    }
    
    @media (max-width: 375px) and (max-height: 700px) {
     display: none;
    }
    
    @media (min-width: 320px) {
      padding: 32px 0 22px;
    }
    
    @media (min-width: 810px) {
      padding: 34px 0 32px;
    }
    
    
`;

const Description = styled.div`
  max-width: 470px;
  color: #eaeaea;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: 20px;
  text-align: center;
  margin: 0 auto;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  .hide-text{ 
    //white-space: nowrap;     
  }    
  &.light {
   font-weight: 400;
   color: #000000;  
  }
  @media (max-width: 720px) {
    max-width: 332px;
  }
`;

const UserName = styled.p`
  width: 236px;
  // height: 46px;
  line-height: 24px;
  padding: 12px 0 8px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
  border: 0.75px solid #000000;
  border-radius: 26px;
  color: #EAEAEA;
  text-align: center;
  margin: 0 16px;
  cursor: pointer;
  margin-bottom: 16px;
  
  &.light {
    background-image: linear-gradient(rgb(247, 247, 247), rgb(247, 247, 247));
    border: 1px solid #DFDFDF;
    color: #000000;
    font-weight: 500;  
  }
  
  @media (max-width: 375px) and (max-height: 700px) {
        margin: 0 0 12px 0;
    }
    @media (max-width: 350px) and (max-height: 650px) {
        width: 158px;
        height: 36px;
        font-size: 16px;
    }
    
    
    @media (min-width: 320px) and (max-width: 720px) {
      margin-bottom: 16px;
    }
    
    @media (min-width: 720px) {
      margin-bottom: 32px;
    }
`;

const UserImage = styled.div`
  width: 164px;
  height: 164px;
  margin: 3px 14px 4px;
  background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
  border-radius: 1000px;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 375px) and (max-height: 700px) {
        width: 155px;
        height: 155px;
        margin: 12px 22px 4px;
    }
    // @media (max-width: 350px) and (max-height: 650px) {
    //     width: 36px;
    //     height: 36px;
    //     margin: 0 19px 0 0;
    // }
`;

const LikeAndCommentWrapper = styled.div`
    position: absolute;
    // left: 19px;
    // margin: 0 auto;
    // top: -219px;
    z-index: 10;
    // @media (max-width: 1140px) {
        left: calc(50% - 96px);
        top: -90px;
    // }
`;

const UserWrapperComponent = ({darkTheme, handleOpenModal,openShareModal, setPayModalComponentToggle, setEditUserDescription, editUserDescription, userDescription, name  }) => {
    return(
        <UserWrapper className={darkTheme ? 'light' : ''}>
            <LikeAndCommentWrapper>
                <UserImage>
                    <img src={ProfilePic} alt="profile-pic"/>
                </UserImage>
            </LikeAndCommentWrapper>
            <div className='content-wrapper'>
                <UserName onClick={handleOpenModal} className={darkTheme ? 'light' : ''}>{name}</UserName>
                <div onClick={openShareModal} className='wrapper-icon link'>
                    <CircleIcon imgUrl={darkTheme ? blackLink : link} alt={"icon"} className={darkTheme ? 'light' : ''} />
                </div>
                <div className='wrapper-icon message'>
                    <CircleIcon imgUrl={darkTheme ? blackMessage : message} alt={"icon"} className={darkTheme ? 'light' : ''} />
                </div>
                <div className='wrapper-icon heart'>
                    <LikeButton lightTheme={darkTheme ? 'light black' : ''}/>
                </div>
                <div className='wrapper-icon bitcoin' onClick={() => setPayModalComponentToggle(true)}>
                    <CircleIcon imgUrl={darkTheme ? blackBitcoin : bitcoin} alt={"icon"} className={darkTheme ? 'light bitcoin' : 'bitcoin'} />
                </div>
            </div>
            <Description className={darkTheme ? 'light' : ''} onClick={() => setEditUserDescription(!editUserDescription)}>
                <div>
                    {userDescription}
                </div>
            </Description>
        </UserWrapper>
    )
}

export default UserWrapperComponent;