import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Tabs from "../Tabs";
import { LogoTitleSection, LogoTitle } from "./LogoTitles";


const TAB_LIST = ["Drop Swipe","NFT Galleries","SmartURLs"];

const LinksHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px 40px;
  flex-wrap: wrap;
`;

const LogoSection = styled.div`
  display: flex;
  max-height: 42px;
`;
const BrandLogo = styled.img`
  height: auto;
  width: auto;
  max-height: 42px;
  cursor: pointer;
`;

const MiddleSection = styled.div`
  align-self: flex-end;
  @media(max-width: 576px){
    order: 3;
    margin-top: 20px;
    flex-basis: 100%;
  }
`;
const RightSection = styled.div``;
const LandingPageHeader = ({ isLoggedIn }) => {
  const history = useHistory();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <LinksHeaderWrapper>
      <LogoSection>
        <BrandLogo
          onClick={() => {
            window.location.href = "/home";
          }}
          src="./drop_logo.png"
          alt="drop magnet"
        />
        <LogoTitleSection>
          <LogoTitle>drop magnet</LogoTitle>
          <div>#ThreeTheWeb</div>
        </LogoTitleSection>
      </LogoSection>
      <MiddleSection>
        <Tabs tabs={TAB_LIST} activeTabIndex={activeTabIndex} onChangeTab={(index)=>setActiveTabIndex(index)}  />
      </MiddleSection>
      <RightSection>
        {!isLoggedIn ? (
          <>
            <button className={"blank-button"} onClick={()=>history.push('/login')}>Login</button>
            <button className={"blank-button"} onClick={()=>history.push('/signup')}>Register</button>
          </>
        ) : (
          <button className={"blank-button"} onClick={()=>history.push('/home')}>Home</button>
        )}
      </RightSection>
    </LinksHeaderWrapper>
  );
};

export default LandingPageHeader;
