import styled from "styled-components";

const UserAvatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  position: absolute;
  left: 36px;
`;
const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 36px;
  .card-title {
    padding-left: 24px;
    font-size: var(--font-size-xl);
  }
  > * {
    font-weight: 700;
    color: var(--grayWhite);
    font-size: 20px;
  }
`;
const FooterSection = styled.div`
  text-align: center;
  margin-bottom: 16px;
  width: 100%;
  padding: 0 36px;
`;
const FooterButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 1rem;
  font-weight: 700;
  line-height: 22px;
  div {
    padding: 0 10px;
    border-radius: 3px;
  }
  .rare {
    background: var(--corePurple);
  }
  .art {
    background: var(--coreBlue);
  }
`;
const FooterTitle = styled.div`
  margin-bottom: 14px;
  font-size: var(--font-size-l);
  font-weight: 700;
  width: 360px;
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
  margin-bottom: 16px;
`;

const Card = ({ title, drop_image, artist_image, drop_id }) => {
  return [
    <HeaderSection key={1}>
      <UserAvatar src={artist_image} />
      <div className="card-title">Crypto Art Man - {drop_id}</div>
    </HeaderSection>,
    <SwipeImage key={2} style={{ backgroundImage: `url(${drop_image})` }} />,
    <FooterSection key={3}>
      <FooterTitle>{title} </FooterTitle>
      <FooterButtons>
        <div className="rare">RARIBLE</div>
        <div className="art">ART</div>
      </FooterButtons>
    </FooterSection>,
  ];
};

export default Card;
