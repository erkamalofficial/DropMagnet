import styled from "styled-components";
import { LogoTitleSection,LogoTitle } from "./LogoTitles";

const LinksHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 40px;
`;
const WhitePageLabel = styled.div`
  background: linear-gradient(to left, #ac43f1, #6620de);
  border-radius: 40px;
  display: inline-block;
  font-size: 20px;
  padding: 1px;
  text-decoration: none;
  max-height: 42px;

  span {
    background-color: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    padding: 10px 24px;
    border-radius: 40px;
    font-size: var(--font-size-s);
    height: 100%;
    @media (max-width: 320px) {
      padding: 5px 12px;
      font-size: 12px;
      line-height: 26px;
      display: inline-block;
    }
  }
`;
const LogoSection = styled.div`
  display: flex;
`;
const BrandLogo = styled.img`
  height: auto;
  width: 36px;
  cursor: pointer;
`;
const LinksHeader = (props) => {
  return (
    <LinksHeaderWrapper>
      <LogoSection>
        <BrandLogo onClick={()=>{
          window.location.href = '/home'
        }} src="./drop_icon.png" alt="drop magnet" />
        <LogoTitleSection>
          <LogoTitle>drop magnet</LogoTitle>
          <div>#ThreeTheWeb</div>
        </LogoTitleSection>
      </LogoSection>
      <WhitePageLabel>
        <span>White Paper</span>
      </WhitePageLabel>
    </LinksHeaderWrapper>
  );
};

export default LinksHeader;
