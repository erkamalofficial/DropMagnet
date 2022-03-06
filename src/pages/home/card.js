import { useState, useEffect } from "react"
import styled from "styled-components";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail.js"
import "./card.css"
import UserIcon from "../../assets/add-user-icon.png"
import Avatar from "../../components/elements/Avatar/Avatar.js";
import { getInitials } from "../../utils/index.js";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { useSelector } from "react-redux";

const SwipeCard = styled.div`
  cursor: pointer;
  background-color: #262626;
  border-radius: 8px;
  // box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  background-size: auto 70%;
  background-repeat: no-repeat;
  background-position: center center;
  max-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  will-change: transform;
  height: auto;
  padding: 0 22px;
  @media (max-width: 500px) {
    margin: 0 16px;
  }
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

const Card = (props) => {


  const EC = useSelector(state => state.category.EC)

  const alternate = {}


  const { artist } = props
  const history = useHistory()
  const { currentUser } = useAuth();

  // console.log('cards',props);
  let artistImg = artist && artist.avatar_url !== '' ?  artist.avatar_url : UserIcon

  const openUser = (e) => {
    const user_id = currentUser.uid;
    if (user_id !== props.user_id) {
      history.push(`/profile/${props.user_id}`)
    }
    else {
      history.push(`/profile`)
    }
  }

  const handleImageError = (image, src) => {
    image.onerror = "";
    image.src = src;
    return true;
  }

  return (
    <SwipeCard data-key="card-bdr"
    className="swiper-card"
    >
      <SwipeCardDeviceContainer data-key="card-rel-container">
        <HeaderSection key={1}>
          <Avatar
            userImage={artistImg}
            initial={getInitials(artist.username )}
            view_only small
            userId={props.user_id} />
          {/* <UserAvatar src={artistImg} /> */}
          <div className="card-title">
            {artist.username}
            {/* - {props.id} */}
          </div>
          <div className="empty">......</div>
        </HeaderSection>
        <SwipeImage
          data-key="art"
          key={2}
        // style={{ backgroundImage: `url(${props.media[0].url})` }}
        >
          {props.media[0].type === 'video' ? (
            <video width="100%" height="100%" autoPlay loop playsInline controls={false}>
              <source src={props.media[0].url} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            ) : <img
              style={{borderRadius: '4px'}}
              src={props.media[0].url}
              width='600'
              height='600'
              alt={'CoverImage'}
              onError={(e) => handleImageError(e, props.media[0].url)}
          />
          }
        </SwipeImage>

        <FooterSection key={3}>
          <FooterTitle>{props.title} </FooterTitle>
          <FooterButtons>
            <p2 className="drop-marketplace-title market"></p2>
            <p2 className="drop-category-title type">{props.category.toUpperCase()}</p2>
            <p2 className="drop-price price"><span>Ξ</span>
              {props.price !== '0' && props.price !== undefined ? props.price
                : props.auction_price !== '0' && props.auction_price !== undefined ? props.auction_price
                  : 0}
            </p2>
          </FooterButtons>
        </FooterSection>
      </SwipeCardDeviceContainer>
    </SwipeCard>
  );
};

export default Card;
