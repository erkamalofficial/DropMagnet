import React from "react";
import Slider from "./Slider";
import "../../slider.scss"
import ArtGalleryCard from "../../components/card/card";
import {ConatinerCol, ContainerRow, ContainerWithBackground} from "../../styled-component/container";
import {StyledTab, StyledTabs, StyledTabList, StyledTabPanel} from "../../styled-component/tabs";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    transition: all 150ms ease;
    &:hover{
    transition: all 150ms ease;
    transform: scale(1.05)
    }
`;

const SliderPageWrapper = styled.div`
  background: #1a1a1a;
`

const SliderPage = () => {
    const tab1List = Array.from(Array(16).keys());
    const tab2List = Array.from(Array(8).keys());
    const tab3List = Array.from(Array(11).keys());
    return (
        <SliderPageWrapper>
            <Slider/>
            <ContainerWithBackground >
                <StyledTabs>
                    <StyledTabList>
                        <StyledTab>Latest Activity 🔥</StyledTab>
                        <StyledTab>Most Followed ❤️</StyledTab>
                        <StyledTab>Feeling lucky 🍀</StyledTab>
                    </StyledTabList>

                    <StyledTabPanel>
                        <ContainerRow>
                            {
                                tab1List.map((card, index) => {
                                    return (
                                        <ConatinerCol key={index}>
                                            <StyledNavLink to={"/drop-magnet/artgallery.link/verticaly"}>
                                                <ArtGalleryCard />
                                            </StyledNavLink>
                                        </ConatinerCol>
                                    )
                                })
                            }
                        </ContainerRow>
                    </StyledTabPanel>
                    <StyledTabPanel>
                        <ContainerRow>
                            {
                                tab2List.map((card, index) => {
                                    return (
                                        <ConatinerCol key={index}>
                                            <StyledNavLink to={"/drop-magnet/artgallery.link/verticaly"}>
                                                <ArtGalleryCard />
                                            </StyledNavLink>
                                        </ConatinerCol>
                                    )
                                })
                            }
                        </ContainerRow>
                    </StyledTabPanel>
                    <StyledTabPanel>
                        <ContainerRow>
                            {
                                tab3List.map((card, index) => {
                                    return (
                                        <ConatinerCol key={index}>
                                            <StyledNavLink to={"/drop-magnet/artgallery.link/verticaly"}>
                                                <ArtGalleryCard />
                                            </StyledNavLink>
                                        </ConatinerCol>
                                    )
                                })
                            }
                        </ContainerRow>
                    </StyledTabPanel>
                </StyledTabs>

            </ContainerWithBackground>
        </SliderPageWrapper>
    )
}

export default SliderPage