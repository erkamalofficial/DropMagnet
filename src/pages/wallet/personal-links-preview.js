import styled from "styled-components";
import { Link } from "react-router-dom";

const PLSectionThree = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-bottom: 1rem;
  }
  @media (max-width: 340px) {
    > * {
      margin-bottom: 0.5rem;
    }
  }
`;
const PLSectionThreeTitle = styled.div`
  line-height: 28px;
  font-weight: 700;
  color: var(--grey300);
  font-size: var(--font-size-l);
  @media (max-width: 340px) {
    font-size: var(--font-size-s);
  }
`;
const PLSectionUserinput = styled.input`
  font-weight: normal;
  border: 1px solid var(--purple500);
  color: var(--grey250);
  font-size: var(--font-size-m);
  @media (max-width: 340px) {
    font-size: var(--font-size-s);
  }
  border-radius: 5px;
  width: 398px;
  @media (max-width: 600px) {
    width: 90%;
  }
  line-height: 48px;
  text-align: center;
`;
const PLSectionEmojiLine = styled.div`
  font-weight: 700;
  color: var(--grey250);
  font-size: var(--font-size-s);
  @media (max-width: 340px) {
    font-size: var(--font-size-xs);
  }
`;
const PLSectionBtn = styled.div`
  button {
    line-height: 40px;
    background-color: var(--darkBlue);
    color: var(--grey300);
    border: 1px solid var(--purple500);
    border-radius: 5px;
    font-size: var(--font-size-xs);
    @media (max-width: 340px) {
      font-size: var(--font-size-xxs);
    }
    font-weight: 700;
    padding: 0 14px;
    margin-right: 16px;
    cursor: pointer;
  }
`;
const GalleryNameTitle = styled.span`
  font-family: var(--font-bdcols);
  font-size: 22px;
  @media (max-width: 340px) {
    font-size: var(--font-size-m);
  }
  font-weight: normal;
`;
const PersonalLinksPreview = ({ handleGalleryName }) => {
  return (
    <PLSectionThree>
      <PLSectionThreeTitle>
        <span>Reserve your </span>
        <GalleryNameTitle> Gallery Name</GalleryNameTitle>
      </PLSectionThreeTitle>
      <PLSectionUserinput
        placeholder="Enter your brand or name here"
        onChange={(e) => handleGalleryName(e.target.value)}
      />
      <PLSectionEmojiLine>Emoji's are allowed! ❤️</PLSectionEmojiLine>
      <PLSectionBtn>
        <Link to="/login">
          <button>Sign In</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </PLSectionBtn>
    </PLSectionThree>
  );
};

export default PersonalLinksPreview;
