import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import LinksWrapper from "../../components/wrappers/LinksPageWrapper";
import Spinner from "../../components/blocks/spinner";
import { useState } from "react";
import CardSectionDesktop from "./card-section-desktop";
import CardSectionMobile from "./card-section-mobile";
import useViewport from "./useViewport";
import { fetchLinks } from "./actions";
import emojis from "./emojiicons";
import PersonalLinksPreview from "./personal-links-preview";

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
const PLFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
`;
const PLFooterSectionTitle = styled.div`
  text-align: center;
  line-height: 58px;
  width: 309px;
  height: 58px;
  border-radius: 16px;
  background-image: linear-gradient(180deg, #202020 0%, #333232 100%);
  font-size: 22px;
  margin-bottom: 18px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContinueButton = styled.div`
  line-height: 44px;
  box-shadow: 0 3px 25px rgba(57, 30, 125, 0.2), inset 0 -2px 0 #610bc8;
  border-radius: 8px 8px 0;
  border: 1px solid #610bc8;
  background-color: #152230;
  text-align: center;
  padding: 0 16px;
  margin-right: 16px;
`;
const getGroupedLinks = (linkList) => {
  const st = new Set();
  linkList.forEach((item) => st.add(...item.tags));
  const uniqueKeys = [...st];

  const groupedList = {};
  linkList.forEach((link) => {
    uniqueKeys.forEach((key) => {
      if (link.tags.includes(key)) {
        groupedList[key] = groupedList[key] || [];
        groupedList[key].push({ icon: emojis[key], title: key, item: link });
      }
    });
  });
  return groupedList;
};

const PersonalLinks = (props) => {
  const [galleryName, setGalleryName] = useState("");
  const [showBuyAllBtn, setShowBuyALlBtn] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const displayName = galleryName === "" ? "You" : galleryName;
  const [costText, setCostText] = useState("Free Forever");
  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLinks());
  }, []);

  const isLoading = useSelector((state) => state.category.general.isLoading);
  const allLinksList = useSelector((state) => state.category.links);
  var groupedList = {};

  if (allLinksList.length > 0) {
    groupedList = getGroupedLinks(allLinksList);
  }

  const handleGalleryName = (val) => {
    const galleryNameLimit = isMobile ? 16 : 22;
    const checkAndLimitGalleryName =
      val.length > galleryNameLimit
        ? `${val.substring(0, galleryNameLimit)}...`
        : val;
    setGalleryName(checkAndLimitGalleryName.replace(/\s/g, ""));
  };
  const handleLinkSelection = (id, linkStatus) => {
    if (linkStatus === "S") return;
    const linkSelection = [...selectedLinks];
    const selectedLinkIndex = linkSelection.indexOf(id);
    if (selectedLinkIndex > -1) {
      linkSelection.splice(selectedLinkIndex, 1);
    } else {
      linkSelection.push(id);
    }
    if (linkSelection.length < 4) {
      setCostText("Free Forever");
      setShowBuyALlBtn(false);
    }
    if (linkSelection.length === 4) {
      setCostText("$4 per year");
      setShowBuyALlBtn(true);
    }
    if (linkSelection.length > 4) {
      setCostText(`$${linkSelection.length} per year`);
      setShowBuyALlBtn(true);
    }
    setSelectedLinks(linkSelection);
  };

  return (
    <LinksWrapper>
      <PersonalLinksWrapper>
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
        {isLoading && <Spinner />}
        {!isLoading && allLinksList.length > 0 && (
          <>
            {isMobile ? (
              <CardSectionMobile
                displayName={displayName}
                handleLinkSelection={handleLinkSelection}
                selectedLinks={selectedLinks}
                linksList={groupedList}
              />
            ) : (
              <CardSectionDesktop
                displayName={displayName}
                handleLinkSelection={handleLinkSelection}
                selectedLinks={selectedLinks}
                linksList={groupedList}
              />
            )}
          </>
        )}
        <PersonalLinksPreview handleGalleryName={handleGalleryName} />
      </PersonalLinksWrapper>
    </LinksWrapper>
  );
};

export default PersonalLinks;
