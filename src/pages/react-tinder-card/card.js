import styled from "styled-components";

const UserAvatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;
const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  line-height: 48px;
  > * {
    margin: 0 10px;
    font-weight: 700;
    color: var(--grayWhite);
    font-size: 20px;
  }
`;
const FooterSection = styled.div`
  padding: 10px;
  text-align: center;
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
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
`;

const SwipeImage = styled.div`
  background-position: 50.4587% 0%;
  background-size: 120.527%;
  width: calc(100% - 40px);
  height: 100%;
  background-repeat: no-repeat;
`;

const Card = ({ title, drop_image, artist_image, drop_id }) => {
  return [
    <HeaderSection key={1}>
      <UserAvatar src={artist_image} />
      <div>Crypto Art Man - {drop_id}</div>
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
