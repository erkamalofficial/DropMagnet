import styled from "styled-components";
import LinksHeader from "../../components/elements/HeaderBar/LinksHeader";
const LinksPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;
const LinksPageWrapper = ({ children }) => {
  return (
    <LinksPage>
      <LinksHeader />
      {children}
    </LinksPage>
  );
};

export default LinksPageWrapper;