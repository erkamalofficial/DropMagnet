import { useEffect, useState } from "react";
import styled from "styled-components";
import "../home/index.css";
import "./index.css"
import { tabList } from "../../constants";
import DummySwiper from "../home/DummyPage/dummySwiper";
import LandingPageHeader from "../../components/elements/HeaderBar/LandingPageHeader";
import NftGallery from "../../components/elements/HeaderBar/NftGallery";
import useViewport from "./useViewport";
import Tabs from "../../components/elements/Tabs/index.js";
import FadeIn from 'react-fade-in';
import MetaURL from "./MetaURL";

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
  margin-top: 68px;
  flex-direction: column;
  // margin: 16px;
  @media (max-width: 576px){
    // margin: 16px;
  }
`;
const GalleryContainer = styled.div`
  @media(max-width: 576px){
    margin-top: 2px;
  }
`;

const TAB_LIST = ["Drop Swipe", "NFT Galleries", "MetaURLs"];

const LinksHome = (props) => {

  const [curTab, setCurTab] = useState(0)
  const uniqueId = Date.now();

  useEffect(() => {
    setTimeout(() => {
      props.setReload(false)
    }, 500);
  }, [])

  useEffect(() => {
    // First rendering
    if (props.reload) {
      sessionStorage.setItem('headerLoad', 'true')
    }
    else if (!props.reload && sessionStorage.headerLoad) {
      sessionStorage.removeItem('headerLoad')
    }
  }, [])

  console.log("RE-RENDER")

  return (
    <LinksPage>
      {/* {props.reload ? (
        <FadeIn delay={200}>
          <LandingPageHeader
            isLoggedIn={localStorage.getItem("userDetails") ? true : false}
            setCurTab={setCurTab} />
        </FadeIn>
      ) : (
        <LandingPageHeader
          isLoggedIn={localStorage.getItem("userDetails") ? true : false}
          setCurTab={setCurTab} />
      )} */}

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
                activeTabIndex={0}
                onSwipe={() => {}}
                handleActiveTabIndex={() => { }}
                tabList={tabList}
                nextIndex={null}
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
        <MetaURL />
      )}

    </LinksPage>
  );
};

export default LinksHome;
