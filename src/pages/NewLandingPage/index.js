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
import { useHistory } from "react-router";
import { saveDrop, unsaveDrop } from "../../DropMagnetAPI";
import { tabList } from "../../constants";
import DummySwiper from "../home/DummyPage/dummySwiper";
import LandingPageHeader from "../../components/elements/HeaderBar/LandingPageHeader";
import NftGallery from "../../components/elements/HeaderBar/NftGallery";
import PersonalLinksPreview from "./personal-links-preview";
import useViewport from "./useViewport";


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  div.rel {
    position: relative;
    user-select: none;
    // margin-bottom: 30px;
    padding-top: var(--main-header-margin-top);
    @media (max-width: 500px) {
      padding-top: 10px
    }
  }
`;

const LinksPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  @media (max-width: 576px){
    margin: 0;
  }
`;

const CardContainer = styled.div`
  width: var(--card-container-width);
  height: var(--card-container-height);
  margin-bottom: var(--gap-bottom);
`;

const PersonalLinksWrapper = styled.div`
  width: calc(100% - 32px);
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 16px;
  margin-top: 50px;
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
  const history = useHistory();

  const { currentUser, idToken } = useAuth();

  const curIndex = useSelector((state) => state.category.curIndex);

  const [selectedDropdownDate, setSelectedDropdownDate] = useState(new Date(curIndex));
  const [detailView, setDetailView] = useState(false);
  const [galleryName, setGalleryName] = useState("");

  const [curTab, setCurTab] = useState(0)

  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;
  const [pageNos, setPageNos] = useState([0, 1]);

  const getPageDetails = (pageNos) => {
    setPageNos(pageNos);
  };

  const activeTabIndex = useSelector((state) => {
    return state.category.general.activeTabIndex;
  });
  const nextIndex = useSelector((state) => state.category.nextIndex);
  const fetchMore = useSelector((state) => state.category.fetchMore);

  const displayName = galleryName === "" ? "You" : galleryName;

  const currentTabId = tabList[activeTabIndex];
  const { activeBucket } = useSelector((state) => {
    return state.category[currentTabId];
  });

  const uniqueId = Date.now();

  const handleActiveTabIndex = (index) => {

    const activeTab = tabList[index];

    let curTime = new Date(selectedDropdownDate).getTime()
    let extras = {
      token: idToken,
      curTime: curTime,
      userID: currentUser.uid,
    }

    if (activeTab === "music") {
      dispatch(fetchMusic({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "arts") {
      dispatch(fetchArt({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "collectables") {
      dispatch(fetchColletibles({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
    if (activeTab === "fashion") {
      dispatch(fetchFashion({ activeTabIndex: index, extras: { ...extras, token: idToken } }));
    }
  };

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

  return (
    <LinksPage>

      <LandingPageHeader
        isLoggedIn={localStorage.getItem("userDetails") ? true : false}
        setCurTab={setCurTab} />

      {curTab === 0 ? (
        <HomeContainer>
          <div className="rel">
            <DummySwiper
              reswipeModeActive={false}
              key={uniqueId}
              db={activeBucket}
              activeTabIndex={activeTabIndex}
              onSwipe={handleSwipe}
              handleActiveTabIndex={handleActiveTabIndex}
              tabList={tabList}
              setDetailView={setDetailView}
              nextIndex={nextIndex}
            />
          </div>
        </HomeContainer>
      ) : curTab === 1 ? (
        <NftGallery />
      ) : (
        <PersonalLinksWrapper>
          <PLSectionOne>
            <PLSectionOneContent>
              <HeaderSubtitle>
                Stand out from the crowd, share NFT Galleries, and get paid in
                crypto fast with MetaURLs.
              </HeaderSubtitle>
            </PLSectionOneContent>
          </PLSectionOne>
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
        </PersonalLinksWrapper>
      )}


    </LinksPage>
  );
};

export default LinksHome;
