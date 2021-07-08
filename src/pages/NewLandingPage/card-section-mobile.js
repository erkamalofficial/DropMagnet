import {  useState } from "react";
import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import LinksBtn from "./links-btn";
import { map } from "lodash";

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616; */
  border-radius: 8px;
  background-color: #262626;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); */
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  /* background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%); */

  > * {
    margin-bottom: 0.6rem;
  }
  /* opacity: 0.8; */
  padding: 16px 0;
  @media (max-width: 340px) {
    margin: 8px;
    padding: 8px 0;
  }
  padding-bottom: 6px;
`;

const PLLinksBtn = styled(LinksBtn)`
  /* box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5); */
  border-radius: 23px;
  background-color: rgba(0, 0, 0, 0.88);
  /* background-color: rgba(23, 23, 24, 0.88); */
  font-weight: 700;
  font-size: 18px;
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
  }
  @media (max-width: 576px){
    padding-bottom: 4px;
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
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  justify-items: center;
  font-weight: 700;
  width: 100%;
  > div:nth-child(2) {
    height: auto !important;
    position: relative;
    padding: 10px 0;
    padding-bottom: 15px;
    ::before {
      position  : absolute;
      content: '';
      top: calc(100% - 2px);
      left: 10px;
      width: calc(100% - 10px);
      height: 2px;
      background: rgba(0,0,0,.2);
    }
  }
  > div>div{
    align-items: center;
  }
  >div>div>div{
    flex: unset !important;
  }
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
  padding: 6px 16px;
  /* border-bottom: 2px solid #030303; */
  margin-bottom: 2px;
  > * {
    margin-right: 0.3rem;
  }
  .icon {
    font-size: 12px;
    margin-right: 8px;
  }
  
`;
const ScrollContainer = styled.div`
  height: 210px;
  @media (max-width: 340px) {
    height: 135px;
  }
  margin-top: 6px;
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
const CardSectionItem = (linkItems, linkKey, handleTabSelection,isActive) => {
  console.log(linkItems[0].icon);
  return {
    id: linkKey,
    renderItem: (
      <TabItem style={{width: "max-content" }} onClick={() => handleTabSelection(linkKey)} className={isActive?'active-tab blank-gradient-button': 'un-active-tab'}>
        <span className={isActive ? 'blank-gradient-text': ''}>
          {linkItems[0].icon && <span className="icon">{linkItems[0].icon}</span>}
          <span>{linkItems[0].title}</span>
        </span>
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
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabSelection = (key) => {
    setSelectedTab(key);
  };
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    getCurrentActiveItem,
  } = useSpringCarousel({
    // itemsPerSlide: 2,
    itemsPerSlide: 3,
    initialStartingPosition: "center",
    items: linksList.map((linkItem, index) => CardSectionItem(linkItem, index, handleTabSelection,selectedTab === index)),
  });

  const currentSelectedItem = linksList[selectedTab];
  const handlePrev = () => {
    slideToPrevItem();
    const { index } = getCurrentActiveItem();
    // clgetCurrentActiveItem()
    setSelectedTab(index);
  };
  const handleNext = () => {
    slideToNextItem();
    const { index } = getCurrentActiveItem();
    setSelectedTab(index);
  };
  return (
    <CardSection>
      <GridContainer>
        <div>

        </div>
        {/* <NavIcon type="prev" onClick={handlePrev}>
          &#8249;
        </NavIcon> */}
        {carouselFragment}
        <div>
          
        </div>
        {/* <NavIcon type="next" onClick={handleNext}>
          &#8250;
        </NavIcon> */}
      </GridContainer>
      <ScrollContainer>
        <ScrollContainerContent>
          {map(currentSelectedItem, (linkItem, index) => {
            return (
              <PLLinksBtn
                key={index}
                linkName={linkItem.item.id}
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
