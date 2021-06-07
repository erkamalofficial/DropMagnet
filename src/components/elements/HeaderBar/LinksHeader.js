import styled from "styled-components";

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

  span {
    background-color: rgba(0, 0, 0, 0.88);
    display: block;
    padding: 10px 24px;
    border-radius: 40px;
    font-size: var(--font-size-s);
    @media (max-width: 320px) {
      padding: 5px 12px;
      font-size: 12px;
      line-height: 24px;
      display: inline-block;
    }
  }
`;
const LogoSection = styled.div`
  display: flex;
`;
const BrandLogo = styled.img`
  height: 36px;
  width: 36px;
  cursor: pointer;
`;
const LogoTitleSection = styled.div`
  padding-left: 20px;
`;
const LogoTitle = styled.div`
  font-family: var(--font-bdcols);
  font-weight: 400;
  font-size: var(--font-size-l);
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
