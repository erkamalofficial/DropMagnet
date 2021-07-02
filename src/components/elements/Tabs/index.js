import React from "react";
import styled from "styled-components";

const WIDTH = 128;
const MOB_WIDTH = 110;
const TabContainer = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  cursor: pointer;
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
  padding: 4px 10px;
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
  top: 0;
  left: 0;
  box-shadow: inset 0 3px 4px #000000;
  border-radius: 18px;
  transition: all .4s ease-in;
  border: 2px solid transparent;
  background-image: linear-gradient(#000000, #000000), radial-gradient(circle at top left,#ac43f1,#6620de);
  background-origin: border-box;
  background-clip: content-box, border-box;
  @media(max-width: 576px){
    width: ${MOB_WIDTH}px;
  }
`;

export default function Tabs({ tabs,activeTabIndex ,onChangeTab }) {
  return (
    <TabContainer style={{width: "auto"}}>
      <ActiveTab style={{left: (activeTabIndex/tabs.length)*100+ "%"}} />
      {tabs.map((tab, index) => {
        return <Tab onClick={() => onChangeTab(index)}>{tab}</Tab>;
      })}
    </TabContainer>
  );
}
