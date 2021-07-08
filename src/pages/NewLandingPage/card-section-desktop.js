// import "./styles.css";

import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import LinksBtn from "./links-btn";
import { map } from "lodash";
const CardContainer = styled.div`
  width: 100%;
  margin: 16px;
`;
const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 320px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 8px;
  background-color: #262626;
  /* background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%); */

  /* opacity: 0.8; */
  margin-top: 36px;
`;
const Circle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  text-align: center;
  font-size: var(--font-size-3xl);

  color: white;
  margin-bottom: -24px;
  z-index: 1;
  transform: translateY(-50%);
  line-height: 72px;
  background-color: var(--darkBlue);
  border: 3px solid var(--purple500);
`;
const PLLinksBtn = styled(LinksBtn)`
  width: 95%;
  /* box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5); */
  border-radius: 23px;
  background-color: rgba(0,0,0, 0.88);
  font-weight: 700;
  text-align: center;
  padding: 12px;
  line-height: normal;
  .tagLink {
    color: var(--grayWhite);
  }
  .tagYou {
    color: var(--purple400);
  }
  margin-bottom: 8px;
`;
const HeaderSubtitle = styled.div`
  font-size: var(--font-size-xl);
  margin-bottom: 16px;
  font-weight: 700;
`;
const NavIcon = styled.div`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  background-color: rgba(23, 23, 24, 0.88);
  text-align: center;
  font-size: 32px;
  cursor: pointer;
  margin-top: 18px;
  user-select: none;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  align-items: center;
  justify-items: center;
  width: 1148px;
  margin: auto;
  margin-bottom: 32px;
`;

const ScrollContainer = styled.div`
  height: 210px;
  width: 100%;
  overflow: hidden;
`;
const ScrollContainerContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleButtonContainer = styled.div`
  padding: 24px;
`;

const TitleButton = styled.button`
  cursor: default;
  padding: 8px 16px;
`;

const Text = styled.span`
  margin-top: 8px;
  margin-left: 8px;
`;

const CardSectionItem = (
  linkItems,
  linkKey,
  displayName,
  handleLinkSelection,
  selectedLinks,
  availableLinks
) => {
  return {
    id: linkKey,
    renderItem: (
      <CardContainer>
        <CardSection>
          <TitleButtonContainer>
            <TitleButton className={"blank-gradient-button"}>
              <span className={"blank-gradient-text"}>
                {linkItems[0].icon}
                <Text>{linkItems[0].title}</Text>
              </span>
            </TitleButton>
          </TitleButtonContainer>

          {/* <Circle></Circle>
          <HeaderSubtitle></HeaderSubtitle> */}
          <ScrollContainer>
            <ScrollContainerContent>
              {map(linkItems, (linkItem, index) => (
                <PLLinksBtn
                  key={index}
                  dataKey={index}
                  linkId={linkItem.item.id}
                  selectLink={() =>
                    handleLinkSelection(linkItem.item.id, linkItem.item.active)
                  }
                  className={
                    (linkItem.item.active === "S" && "button-disabled") ||
                    (selectedLinks.includes(linkItem.item.id) &&
                      "button-active")
                  }
                  linkName={linkItem.item.id}
                  galleryName={displayName}
                />
              ))}
            </ScrollContainerContent>
          </ScrollContainer>
        </CardSection>
      </CardContainer>
    ),
  };
};

const CaurouselComponent = ({
  displayName,
  linksList,
  availableLinks,
  handleLinkSelection,
  selectedLinks,
  getPageDetails,
}) => {
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    getCurrentActiveItem,
  } = useSpringCarousel({
    itemsPerSlide: 2,
    initialStartingPosition: "center",
    items: map(linksList, (linkItem, linkKey) =>
      CardSectionItem(
        linkItem,
        linkKey,
        displayName,
        handleLinkSelection,
        selectedLinks,
        availableLinks
      )
    ),
  });

  const handlePrev = () => {
    slideToPrevItem();
    const { index } = getCurrentActiveItem();
    var pageNos = [0, 1];
    if (index > 0) {
      pageNos = [index - 1, index];
    }
    getPageDetails(pageNos);
  };
  const handleNext = () => {
    slideToNextItem();
    const { index } = getCurrentActiveItem();
    var pageNos = [0, 1];
    if (index > 0) {
      pageNos = [index, index + 1];
    }
    getPageDetails(pageNos);
  };

  return (
    <GridContainer>
      <NavIcon type="prev" onClick={handlePrev}>
        &#8249;
      </NavIcon>
      {carouselFragment}
      <NavIcon type="next" onClick={handleNext}>
        &#8250;
      </NavIcon>
    </GridContainer>
  );
};


export default CaurouselComponent;
