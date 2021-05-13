import styled from "styled-components";

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
`;
const SwipeCardDeviceContainer = styled.div`
  position: var(--card-device-container-pos);
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
  // text-align: center;
  width: 100%;
  // padding: 0 var(--art-card-space);
  .empty {
    opacity: 0;
  }
  margin: var(--card-header-section-margin);
  .card-title {
    font-size: var(--font-size-xl);
    @media (max-width: 320px) {
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
  padding: 0 var(--art-card-space);
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
  }
  .rare {
    background: var(--corePurple);
    margin-right: 16px;
  }
  .art {
    background: var(--coreBlue);
  }
`;
const FooterTitle = styled.div`
  margin: var(--card-title-text-margin);
  font-size: var(--font-size-l);
  width: var(--card-title-text-width);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SwipeImage = styled.div`
  background-position: 50.4587% 0%;
  background-size: 120.527%;
  width: var(--swipe-card-art-width);
  height: var(--swipe-card-art-width);
  background-repeat: no-repeat;
  margin: var(--swipe-card-art-margin);
`;

const Card = ({ title, drop_image, artist_image, drop_id }) => {
  return (
    <SwipeCard data-key="card-bdr">
      <SwipeCardDeviceContainer data-key="card-rel-container">
        <HeaderSection key={1}>
          <UserAvatar src={artist_image} />
          <div className="card-title">Crypto Art Man - {drop_id}</div>
          <div className="empty">......</div>
        </HeaderSection>
        <SwipeImage
          data-key="art"
          key={2}
          style={{ backgroundImage: `url(${drop_image})` }}
        />
        <FooterSection key={3}>
          <FooterTitle>{title} </FooterTitle>
          <FooterButtons>
            <div className="rare">RARIBLE</div>
            <div className="art">ART</div>
          </FooterButtons>
        </FooterSection>
      </SwipeCardDeviceContainer>
    </SwipeCard>
  );
};

export default Card;
