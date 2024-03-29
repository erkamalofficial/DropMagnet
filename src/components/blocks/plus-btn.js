import styled from "styled-components";

const PlusBtnWrapper = styled.div`
  min-width: 174px;
  line-height: 59px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%), inset 0 -3px 0 var(--purple300);
  border-radius: 0 8px 8px 0;
  background-image: linear-gradient(180deg, #2e2e2e, #1e1e1e);
  font-size: 48px;
  color: var(--purple300);
  cursor: pointer;
  text-align: center;
  img {
    width: 36px;
    height: 32px;
  }
  @media (max-width: 340px) {
    min-width: 135px;
  }
`;
const PlusBtn = (props) => {
  return <PlusBtnWrapper {...props} />;
};
export default PlusBtn;
