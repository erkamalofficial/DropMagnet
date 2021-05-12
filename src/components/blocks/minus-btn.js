import styled from "styled-components";

const MinusBtn = styled.div`
  min-width: 173px;
  line-height: 54px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%), inset 0 -3px 0 var(--lightBlue);
  border-radius: 8px 0px 0px 8px;
  background-image: linear-gradient(180deg, #2e2e2e, #1e1e1e);
  font-size: 48px;
  color: var(--lightBlue);
  cursor: pointer;
  text-align: center;
  img {
    width: 36px;
    height: 6px;
    margin-bottom: 12px;
  }
  @media (max-width: 600px) {
    min-width: 150px;
  }
`;
export default function (props) {
  return <MinusBtn {...props} />;
}
