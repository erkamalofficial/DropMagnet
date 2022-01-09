import { useState, useEffect, useRef } from "react"
import styled from "styled-components";
import DropDetail from "../../../components/detail_page/DropDetail/DropDetail.js"
import "../card.css"
import UserIcon from "../../../assets/add-user-icon.png"
import Avatar from "../../../components/elements/Avatar/Avatar.js";
import { getInitials } from "../../../utils/index.js";
import video from '../../../assets/sample-mp4-file.mp4';
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
  align-items: center;
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
  p2 {
    height: 24px;
    padding-top: 3px
  }
  .market {
    margin-right: 8px;
  }
  .type {
    margin: 0 8px;
  }
  .price {
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

  const videoRef = useRef(null)

  const cats = props.categories

  return (
    <SwipeCard data-key="card-bdr"
    >
      <SwipeCardDeviceContainer data-key="card-rel-container">
        <HeaderSection key={1}>
          <Avatar userImage={''} initial={getInitials('Admin', '')} view_only small />
          <div className="card-title">
            Admin
          </div>
          <div className="empty">......</div>
        </HeaderSection>
        <VideoHolder className={'video-playback'} ref={videoRef}>

          <video width="100%" height="100%" controls id="#video"
            onClick={(e) => e.preventDefault()}>
            <source src={props.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoHolder>

        <FooterSection key={3}>
          <FooterTitle>{props.heading} </FooterTitle>
          {props.is_categories === 'enable' && (
            <FooterButtons>
              <p2 className="drop-marketplace-title market">{cats[0]}</p2>
              <p2 className="drop-category-title type">{cats[1]}</p2>
              <p2 className="drop-price price"><span>Ξ</span> {cats[2]}</p2>
            </FooterButtons>
          )}
        </FooterSection>
      </SwipeCardDeviceContainer>
    </SwipeCard>
  );
};

export default DummyCard;