import { useState, useEffect, useRef } from "react"
import styled from "styled-components";
import DropDetail from "../../../components/detail_page/DropDetail/DropDetail.js"
import "../card.css"
import UserIcon from "../../../asstes/add-user-icon.png"
import Avatar from "../../../components/elements/Avatar/Avatar.js";
import { getInitials } from "../../../utils/index.js";
import video from '../../../asstes/sample-mp4-file.mp4';
import VideoPlayer from '../../../components/VideoPlayer';

const SwipeCard = styled.div`
  cursor: pointer;
  background-color: #262626;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  background-size: auto 70%;
  background-repeat: no-repeat;
  background-position: center center;
  max-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  will-change: transform;
  height: auto;
  padding: 0 14px;
`;
const SwipeCardDeviceContainer = styled.div`
  position: var(--card-device-container-pos);
  
  /* width: 100%; */
`;
const UserAvatar = styled.img`
  height: var(--art-avatar-size);
  width: var(--art-avatar-size);
  border-radius: 15px;
  margin-left: var(--art-avatar-left-margin);
`;
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  position: var(--card-elem-pos);
  width: 100%;
  .empty {
    opacity: 0;
  }
  margin: var(--card-header-section-margin);
  .card-title {
    font-size: var(--font-size-xl);
    @media (max-width: 340px) {
      background: #a98d8d61;
      backdrop-filter: blur(10px);
      padding: 5px 8px;
      border-radius: 5px;
    }
  }
  > * {
    font-weight: 700;
    color: var(--grayWhite);
    font-size: 20px;
  }
`;
const FooterSection = styled.div`
  position: var(--card-elem-pos);
  bottom: 0;
  background: var(--card-transparent-bg);
  text-align: center;
  margin-bottom: var(--card-title-section-margin);
  width: 100%;
`;
const FooterButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: var(--card-title-section-text-margin);
  div {
    padding: 0 10px;
    border-radius: 3px;
    font-size: 14px
  }
  .rare {
    background: var(--corePurple);
    margin-right: 8px;
  }
  .art {
    background: var(--coreBlue);
    margin: 0 8px;
  }
  .price {
    height: 24px;
    border-radius: 3px;
    background-color: #6a8ad5;
    display: flex;
    align-items: center;
    column-gap: 4px;
    margin-left: 8px;
  }
`;
const FooterTitle = styled.div`
  margin: var(--card-title-text-margin);
  font-size: var(--font-size-l);
  width: auto;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SwipeImage = styled.div`
  /* background-position: 50.4587% 0%; */
  /* background-size: 120.527%; */
  width: var(--swipe-card-art-width);
  /* background-clip: border-box;
  background-size: cover; */
  height: var(--swipe-card-art-width);
  background-repeat: no-repeat;
  margin: var(--swipe-card-art-margin);
  > img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const VideoHolder = styled.div`
height: var(--swipe-card-art-width);
width: var(--swipe-card-art-width);;
cursor: pointer;
border-radius: 3px;
position: relative;
align-self: center;
background-color: #000;
margin: var(--swipe-card-art-margin);
border-radius: 6px;
overflow: hidden
`

const HeaderBarMenuIcon = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 19px;
  cursor: pointer;
  background: linear-gradient(#2e2e2e, #1e1e1e);
  box-shadow: inset 0 -1px 0px rgba(40, 0, 65, 1), 0 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-self: center;
`;

const DummyCard = (props) => {

  const { artist_image, artist } = props

  const videoRef = useRef(null)

  let artistImg = artist.avatar_url !== '' ? artist.avatar_url : UserIcon
  

  // useEffect(() => {
  //   if (videoEl && true) {
  //     videoEl.pause()
  //   }

  // }, [videoEl])

  return (
    <SwipeCard data-key="card-bdr"
    >
      <SwipeCardDeviceContainer data-key="card-rel-container">
        <HeaderSection key={1}>
          <Avatar userImage={artist_image} initial={getInitials(artist.username, '')} view_only small />
          {/* <UserAvatar src={artistImg} /> */}
          <div className="card-title">
            {artist.username}
            {/* - {props.id} */}
          </div>
          <div className="empty">......</div>
        </HeaderSection>
        <VideoHolder className={'video-playback'} ref={videoRef}>

          <video width="100%" height="100%" controls id="#video"
          onClick={(e) => e.preventDefault()}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoHolder>

        <FooterSection key={3}>
          <FooterTitle>{props.title} </FooterTitle>
          <FooterButtons>
            <div className="rare">{props.marketplace.toUpperCase()}</div>
            <div className="art">{props.category.toUpperCase()}</div>
            <div className="price"><span>Ξ</span>
              {props.price !== '0' && props.price !== undefined ? props.price
                : props.auction_price !== '0' && props.auction_price !== undefined ? props.auction_price
                  : 0}
            </div>
          </FooterButtons>
        </FooterSection>
      </SwipeCardDeviceContainer>
    </SwipeCard>
  );
};

export default DummyCard;