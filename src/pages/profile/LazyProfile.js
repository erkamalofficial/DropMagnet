import React from "react";
import styled from "styled-components";
import Tabs from "../home/tabs";
import { tabList } from "../../constants";
import "./LazyProfile.css"
import FadeIn from 'react-fade-in';

const TabContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ul {
    margin-bottom: 0;
  }
`;

const FooterContainer = styled.div`
  margin-top: 16px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  backdrop-filter: blur(50px);
  background-color: #1a1a1a66;
  background-image: none
  @media(max-width: 576px){
    width: calc(100vw-24px);
  }
`;

export default function LazyProfile(props) {

    return (
        <>
            <div>
                <div className="profile-container loader">
                    <FadeIn delay={400}>
                        <div className="profile-detail-container loader"
                            style={{ display: `${false ? "none" : "flex"}` }}>

                            <div className="acc-profile-pic">
                                <div className="basic round-profile-basic"></div>
                            </div>

                            <div className="basic title-basic"></div>
                            <div className="basic username-basic"></div>
                            <div style={{ display: "flex", paddingBottom: "16px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        paddingRight: "24px",
                                        cursor: "pointer",
                                    }}>
                                    <div className="basic handle-basic" />
                                </div>
                                <div style={{ display: "flex", cursor: "pointer" }}>
                                    <div className="basic handle-basic" />
                                </div>
                            </div>
                            <div className="basic bio-basic">
                            </div>
                        </div>
                    </FadeIn>
                </div>

                <div
                    style={{
                        margin: "0 auto",
                        maxWidth: "600px",
                    }}
                >
                    <FooterContainer>
                        <FadeIn delay={1100} childClassName="child-component">
                            <div className="profile-button-option-holder">
                                <div className={"profile-button-option"}>My Drops</div>
                                <div className={"profile-button-option"}>Saved</div>
                            </div>
                        </FadeIn>
                    </FooterContainer>

                    <FadeIn delay={800}>
                        <TabContainer>
                            <Tabs activeTabIndex={0}
                                handleActiveTabIndex={(index) => { }}
                                tabList={tabList} />
                        </TabContainer>
                    </FadeIn>

                    <FadeIn delay={1000}>
                        <div className="drop-list">
                            {[1, 2, 3].map(d => (
                                <div key={d} className="landing-cell">
                                    <div className="drop-inner">
                                        <div className="drop-details">
                                            <div className="drop-header" >
                                                <div className="basic small-round-profile-basic"></div>
                                                <div className="basic drop-artist-basic" ></div>
                                            </div>
                                            <div className="basic drop-title-basic"></div>
                                            <div className="basic date-basic"></div>
                                            <div className="drop-footer">
                                                <p2 className="basic tag-basic"></p2>
                                                <p2 className="basic tag-basic"></p2>
                                                <p2 className="basic tag-basic"></p2>
                                            </div>
                                        </div>
                                        <div className="basic drop-image-basic" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

            </div>
        </>
    );
}
