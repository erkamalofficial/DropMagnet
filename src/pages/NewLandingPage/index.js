import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styled from "styled-components";

import { fetchLinks } from "./actions";
import PersonalLinksPreview from "./personal-links-preview";
import LinksCard from "./links-card";
import useViewport from "./useViewport";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import LandingPageWrapper from "../../components/wrappers/LandingPageWrapper";

const PersonalLinksWrapper = styled.div`
  width: calc(100% - 32px);
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 16px;
  margin-top: 8px;
`;

const PLSectionOne = styled.div`
  /* margin-top: 72px; */
  margin-bottom: 32px;
  @media (max-width: 600px) {
    margin-bottom: 17px;
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


const HeaderSubtitle = styled.div`
  max-width: 550px;
  font-size: 24px;
  margin-left: 30px;
  @media (max-width: 576px) {
    margin-left: 0px;
    font-size: 15px;
  }
  margin-bottom: 16px;
  font-weight: 700;
`;

const LinksHome = (props) => {
  const dispatch = useDispatch();

  const {currentUser} = useAuth();


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
  const handleGalleryName = (val) => {
    const galleryNameLimit = isMobile ? 16 : 22;
    const checkAndLimitGalleryName =
      val.length > galleryNameLimit
        ? `${val.substring(0, galleryNameLimit)}...`
        : val;
    setGalleryName(checkAndLimitGalleryName.replace(/\s/g, ""));
  };
  return (
    <LandingPageWrapper isLoggedIn={Boolean(currentUser)}>
      <PersonalLinksWrapper>
        <PLSectionOne>
          <PLSectionOneContent>
            <HeaderSubtitle>
              Stand out from the crowd, share NFT Galleries, and get paid in
              crypto fast with SmartURLs.
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
        <PersonalLinksPreview
          handleGalleryName={handleGalleryName}
          isLoggedIn={Boolean(currentUser)}
          galleryName={galleryName}
        />
      </PersonalLinksWrapper>
    </LandingPageWrapper>
  );
};

export default LinksHome;
