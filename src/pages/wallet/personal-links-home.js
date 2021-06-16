import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styled from "styled-components";
import LinksWrapper from "../../components/wrappers/LinksPageWrapper";

import { fetchLinks } from "./actions";
import PersonalLinksPreview from "./personal-links-preview";
import LinksCard from "./links-card";
import useViewport from "./useViewport";
import { useAuth } from "../../contexts/FirebaseAuthContext";

const PersonalLinksWrapper = styled.div`
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

const LinksHome = (props) => {
  const dispatch = useDispatch();

  const [galleryName, setGalleryName] = useState("");

  const displayName = galleryName === "" ? "You" : galleryName;
  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;
  const [pageNos, setPageNos] = useState([0, 1]);

  const getPageDetails = (pageNos) => {
    setPageNos(pageNos);
  };

  useEffect(() => {
    dispatch(fetchLinks());
  }, []);
  const {currentUser} = useAuth();
  console.log(currentUser);
  const handleGalleryName = (val) => {
    const galleryNameLimit = isMobile ? 16 : 22;
    const checkAndLimitGalleryName =
      val.length > galleryNameLimit
        ? `${val.substring(0, galleryNameLimit)}...`
        : val;
    setGalleryName(checkAndLimitGalleryName.replace(/\s/g, ""));
  };
  return (
    <LinksWrapper>
      <PersonalLinksWrapper>
        <PLSectionOne>
          <PLSectionOneContent>
            <HeaderTitle> Display Your NFTs </HeaderTitle>
            <HeaderTitleTag> BEAUTIFULLY </HeaderTitleTag>
            <HeaderSubtitle>
              Promote your art with unique personal links
            </HeaderSubtitle>
          </PLSectionOneContent>
        </PLSectionOne>
        <LinksCard
          handleLinkSelection={() => {}}
          selectedLinks={[]}
          displayName={displayName}
          handleGalleryName={handleGalleryName}
          getPageDetails={getPageDetails}
        />
        <PersonalLinksPreview handleGalleryName={handleGalleryName} isLoggedIn={Boolean(currentUser)} />
      </PersonalLinksWrapper>
    </LinksWrapper>
  );
};

export default LinksHome;
