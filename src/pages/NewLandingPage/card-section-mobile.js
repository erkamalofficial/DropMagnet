import { useRef, useState } from "react";
import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import LinksBtn from "./links-btn";
import { map, uniqueId } from "lodash";
import { Transition } from "react-transition-group";

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
  padding: 8px 0;
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
  @media (max-width: 576px) {
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
  grid-template-columns: 1fr;
  /* grid-template-rows: repeat(2,1fr); */
  align-items: center;
  justify-items: center;
  font-weight: 700;
  width: 100%;
  > div {
    height: auto !important;
    position: relative;
    padding: 10px 0;
    padding-bottom: 15px;
    ::before {
      position: absolute;
      content: "";
      top: calc(100% - 2px);
      left: 10px;
      width: calc(100% - 10px);
      height: 2px;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  /* > div>div{
    align-items: center;
  } */
  > div > div > div {
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

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateX(-100%)'
  },
  entered: {
    opacity: 1,
    transform: 'translateX(0)'
  },
  exiting: {
    opacity: 1,
    transform: 'translateX(0)'
  },
  exited: {
    opacity: 0,
    transform: 'translateX(100%)'
  }
};

const oppositeTransitionStyles = {
  exited: {
    opacity: 0,
    transform: 'translateX(-100%)'
  },
  exiting: {
    opacity: 1,
    transform: 'translateX(0)'
  },
  entered: {
    opacity: 1,
    transform: 'translateX(0)'
  },
  entering: {
    opacity: 0,
    transform: 'translateX(100%)'
  }
};

const CardSectionItem = (linkItems, linkKey, handleTabSelection, isActive) => {
  return {
    id: linkKey,
    renderItem: (
      <TabItem
        style={{ width: "max-content" }}
        onClick={() => handleTabSelection(linkKey)}
        className={
          "border-class "+
          (isActive ? "active-tab blank-gradient-button" : "un-active-tab")
        }
      >
        <span className={isActive ? "blank-gradient-text" : ""}>
          {linkItems[0].icon && (
            <span className="icon">{linkItems[0].icon}</span>
          )}
          <span>{linkItems[0].title}</span>
        </span>
      </TabItem>
    ),
  };
};

const ERROR_ENTRIES = 9;

const getExtraItems = () => {
  const data = [];
  for (let i = 0; i < ERROR_ENTRIES; i++) {
    data.push({
      id: 100 + Math.floor(Math.random() * 10),
      renderItem: <div style={{ flex: "1 0 20px" }}></div>,
    });
  }
  return data;
};

const CaurouselComponent = ({
  displayName,
  linksList,
  handleLinkSelection,
  selectedLinks,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [animateLeft, setIsAnimateLeft] = useState(true);
  const handleTabSelection = (key) => {
    if(key < selectedTab){
      setIsAnimateLeft(true);
    }else{
      setIsAnimateLeft(false);
    }
    setSelectedTab(key);
  };
  const { carouselFragment, slideToItem, getCurrentActiveItem } =
    useSpringCarousel({
      // itemsPerSlide: 2,
      itemsPerSlide: 3,
      // withLoop: true,
      initialStartingPosition: "end",
      disableGestures: false,
      items: [
        ...linksList.map((linkItem, index) =>
          CardSectionItem(
            linkItem,
            index,
            handleTabSelection,
            selectedTab === index
          )
        ),
        ...getExtraItems(),
      ],
    });

  const mouseMovementRef = useRef();

  const currentSelectedItem = linksList[selectedTab];
  const handleCarouselMovement = (step) => {
    // console.log(step);
    const {index} = getCurrentActiveItem();
    const nextStep = step+ index;
    console.log(nextStep);
    // console.log(linksList.length, index,nextStep);
    if(nextStep >= (linksList.length+ERROR_ENTRIES)){
      slideToItem(linksList.length+ERROR_ENTRIES - 1);
    }else if(nextStep <0){
      slideToItem(0);
    }else{
      slideToItem(nextStep);
    }
  }
  return (
    <CardSection style={{ width: "100%" }}>
      <GridContainer
        style={{
          width: "calc(100% - 60px)",
          overflow: "hidden",
          margin: "0 auto",
          marginBottom: "12px",
        }}
        onTouchStart={(e) => {
          if (e.touches && e.touches[0]) {
            mouseMovementRef.current = e.touches[0].clientX;
          }
        }}
        onTouchEnd={(e) => {
          if (e.changedTouches && e.changedTouches[0]) {
            const finalMovement = e.changedTouches[0].clientX;
            const dist = Math.floor(
              (mouseMovementRef.current - finalMovement) / (3 * 1.2 * 10)
            );
            if (dist !== 0) {
              handleCarouselMovement(dist);
            }
          }
        }}
      >
        {carouselFragment}
        {/* {thumbsFragment} */}
      </GridContainer>
      <ScrollContainer>
        <ScrollContainerContent style={{ width: "100%" }}>
          {map(currentSelectedItem, (linkItem, index) => {
            return (
              <Transition in={true} appear={true} mountOnEnter key={uniqueId('anai')}>
                {(state) => {
                  return (
                    <PLLinksBtn
                      key={linkItem}
                      linkName={linkItem.item.id}
                      galleryName={displayName}
                      selectLink={() =>
                        handleLinkSelection(
                          linkItem.item.id,
                          linkItem.item.active
                        )
                      }
                      className={
                        (linkItem.item.active === "S" && "button-disabled") ||
                        (selectedLinks.includes(linkItem.item.id) &&
                          "button-active")
                      }
                      style= {{
                        transition: 'all .5s',
                        ...(animateLeft?transitionStyles[state]: oppositeTransitionStyles[state])
                      }}
                    />
                  );
                }}
              </Transition>
            );
          })}
        </ScrollContainerContent>
      </ScrollContainer>
    </CardSection>
  );
};

export default CaurouselComponent;
