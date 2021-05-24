import styled from "styled-components";
import LinksHeader from "../../components/elements/HeaderBar/LinksHeader";
const LinksPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;
const LinksPageWrapper = ({ children, ...rest }) => {
  return (
    <LinksPage {...rest}>
      <LinksHeader />
      {children}
    </LinksPage>
  );
};

export default LinksPageWrapper;
