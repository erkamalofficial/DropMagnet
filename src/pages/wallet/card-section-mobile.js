// import "./styles.css";

import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import LinksBtn from '../../components/blocks/links-btn';

const ArrowButton = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  background-color: grey;
  transition: all 240ms ease 0s;
  outline: none;
`;

const CardSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
    border-radius: 8px;
    background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  
    > * { margin-bottom: 0.6rem;}
    opacity: 0.8;
    margin: 18px;
    padding: 16px 0;
    @media (max-width: 320px) {
        margin: 8px;
        padding: 8px 0;
    }
`;

const PLLinksBtn = styled(LinksBtn) `
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
    @media (max-width: 320px) {
        padding: 8px;
        font-size: var(--font-size-xs);
    }
`;
const HeaderSubtitle = styled.div`
    font-size: var(--font-size-xl);
    margin-bottom: 16px;
    font-weight: 700;
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
    width: 100%
`;

const TabItem = styled.div`
    display: flex;
    align-items: center;
    > * { margin-right: 0.3rem;}
    .icon {
        font-size: 12px;
    }
`;
const ScrollContainer = styled.div`
    height: 210px;
    @media (max-width: 320px) {
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
const CardSectionItem = (cardItem, index, displayName) => {
    return {
        id: index,
        renderItem: (
            <TabItem>
                <span className="icon">{cardItem.icon}</span>
                <span>{cardItem.title}</span>
            </TabItem>
        )
    };
}
const contentList2 = [
    { title: "Artists", icon: "🎨" },
    { title: "Collectors", icon: "🌕" },
    { title: "Fashion", icon: "🧥" },
    { title: "Music", icon: "🎭" }
];

const CaurouselComponent = ({ displayName }) => {
    const {
        carouselFragment,
        slideToPrevItem,
        slideToNextItem
    } = useSpringCarousel({
        itemsPerSlide: 2,
        initialStartingPosition: "center",
        items: contentList2.map((cardItem, index) => CardSectionItem(cardItem, index, displayName))
    });

    return (
        <CardSection>
            <GridContainer>
                <NavIcon type="prev" onClick={slideToPrevItem}> &#8249; </NavIcon>
                {carouselFragment}
                <NavIcon type="next" onClick={slideToNextItem}> &#8250; </NavIcon>
            </GridContainer>
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
    );
};

export default CaurouselComponent;

