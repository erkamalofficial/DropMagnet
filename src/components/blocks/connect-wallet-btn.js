import styled from "styled-components";
const ConnectWalletBtnWapper = styled.div`
  border-radius: 19px;
  background-color: var(--white);
  color: var(--lightBlack);

  font-size: 26px;
  font-weight: 600;
  font-style: normal;
  margin-left: 16px;
  padding: 8px 24px;
  line-height: 40px;
  cursor: pointer;
`;
// font-family: Quicksand;
const ConnectWalletBtn = (props) => <ConnectWalletBtnWapper {...props} />;

export default ConnectWalletBtn;
