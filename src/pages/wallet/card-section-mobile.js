import { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import LinksBtn from "./links-btn";
import { map } from "lodash";

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 8px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);

  > * {
    margin-bottom: 0.6rem;
  }
  opacity: 0.8;
  margin: 18px;
  padding: 16px 0;
  @media (max-width: 340px) {
    margin: 8px;
    padding: 8px 0;
  }
`;

const PLLinksBtn = styled(LinksBtn)`
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 23px;
  background-color: rgba(23, 23, 24, 0.88);
  font-weight: 700;
  text-align: center;
  line-height: normal;
  width: 92%;
  .tagLink {
    color: var(--grayWhite);
  }
  .tagYou {
    color: var(--purple400);
  }
  margin-bottom: 8px;
  padding: 12px;
  @media (max-width: 340px) {
    padding: 8px;
    font-size: var(--font-size-xs);
  }
`;

const NavIcon = styled.div`
  width: 44px;
  height: 44px;
  text-align: center;
  font-size: 32px;
  cursor: pointer;
  user-select: none;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  align-items: center;
  justify-items: center;
  font-weight: 700;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  background-color: rgba(23, 23, 24, 0.88);
  width: 100%;
  > div:nth-child(2) {
    height: auto !important;
  }
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  > * {
    margin-right: 0.3rem;
  }
  .icon {
    font-size: 12px;
  }
`;
const ScrollContainer = styled.div`
  height: 210px;
  @media (max-width: 340px) {
    height: 135px;
  }
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
const CardSectionItem = (
  linkItems,
  linkKey,
  handleTabSelection
) => {
  return {
    id: linkKey,
    renderItem: (
      <TabItem onClick={() => handleTabSelection(linkKey)}>
        <span className="icon">{linkItems[0].icon}</span>
        <span>{linkItems[0].title}</span>
      </TabItem>
    ),
  };
};

const CaurouselComponent = ({
  displayName,
  linksList,
  handleLinkSelection,
  selectedLinks,
}) => {
  const [selectedTab, setSelectedTab] = useState("Art");
  const handleTabSelection = (key) => {
    setSelectedTab(key);
  };
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    getCurrentActiveItem,
  } = useSpringCarousel({
    itemsPerSlide: 1,
    initialStartingPosition: "center",
    items: map(linksList, (linkItem, linkKey) =>
      CardSectionItem(linkItem, linkKey, handleTabSelection)
    ),
  });

  // keep the order

  const linksMap = new Map();
  map(linksList, (links, key) => {
    linksMap.set(key, links);
  });

  const currentSelectedItem = linksMap.get(selectedTab);
  const handlePrev = () => {
    slideToPrevItem();
    const { id } = getCurrentActiveItem();
    setSelectedTab(id);
  };
  const handleNext = () => {
    slideToNextItem();
    const { id } = getCurrentActiveItem();
    setSelectedTab(id);
  };
  return (
    <CardSection>
      <GridContainer>
        <NavIcon type="prev" onClick={handlePrev}>
          &#8249;
        </NavIcon>
        {carouselFragment}
        <NavIcon type="next" onClick={handleNext}>
          &#8250;
        </NavIcon>
      </GridContainer>
      <ScrollContainer>
        <ScrollContainerContent>
          {map(currentSelectedItem, (linkItem, index) => {
            return (
              <PLLinksBtn
                key={index}
                linkName={linkItem.item.domain}
                galleryName={displayName}
                selectLink={() =>
                  handleLinkSelection(linkItem.item.id, linkItem.item.active)
                }
                className={
                  (linkItem.item.active === "S" && "button-disabled") ||
                  (selectedLinks.includes(linkItem.item.id) && "button-active")
                }
              />
            );
          })}
        </ScrollContainerContent>
      </ScrollContainer>
    </CardSection>
  );
};

export default CaurouselComponent;
