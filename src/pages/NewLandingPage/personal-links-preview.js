import styled from "styled-components";
import { Link } from "react-router-dom";

const PLSectionThree = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 412px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 14px 24px;
  background-color: #2c2c2c;
  @media(max-width:576px){
    padding: 16px 32px;
    padding-bottom: 28px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const PLSectionUserinput = styled.input`
  font-weight: normal;
  border: 1px solid var(--purple500);
  color: #ffffff;
  font-family: "Quicksand";
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  @media (max-width: 340px) {
    font-size: var(--font-size-s);
  }
  border-radius: 5px;
  width: 350px;
  @media (max-width: 600px) {
    width: 320px;
  }
  line-height: 48px;
  text-align: center;
  ::placeholder{
    color: #ffff;
  }
`;
const PLSectionEmojiLine = styled.div`
  font-weight: 700;
  color: var(--grey250);
  margin-top: 12px;
  font-size: var(--font-size-s);
  @media (max-width: 340px) {
    font-size: var(--font-size-xs);
  }
`;

const Button = styled.button`

`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  padding: 10px;
  @media (max-width:576px){
    transform: translate(-10px,-40px);

  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;





const PersonalLinksPreview = ({ handleGalleryName,galleryName, isLoggedIn }) => {
  return (
    <MainContainer>
      <PLSectionThree>
      <PLSectionUserinput
        value={galleryName}
        placeholder="Enter your brand or name here"
        onChange={(e) => handleGalleryName(e.target.value)}
      />
      <PLSectionEmojiLine>Emoji’s & specials are allowed! 💜</PLSectionEmojiLine>
    </PLSectionThree>
    <ButtonContainer>
      <Button className={'blank-gradient-button'} style={{padding: "12px 45px"}}>
        <span className={'blank-gradient-text'}>Register MetaURL</span>
      </Button>
    </ButtonContainer>
    </MainContainer>
    
  );
};

export default PersonalLinksPreview;
