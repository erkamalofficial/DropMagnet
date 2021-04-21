
import styled from 'styled-components';
import LinksBtn from '../../components/blocks/links-btn';
import ConnectWalletBtn from '../../components/blocks/connect-wallet-btn';
import ColorText from '../../components/blocks/color-text';
import WalletHeader from '../../components/blocks/wallet-header';

const NftDisplayWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
    color: #fff;
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
const DisplayNftTitle = styled.div`
    color: var(--grayWhite);
    font-size: 33px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    margin-bottom: 32px;
    div {
        margin-bottom: 6px;
    }
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
const TldTagLine = styled.div`
    color: var(--grayWhite);
    font-size: 21px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    margin-bottom: 32px;
    div {
        margin-bottom: 3px;
    }
`;

const NftDisplayPage = () => {
    return (
        <NftDisplayWrapper>
            <WalletHeader />
            <NftDisplayBottomSection>
                <DisplayNftTitle> Display Your NFTs </DisplayNftTitle>
                <ColorText />
                <DisplayNftSubtitle>
                    <div>And share with</div>
                    <div>custom subdomains</div>
                </DisplayNftSubtitle>
                <ConnectWalletBtn style={{ marginBottom: '16px' }}>Connect Wallet</ConnectWalletBtn>
                <TldTagLine>
                    <div>To create your unique</div>
                    <div>custom domain from</div>
                    <div>dozens of gTLDs in</div>
                    <div>the Drop Magnet </div>
                    <div>ecosystem.</div>
                </TldTagLine>
                <TldTitle>30+ gTLDs to choose from!</TldTitle>
                <LinkSection>
                    <LinksBtn />
                    <LinksBtn />
                    <LinksBtn className="button-active" />
                    <LinksBtn />
                    <LinksBtn />
                    <LinksBtn />
                </LinkSection>
            </NftDisplayBottomSection>
        </NftDisplayWrapper>
    )

}

export default NftDisplayPage;
