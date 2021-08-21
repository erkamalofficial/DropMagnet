import { useEffect, useState } from "react";

import styled from "styled-components";

import LinksCard from "./links-card";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import "../home/index.css";
import "./index.css"
import { saveDrop, unsaveDrop } from "../../DropMagnetAPI";
import { tabList } from "../../constants";
import DummySwiper from "../home/DummyPage/dummySwiper";
import LandingPageHeader from "../../components/elements/HeaderBar/LandingPageHeader";
import NftGallery from "../../components/elements/HeaderBar/NftGallery";
import PersonalLinksPreview from "./personal-links-preview";
import useViewport from "./useViewport";
import Tabs from "../../components/elements/Tabs/index.js";
import FadeIn from 'react-fade-in';

const PersonalLinksWrapper = styled.div`
  // width: calc(100% - 32px);
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  @media(max-width: 576px){
    margin-top: 2px;
  }
`;

const PLSectionOne = styled.div`
  margin-top: 16px;
  margin-bottom: 28px;
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
    margin-left: 12px;
    margin-right: 12px;
    font-size: 15px;
  }
  font-weight: 700;
`;

const MetaURL = () => {

    const { currentUser, idToken } = useAuth();
    const { viewportWidth } = useViewport();
    const breakpoint = 620;
    const isMobile = viewportWidth < breakpoint;

    const [galleryName, setGalleryName] = useState("");

    const handleGalleryName = (val) => {
        const galleryNameLimit = isMobile ? 16 : 22;
        const checkAndLimitGalleryName =
            val.length > galleryNameLimit
                ? `${val.substring(0, galleryNameLimit)}...`
                : val;
        setGalleryName(checkAndLimitGalleryName.replace(/\s/g, ""));
    };

    const displayName = galleryName === "" ? "You" : galleryName;

    return (
        <PersonalLinksWrapper>
            <PLSectionOne>
                <PLSectionOneContent>
                    <FadeIn delay={600}
                        childClassName="child-content">
                        <HeaderSubtitle>
                            Stand out from the crowd, share NFT Galleries, and get paid in
                            crypto fast with MetaURLs.
                        </HeaderSubtitle>
                    </FadeIn>
                </PLSectionOneContent>
            </PLSectionOne>
            <FadeIn delay={600}
                childClassName="child-content">
                <LinksCard
                    handleLinkSelection={() => { }}
                    selectedLinks={[]}
                    displayName={displayName}
                    handleGalleryName={() => { }}
                    getPageDetails={() => { }}
                />
                <PersonalLinksPreview
                    handleGalleryName={handleGalleryName}
                    isLoggedIn={Boolean(currentUser)}
                    isMobile={isMobile}
                />
            </FadeIn>
        </PersonalLinksWrapper>
    )
}

export default MetaURL
