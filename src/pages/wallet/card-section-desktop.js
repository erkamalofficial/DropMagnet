// import "./styles.css";

import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import LinksBtn from "../../components/blocks/links-btn";

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
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);

  opacity: 0.8;
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
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 23px;
  background-color: rgba(23, 23, 24, 0.88);
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

const CardSectionItem = (cardItem, index, displayName) => {
  return {
    id: index,
    renderItem: (
      <CardContainer>
        <CardSection>
          <Circle>{cardItem.icon}</Circle>
          <HeaderSubtitle>{cardItem.title}</HeaderSubtitle>
          <ScrollContainer>
            <ScrollContainerContent>
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
              <PLLinksBtn galleryName={displayName} />
            </ScrollContainerContent>
          </ScrollContainer>
        </CardSection>
      </CardContainer>
    ),
  };
};
const contentList2 = [
  { title: "Artists", icon: "🎨" },
  { title: "Collectors", icon: "🌕" },
  { title: "Fashion", icon: "🧥" },
  { title: "Music", icon: "🎭" },
];

const CaurouselComponent = ({ displayName }) => {
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      itemsPerSlide: 2,
      initialStartingPosition: "center",
      items: contentList2.map((cardItem, index) =>
        CardSectionItem(cardItem, index, displayName)
      ),
    });

  return (
    <GridContainer>
      <NavIcon type="prev" onClick={slideToPrevItem}>
        {" "}
        &#8249;{" "}
      </NavIcon>
      {carouselFragment}
      <NavIcon type="next" onClick={slideToNextItem}>
        {" "}
        &#8250;{" "}
      </NavIcon>
    </GridContainer>
  );
};

export default CaurouselComponent;
