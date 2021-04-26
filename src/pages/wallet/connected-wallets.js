
import styled from 'styled-components';
import LinksBtn from '../../components/blocks/links-btn';
import ConnectWalletBtn from '../../components/blocks/connect-wallet-btn';
import ColorText from '../../components/blocks/color-text';
import WalletHeader from '../../components/blocks/wallet-header';
import ConnectAnotherWalletBtn from '../../components/blocks/connect-another-wallet-btn';

const ConnectedWalletsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .nftHeader {
        padding: 16px;
        background: rgba(31,31,31,1.0);
        display: flex;
        width: 100%;
        line-height: 70px;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
    }
`;
const NftDisplayBottomSection = styled.div`
    max-width: 600px;
    background-color: rgb(18, 18, 18);
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    padding: 16px;
`;
const WalletContentSection = styled.div`
    background: rgb(18, 18, 18);
`;
const TagSection = styled.div`
    display: flex;
    width: 100%;
    @media (min-width: 600px) {
        width: 62%;
    }
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1rem;
    box-sizing: border-box;
 
    .tag-active {
        background-color: rgba(255,204,67,1.0);
    }
`;

const LinkSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;  
    height: 80vh;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
`;
const TldTitle = styled.div`
    color: rgba(242,214,0,1.0);
    margin-bottom: 32px;
`;
const ConnectedWalletTitle = styled.div`
    line-height: 24px;
    text-align: center;
    font-size: 24px;
    margin-bottom: 32px;
`;
const DisplayNftSubtitle = styled.div`
    color: var(--grayWhite);
    font-size: 29px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    margin-bottom: 32px;
    div {
        margin-bottom: 6px;
    }
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
const Circle = styled.div`
    height: 25px;
    width: 25px;
    background-color: var(--grayBlue);
    border-radius: 50%;
    display: inline-block;
`;
const ConnectWalletMsg = styled.div`
    font-size: 16px;
`;
const ConnectedWallets = () => {
    return (
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
                <ConnectAnotherWalletBtn style={{ marginBottom: '16px' }} />
                <ConnectWalletMsg>You Can Connect Up To 10!</ConnectWalletMsg>
            </NftDisplayBottomSection>
        </ConnectedWalletsWrapper>
    )

}

export default ConnectedWallets;
