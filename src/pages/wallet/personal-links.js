import styled from "styled-components";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
import { useState } from "react";
import CardSectionDesktop from "./card-section-desktop";
import CardSectionMobile from "./card-section-mobile";
import useViewport from "./useViewport";
import { Link } from "react-router-dom";

const PersonalLinksWrapper = styled.div`
  // max-width: 600px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const PLSectionOne = styled.div`
  margin-top: 72px;
  margin-bottom: 40px;
  @media (max-width: 600px) {
    margin-bottom: unset;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PLSectionOneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  text-align: center;
`;
const HeaderTitle = styled.div`
  font-size: var(--font-size-xxl);
  @media (max-width: 340px) {
    font-size: var(--font-size-m);
  }
  margin-bottom: 16px;
`;
const HeaderTitleTag = styled.div`
  font-size: var(--font-size-xl);
  @media (max-width: 340px) {
    font-size: var(--font-size-s);
  }
  letter-spacing: 8px;
  margin-bottom: 16px;
  color: var(--grey400);
`;
const HeaderSubtitle = styled.div`
  font-size: var(--font-size-xl);
  @media (max-width: 340px) {
    font-size: var(--font-size-s);
  }
  margin-bottom: 16px;
  font-weight: 700;
`;

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
const PersonalLinks = (props) => {
  const [galleryName, setGalleryName] = useState("");
  const displayName = galleryName === "" ? "You" : galleryName;
  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;

  const handleGalleryName = (val) => {
    const galleryNameLimit = isMobile ? 16 : 22;
    const checkAndLimitGalleryName =
      val.length > galleryNameLimit
        ? `${val.substring(0, galleryNameLimit)}...`
        : val;
    setGalleryName(checkAndLimitGalleryName.replace(/\s/g, ""));
  };
  return (
    <PersonalLinksWrapper>
      <FixedHeader {...props} />

      <PLSectionOne>
        <PLSectionOneContent>
          <HeaderTitle> Display Your NFTs </HeaderTitle>
          <HeaderTitleTag> BEAUTIFULLY </HeaderTitleTag>
          <HeaderSubtitle>
            {" "}
            Promote your art with unique personal links{" "}
          </HeaderSubtitle>
        </PLSectionOneContent>
      </PLSectionOne>

      {isMobile ? (
        <CardSectionMobile displayName={displayName} />
      ) : (
        <CardSectionDesktop displayName={displayName} />
      )}
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
          <button>Learn More</button>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </PLSectionBtn>
      </PLSectionThree>
    </PersonalLinksWrapper>
  );
};

export default PersonalLinks;
