import styled from "styled-components";
import WalletHeader from "../../components/blocks/wallet-header";
import ConnectAnotherWalletBtn from "../../components/blocks/connect-another-wallet-btn";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";

const WalletWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;
const ConnectedWalletsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .nftHeader {
    padding: 16px;
    background: rgba(31, 31, 31, 1);
    display: flex;
    width: 100%;
    line-height: 70px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
`;
const NftDisplayBottomSection = styled.div`
  background-color: rgb(18, 18, 18);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  padding: 16px;
`;

const ConnectedWalletTitle = styled.div`
  line-height: 24px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 32px;
`;

const WalletSection = styled.div`
  background-color: var(--grayBlack);
  border-radius: 8px;
  cursor: pointer;
  line-height: 32px;
  width: 320px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ConnectWalletMsg = styled.div`
  font-size: 16px;
`;
const ConnectedWallets = (props) => {
  return (
    <WalletWrapper>
      <FixedHeader {...props} />
      <ConnectedWalletsWrapper>
        <WalletHeader />
        <NftDisplayBottomSection>
          <ConnectedWalletTitle>Connected Wallets</ConnectedWalletTitle>

          <WalletSection>
            <div>Ethereum</div>
            <div>0xda2ed8e7776d54495cc7a1a5d5</div>
            <div>Edit</div>
          </WalletSection>
          <WalletSection>
            <div>Ethereum</div>
            <div>0xda2ed8e7776d54495cc7a1a5d5</div>
            <div>Edit</div>
          </WalletSection>
          <ConnectAnotherWalletBtn style={{ marginBottom: "16px" }} />
          <ConnectWalletMsg>You Can Connect Up To 10!</ConnectWalletMsg>
        </NftDisplayBottomSection>
      </ConnectedWalletsWrapper>
    </WalletWrapper>
  );
};

export default ConnectedWallets;
