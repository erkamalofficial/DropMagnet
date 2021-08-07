import React, { useState } from 'react'
import "./LazyLoaders.css"

import { useSpringCarousel } from "react-spring-carousel-js";
import styled from "styled-components";
import { map } from "lodash";
import { CSSTransition, SwitchTransition } from "react-transition-group";

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
const PLLinksBtn = styled.div`
  font-weight: 700;
  text-align: center;
  padding: 12px;
  line-height: normal;
  margin-bottom: 8px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  align-items: center;
  justify-items: center;
  width: 570px;
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

const CardSectionMobile = styled.div`
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
const PLLinksBtnMobile = styled.div`
  margin-bottom: 8px;
  padding: 12px;
  @media (max-width: 340px) {
    padding: 8px;
  }
  @media (max-width: 576px) {
    padding-bottom: 4px;
  }
`;
const GridContainerMobile = styled.div`
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
const ScrollContainerMobile = styled.div`
  height: 210px;
  @media (max-width: 340px) {
    height: 135px;
  }
  margin-top: 6px;
  width: 100%;
  overflow: hidden;
`;
const ScrollContainerContentMobile = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ERROR_ENTRIES = 9;

const CardSectionItem = (
    linkKey,
    displayName,
) => {
    return {
        id: linkKey,
        renderItem: (
            <CardContainer>
                <CardSection>
                    <TitleButtonContainer>
                        <TitleButton className={"stripe title-stripe"} />
                    </TitleButtonContainer>

                    <ScrollContainer>
                        <ScrollContainerContent>
                            {map([1, 2, 3, 4], (linkItem, index) => (
                                <PLLinksBtn
                                    key={index}
                                    linkId={0}
                                    selectLink={() => { }}
                                    className={'stripe links-stripe'}
                                    linkName={'gdfgdf'}
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

export const CardsDesktopLoader = ({
    displayName,
    availableLinks,
    handleLinkSelection,
    selectedLinks,
}) => {
    const {
        carouselFragment,
    } = useSpringCarousel({
        itemsPerSlide: 1,
        initialStartingPosition: "center",
        items: map([1], (linkItem, linkKey) =>
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
    return (
        <GridContainer>
            <div className="blank-div" style={{ width: "44px", height: "44px" }}></div>
            {carouselFragment}
            <div className="blank-div" style={{ width: "44px", height: "44px" }}></div>
        </GridContainer>
    );
};

const CardSectionItemMobile = (linkKey) => {
    return {
        id: linkKey,
        renderItem: (
            <TabItem
                onClick={() => { }}
                className={'stripe title-stripe-mobile'}
            />
        ),
    };
};

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

export const CardsMobileLoader = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const { carouselFragment } =
        useSpringCarousel({
            itemsPerSlide: 1,
            initialStartingPosition: "end",
            disableGestures: false,
            items: [
                ...[1].map((linkItem, index) =>
                    CardSectionItemMobile(
                        linkItem,
                        index,
                        () => { },
                        selectedTab === index
                    )
                ),
                ...getExtraItems(),
            ],
        });

    return (
        <CardSectionMobile style={{ width: "100%" }}>
            <GridContainerMobile
                style={{
                    width: "calc(100% - 60px)",
                    overflow: "hidden",
                    margin: "0 auto",
                    marginBottom: "12px",
                }}
            >
                {carouselFragment}
            </GridContainerMobile>
            <ScrollContainerMobile>

                <SwitchTransition mode={'out-in'}>
                    <CSSTransition
                        key={selectedTab}
                        classNames="animate">
                        <ScrollContainerContentMobile style={{
                            width: "100%",
                            transition: "all .2s ease-in",
                        }}>
                            {map([1, 2, 3, 4], (linkItem, index) => {
                                return (
                                    <PLLinksBtnMobile
                                        key={index}
                                        linkId={0}
                                        selectLink={() => { }}
                                        className={'stripe links-stripe-mobile'}
                                        linkName={''}
                                        galleryName={''}
                                    />
                                );
                            })}
                        </ScrollContainerContentMobile>
                    </CSSTransition>
                </SwitchTransition>
            </ScrollContainerMobile>
        </CardSectionMobile>
    );
};

