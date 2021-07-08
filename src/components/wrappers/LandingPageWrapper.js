import styled from "styled-components";
import LandingPageHeader from "../elements/HeaderBar/LandingPageHeader";
const LinksPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  @media (max-width: 576px){
    margin: 0;
  }
`;
const LandingPageWrapper = ({ children, isLoggedIn , ...rest }) => {
  return (
    <LinksPage {...rest}>
      <LandingPageHeader isLoggedIn={isLoggedIn} />
      {children}
    </LinksPage>
  );
};

export default LandingPageWrapper;
