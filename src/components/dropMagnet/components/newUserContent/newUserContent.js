import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import background from "../../assets/cat-background.png";
import CircleIcon from "./styled-components/icon-wrapper";
import chat from "../../assets/chat.svg";
// import setting from "../../assets/settings-2.svg";
// import blackSetting from "../../assets/settings-black.svg";
// import edit from "../../assets/edit.svg";
// import blackEdit from "../../assets/blackEdit.svg";
import link from "../../assets/link.svg";
import bitcoin from "../../assets/bitcoin.svg";
import message from "../../assets/message.svg";
import blackLink from "../../assets/blackLink.svg";
import blackBitcoin from "../../assets/blackBitcoin.svg";
import blackMessage from "../../assets/blackMessage.svg";
// import userLogo from "../../assets/profile.svg";
import ProfilePic from "../../assets/profile_pic.png";
import LikeButton from "./styled-components/likeButton";
import {Row} from "../../styled-component/row";
import ShareIcon from "../../assets/share-icon.svg";
// import UserSlider from "../newUserSlider/newUserSlider";
import BlurModal from "../editNameModal/editNameModal";
import PortaledComponent from "../portaledComponent";
import FileMenu from "../../../myGallery/fileMenu/fileMenu";
// import PageLiksComponent from "../pageLiks/PageLiks";
import ShareModal from "../sharingIconsModal";
import EditUserDescription from "../editUserDescriptionModal";
import FeaturedContent from "../FeaturedContentModal/index";
import ImageUpdateModal from "../ImageUpdateModal";
import blackSetting from "../../assets/settings-black.svg";
import setting from "../../assets/settings-2.svg";
// import InfinitiveSlider from "../newUserSlider/infinitiveSlider";
import UserSlider from "../newUserSlider/newUserSlider";
import MobileSlider from "../newUserSlider/mobileSlider";
import PayModalComponent from "../payModalComponent";
// import ScrollSnapPage from "../../pages/scrollSnapPage/ScrollSnapPage";

const UserHeader = styled.div`
    position: relative;
    width: 100%;
    max-height: 210px;
    height: 100%;
    min-height: 96px;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 500px){
    height: 356px;
    }
    @media (max-width: 391px){
    height: 137px;
    }
    @media (max-width: 376px){
    height: 116px;
    }
    @media (max-height: 870px) and (min-width: 1024px){
        height:183px;
    }
    @media (max-height: 770px) and (min-width: 1024px){
        height: 137px;
    }
    @media (max-height: 720px) and (min-width: 1024px){
        height: 116px;
    }
    @media (max-height: 700px) and (min-width: 1024px){
        height: 96px;
    }
    @media (max-width: 414px) and (max-height: 723px){
        height: 183px !important;
    }
    @media (max-width: 390px) and (max-height: 666px){
        height: 151px !important;
    }
    @media (max-width: 375px) and (max-height: 638px){
        height: 122px !important;
    }
    @media (max-width: 375px) and (max-height: 633px){
        height: 155px !important;
    // }
    // @media (max-width: 375px) and (max-height: 620px) {
    //     display:none !important;
    // }
   
`;
const UserWrapper = styled.div`
    background-color: #1A1A1A;
    padding: 36px 10px 16px;
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
                @media (max-width: 375px) {
                    left: calc(50% - 175px);
                }
            }
            &.bitcoin {
                right: calc(50% - 181px);
                margin: 0;
                @media (max-width: 375px) {
                    right: calc(50% - 175px);
                }
            }
            &.heart {
                right: calc(50% - 152px);
                top: -62px;
                margin: 0;
                @media (max-width: 375px) {
                    right: calc(50% - 151px);
                    top: -60px
                }
            }
            &.message {
                left: calc(50% - 152px);
                top: -62px;
                margin: 0;
                @media (max-width: 375px) {
                    left: calc(50% - 151px);
                    top: -60px
                }
             }
           
               
      }
    }
    
    // @media (max-width: 375px) and (max-height: 700px) {
    //  display: none;
    // }
    //
    // @media (min-width: 320px) and (max-width: 720px){
    //   padding: 32px 0 16px;
    // }
    
    @media (min-width: 720px) {
      padding-bottom: 32px;
    }
    
    @media (min-width: 720px) and (max-width: 1024px) {
      padding-top: 30px;
    }
    
    @media (max-width: 390px) and (max-height: 666px){
       padding-top: 41px;
    }
    
    @media (max-width: 375px) and (max-height: 633px){
       padding-top: 24px;
    }        
    
`;
// const MobileUserWrapper = styled.div`
//     display: none;
//     background-color: #1a1a1a;
//     padding-bottom: 12px;
//
//     &.light {
//       background-color: #FCFCFC;
//       box-shadow: 0 -10px 10px rgba(0 0 0 / 16%);
//     }
//
//     @media (max-width: 375px) and (max-height: 700px) {
//         display: block;
//     }
//     // @media (max-width: 350px) and (max-height: 650px) {
//     //     display: none;
//     // }
// `;
// const MobileUserContent = styled.div`
//     display: flex;
//     position: relative;
//     padding-top: 64px;
// `;
const SmallDevice = styled.div`
    display: none;
    position: relative;
    padding-top: 62px;
    padding-bottom: 12px;
    background-color:#1a1a1a;
    @media (max-width: 350px) and (max-height: 650px) {
        display: block;
    }
    .icons{
        margin-top: 12px;
        display:flex;
        align-items: center;
        justify-content: center;
        &>div{
            margin: 0 6px;
        }
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
const PayWrapper = styled.div`
  width: 46px;
  height: 46px;
  background-color: #101010;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #eaeaea;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  @media (max-width: 350px) and (max-height: 650px) {
        width: 36px;
        height: 36px;
        font-size: 14px;
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
const GreyBack = styled.div`

`;
const UserContentWrapper = styled.div`
    width: 100%;
    height:100%;
    // overflow: hidden;
    background-color: #292929;
    
    &.light {
      background-color: #EEEEEE;
    }
`;

const HeaderEditText = styled.span`
    color: #EAEAEA;
    font-size: 16px; 
    font-weight: 400;
    position: absolute;
    right: 31px;
    top: 25px;
    
    @media screen and (max-width: 390px) {
      right: 21px;
    }
    
    @media screen and (max-width: 390px) {
      right: 4px;
    }
`;

const Separator = styled.div`
    height: 9px;
    background: RGB(20, 20, 20);
    box-shadow: inset 1px 3px 0 rgb(0 0 0 / 50%);
    
    &.light {
     background: #D3D3D3;
     box-shadow: inset 0px 3px 4px rgb(0 0 0 / 50%);
    }
`;

const HeaderIcon = styled.div`
    position: fixed;
    z-index: 0;
    left: 16px;
    top: 68px;
`;



const NewUserContent = (props) => {
    const { darkTheme, changeSlide } = props;
    const [editedActive, setEditedActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("Alexander Newton");
    // const [activeTab, setActiveTab] = useState(1);
    const [shareIsOpen, setShareIsOpen] = useState(false);

    const [userDescription, setUserDescription] = useState("I'm a crypto artist. I've been collecting NFTs since 2017, and I also created Drop Magnet and on a tablet there is more room  of the decription so a user can add more lines in like this to decribe themselves and it should reduce in size depending on\n the screen and based on the rule that the NFT button at the botton should always have 32 px padding");
    const [editUserDescription, setEditUserDescription] = useState(false);

    const [featuredContentModal, setFeaturedContentModal] = useState(false);

    const [imageUpdateModalToggle, setImageUpdateModalToggle] = useState(false);
    const [payModalComponentToggle, setPayModalComponentToggle] = useState(false);
    const [currentScreenWidth, setCurrentScreenWidth] = useState(0);

    useEffect(() => {
       setCurrentScreenWidth(document.body.clientWidth)
    },[])

    const closeModal = () => {
        setShareIsOpen(false);
        setEditUserDescription(false);
        setFeaturedContentModal(false);
        setImageUpdateModalToggle(false);
        setPayModalComponentToggle(false);
    }
    const openShareModal = () => {
        setShareIsOpen(true)
    }

    const handleOpenModal = () => {
        document.querySelector("body").style.overflow = "hidden";
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        document.querySelector("body").style.overflow = "auto";
        setIsOpen(false);
    };

    useEffect(() => {
        const screenWidth = () => setCurrentScreenWidth(document.body.clientWidth);

        window.addEventListener("resize", screenWidth);
        return () => {
            window.removeEventListener('resize',screenWidth);
        }
    },[currentScreenWidth])

    return (
        <UserContentWrapper className={darkTheme ? 'light' : ''}>
            <UserHeader>
                <HeaderIcon onClick={(e) => {
                    setEditedActive(!editedActive);

                        e.view.document.querySelector('.scroller').style.overflowY = !editedActive ? 'hidden' : 'scroll';
                        e.view.document.querySelector('.scroller').style.position = !editedActive ? 'fixed' : 'unset';

                }}>
                    <CircleIcon imgUrl={darkTheme ? blackSetting : setting} alt={"icon"}
                                className={darkTheme ? 'header-edit' : 'header-edit-black'}/>
                </HeaderIcon>

                {
                    editedActive
                        ? <div onClick={() => setImageUpdateModalToggle(true)}>
                            <HeaderEditText>Edit Header & BGs</HeaderEditText>
                        </div>
                        : null
                }
            </UserHeader>
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
            {/*<MobileUserWrapper>*/}
            {/*    <MobileUserContent>*/}
            {/*        <UserImage>*/}
            {/*            <img src={ProfilePic} alt="profile-pic"/>*/}
            {/*        </UserImage>*/}
            {/*        <div>*/}
            {/*            <UserName onClick={handleOpenModal}>{name}</UserName>*/}
            {/*            <Row className="items-center justify-between">*/}
            {/*                <CircleIcon imgUrl={ShareIcon} alt={"icon"}/>*/}
            {/*                <CircleIcon imgUrl={chat} alt={"icon"}/>*/}
            {/*                <LikeButton/>*/}
            {/*                <PayWrapper>pay</PayWrapper>*/}
            {/*            </Row>*/}
            {/*        </div>*/}
            {/*    </MobileUserContent>*/}
            {/*    <div>*/}
            {/*        <Description>*/}
            {/*            I’m a crypto artist. I’ve been collecting NFTs*/}
            {/*            since 2017, and I also created Drop Magnet.*/}
            {/*        </Description>*/}
            {/*    </div>*/}
            {/*</MobileUserWrapper>*/}

            <SmallDevice>
                <FileMenu darkTheme={darkTheme} changeSlide={changeSlide}/>
                <div>
                    <Row className="items-center justify-center">
                        <UserImage>
                            <img src={ProfilePic} alt="profile-pic"/>
                        </UserImage>
                        <UserName onClick={handleOpenModal}>{name}</UserName>
                    </Row>
                </div>
                <div className="icons">
                    <CircleIcon imgUrl={ShareIcon} alt={"icon"}/>
                    <CircleIcon imgUrl={chat} alt={"icon"}/>
                    <LikeButton/>
                    <PayWrapper>pay</PayWrapper>
                    <PayWrapper>bio</PayWrapper>
                </div>
            </SmallDevice>
            <div className={darkTheme ? 'cover-z cover-z__light' : 'cover-z'}>
                <Separator className={darkTheme ? 'light' : ''}> </Separator>
                <GreyBack>
                    {
                        currentScreenWidth > 720
                            ?
                            <UserSlider
                                darkTheme={darkTheme}
                                featuredContentModal={featuredContentModal}
                                editedActive={`${ editedActive ? 'edited-text edited-text-active' : ''}`}
                                setEditedActive={setEditedActive}
                                setFeaturedContentModal={setFeaturedContentModal}
                              />
                            : <MobileSlider
                                darkTheme={darkTheme}
                                featuredContentModal={featuredContentModal}
                                editedActive={`${ editedActive ? 'edited-text edited-text-active' : ''}`}
                                setFeaturedContentModal={setFeaturedContentModal}
                                userDescription={userDescription}
                                imageUpdateModalToggle={imageUpdateModalToggle}
                              />
                    }

                </GreyBack>
            </div>
            <PortaledComponent
                modal={
                    <BlurModal
                        close={handleCloseModal}
                        open={isOpen}
                        className={isOpen ? 'active' : ""}
                        name={name}
                        setName={setName}/>
                }/>
            <EditUserDescription
                isOpen={editUserDescription}
                closeModal={closeModal}
                userDescription={userDescription}
                setUserDescription={setUserDescription}
            />
            <FeaturedContent isOpen={featuredContentModal} closeModal={closeModal}/>
            <ShareModal isOpen={shareIsOpen} closeModal={closeModal}/>
            <ImageUpdateModal isOpen={imageUpdateModalToggle} closeModal={closeModal}/>
            <PayModalComponent isOpen={payModalComponentToggle} closeModal={closeModal}/>
        </UserContentWrapper>
    )
}

export default NewUserContent;