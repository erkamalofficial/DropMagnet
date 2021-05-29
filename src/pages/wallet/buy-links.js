import styled from "styled-components";
import LinksWrapper from "../../components/wrappers/LinksPageWrapper";
import { useState } from "react";
import LinksCard from "./links-card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
const ContinueButton = styled(Link)`
  line-height: 44px;
  box-shadow: 0 3px 25px rgba(57, 30, 125, 0.2), inset 0 -2px 0 #610bc8;
  border-radius: 8px 8px 0;
  border: 1px solid #610bc8;
  background-color: #152230;
  text-align: center;
  padding: 0 16px;
  margin-right: 16px;
  text-decoration: none;
`;
const getPrice = (v) => {
  if (v < 4) return 0;
  if (v === 4) return 4;
  if (v > 4) return v;
};
const BuyLinks = () => {
  const [costText, setCostText] = useState("Free Forever");
  const [showBuyAllBtn, setShowBuyAllBtn] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const dispatch = useDispatch();
  const galleryName = useSelector(
    (state) => state.category.general.galleryName
  );

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
      setShowBuyAllBtn(false);
    }
    if (linkSelection.length === 4) {
      setCostText("$4 per year");
      setShowBuyAllBtn(true);
    }
    if (linkSelection.length > 4) {
      setCostText(`$${linkSelection.length} per year`);
      setShowBuyAllBtn(true);
    }
    dispatch({
      type: "LINK_UPDATE_REQUEST",
      payload: {
        price: getPrice(linkSelection.length),
        linkIds: linkSelection,
      },
    });
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
              Promote your art with unique personal links
            </HeaderSubtitle>
          </PLSectionOneContent>
        </PLSectionOne>
        <LinksCard
          setCostText={setCostText}
          setShowBuyAllBtn={setShowBuyAllBtn}
          handleLinkSelection={handleLinkSelection}
          selectedLinks={selectedLinks}
          displayName={galleryName}
        />
        <PLFooterSection>
          <PLFooterSectionTitle>Total Price: {costText}</PLFooterSectionTitle>
          <ButtonContainer>
            {showBuyAllBtn && (
              <ContinueButton to="/links-payment">
                Buy All For $99
              </ContinueButton>
            )}
            <ContinueButton to="/links-payment">Continue</ContinueButton>
          </ButtonContainer>
        </PLFooterSection>
      </PersonalLinksWrapper>
    </LinksWrapper>
  );
};

export default BuyLinks;
