import { useHistory } from "react-router";
import styled from "styled-components";
import { LogoTitleSection, LogoTitle } from "./LogoTitles";

const LinksHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px 40px;
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
`;
const RightSection = styled.div``;
const LandingPageHeader = ({ isLoggedIn }) => {
  const history = useHistory();
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
      <MiddleSection></MiddleSection>
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
