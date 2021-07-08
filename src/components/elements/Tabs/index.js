import React from "react";
import styled from "styled-components";
import useViewport from "../../../pages/NewLandingPage/useViewport";

const WIDTH = 128;
const MOB_WIDTH = 126;
const TabContainer = styled.div`
  margin:10px auto;
  display: flex;
  align-items: center;
  border-radius: 22px;
  border: 1px solid #000000;
  position: relative;
  background-image: linear-gradient(
    180deg,
    rgba(24, 24, 24, 0.39) 0%,
    rgba(16, 16, 16, 0.39) 100%
  );
`;

const Tab = styled.button`
  width: ${WIDTH}px;
  text-align: center;
  color: #eaeaea;
  font-family: "Quicksand";
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  text-overflow: ellipsis;
  background: inherit;
  position: relative;
  z-index: 10;
  padding: 8px 4px;
  @media(max-width: 576px){
    width: ${MOB_WIDTH}px;
    font-size: 15px;
    
  }
`;

const ActiveTab = styled.div`
  width: ${WIDTH}px;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: inset 0 3px 4px #000000;
  border-radius: 18px;
  transition: transform .3s 0ms ease;
  border: 2px solid transparent;
  background-image: linear-gradient(#000000, #000000), radial-gradient(circle at top left,#ac43f1,#6620de);
  background-origin: border-box;
  background-clip: content-box, border-box;
  @media(max-width: 576px){
    width: ${MOB_WIDTH}px;
  }
`;

export default function Tabs({ tabs,activeTabIndex ,onChangeTab }) {
  const {viewportWidth} = useViewport();
  const breakpoint = 576;
  return (
    <TabContainer style={{width: viewportWidth <= breakpoint ? MOB_WIDTH* tabs.length: WIDTH* tabs.length}}>
      <ActiveTab style={{transform: 'translateX('+(activeTabIndex)*100+ "%"+")"}} />
      {tabs.map((tab, index) => {
        return <Tab  onClick={() => onChangeTab(index)}>{tab}</Tab>;
      })}
    </TabContainer>
  );
}
