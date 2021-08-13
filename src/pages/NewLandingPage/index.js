import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styled from "styled-components";

import LinksCard from "./links-card";
import { useAuth } from "../../contexts/FirebaseAuthContext";

import { useSelector } from "react-redux";
import {
  fetchMusic,
  fetchArt,
  fetchColletibles,
  fetchFashion,
  fetchReswipeBuckets,
} from "../home/actions";
import "../home/index.css";
import "./index.css"
import { useHistory } from "react-router";
import { saveDrop, unsaveDrop } from "../../DropMagnetAPI";
import { tabList } from "../../constants";
import DummySwiper from "../home/DummyPage/dummySwiper";
import LandingPageHeader from "../../components/elements/HeaderBar/LandingPageHeader";
import NftGallery from "../../components/elements/HeaderBar/NftGallery";
import PersonalLinksPreview from "./personal-links-preview";
import useViewport from "./useViewport";
import Tabs from "../../components/elements/Tabs/index.js";
import FadeIn from 'react-fade-in';


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -14px;
  div.rel {
    position: relative;
    user-select: none;
    // margin-bottom: 30px;
    padding-top: var(--main-header-margin-top);
    @media (max-width: 500px) {
      padding-top: 10px
    }
  }
  @media(max-width: 576px){
    margin-top: 2px;
  }
`;

const LinksPage = styled.div`
  display: flex;
  flex-direction: column;
  // margin: 16px;
  @media (max-width: 576px){
    // margin: 16px;
  }
`;

const CardContainer = styled.div`
  width: var(--card-container-width);
  height: var(--card-container-height);
  margin-bottom: var(--gap-bottom);
`;

const GalleryContainer = styled.div`
  @media(max-width: 576px){
    margin-top: 2px;
  }
`;

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

const TAB_LIST = ["Drop Swipe", "NFT Galleries", "MetaURLs"];

const LinksHome = (props) => {
  const dispatch = useDispatch();

  const { currentUser, idToken } = useAuth();

  const [detailView, setDetailView] = useState(false);
  const [galleryName, setGalleryName] = useState("");

  const [curTab, setCurTab] = useState(0)

  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;

  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const nextIndex = useSelector((state) => state.category.nextIndex);

  const displayName = galleryName === "" ? "You" : galleryName;

  const currentTabId = tabList[activeTabIndex];
  const { activeBucket } = useSelector((state) => {
    return state.category[currentTabId];
  });

  const uniqueId = Date.now();

  const handleSwipe = (dir, drop_id) => {
    currentUser.getIdToken().then((idToken) => {
      if (dir === "right") {
        // setInternalLoader(true);
        saveDrop(idToken, drop_id)
          .then(() => {
            console.log("Success");
          })
          .catch(() => { })
          .finally(() => {
            // setInternalLoader(false);
          });
      } else if (dir === "left") {
        unsaveDrop(idToken, drop_id)
          .then(() => {
            console.log('Unsave Success');
          })
          .catch(() => {

          })
          .finally(() => {

          })
      }

    }).catch(() => {
      console.log('Error While Getting token');
    })
  };

  const handleGalleryName = (val) => {
    const galleryNameLimit = isMobile ? 16 : 22;
    const checkAndLimitGalleryName =
      val.length > galleryNameLimit
        ? `${val.substring(0, galleryNameLimit)}...`
        : val;
    setGalleryName(checkAndLimitGalleryName.replace(/\s/g, ""));
  };

  useEffect(() => {
    setTimeout(() => {
      props.setReload(false)
    }, 500);
  }, [])

  return (
    <LinksPage>

      {props.reload ? (
        <FadeIn delay={200}>
          <LandingPageHeader
            isLoggedIn={localStorage.getItem("userDetails") ? true : false}
            setCurTab={setCurTab} />
        </FadeIn>
      ) : (
        <LandingPageHeader
          isLoggedIn={localStorage.getItem("userDetails") ? true : false}
          setCurTab={setCurTab} />
      )}

      <FadeIn delay={200}>
        <Tabs tabs={TAB_LIST} activeTabIndex={curTab} onChangeTab={(index) => {
          setCurTab(index)
          if (typeof setCurTab !== undefined) {
            setCurTab(index)
          }
        }} />
      </FadeIn>

      {curTab === 0 ? (
        <HomeContainer>
          <div className="rel" style={{ paddingTop: '0' }}>
            <FadeIn delay={600}
              childClassName="child-content">
              <DummySwiper
                reswipeModeActive={false}
                key={uniqueId}
                db={activeBucket}
                activeTabIndex={activeTabIndex}
                onSwipe={handleSwipe}
                handleActiveTabIndex={() => { }}
                tabList={tabList}
                setDetailView={setDetailView}
                nextIndex={nextIndex}
              />
            </FadeIn>
          </div>
        </HomeContainer>
      ) : curTab === 1 ? (
        <GalleryContainer>
          <FadeIn delay={600}
            childClassName="child-content">
            <NftGallery />
          </FadeIn>
        </GalleryContainer>

      ) : (
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
              handleGalleryName={() => handleGalleryName}
              isLoggedIn={Boolean(currentUser)}
              galleryName={galleryName}
            />
          </FadeIn>
        </PersonalLinksWrapper>
      )}

    </LinksPage>
  );
};

export default LinksHome;
