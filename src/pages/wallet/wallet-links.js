
import styled from 'styled-components';
import LinksBtn from '../../components/blocks/links-btn';

const WalletWrapper = styled.div`
    max-width: 600px;
    background-color: rgb(18, 18, 18);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-weight: 700;
    .rowItem {
        margin-bottom: 1rem;
        padding: 0 10px;
    }
    .walletHeader {
        background: rgba(31,31,31,1.0);
        display: flex;
        flex-direction: column;
        width: 100%;
        line-height: 70px;
        align-items: center;
        box-sizing: border-box;
        .title {
            font-size: 24px;
            font-weight: 700;
        }
    }
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
    .tags {
        background-color: var(--shark);
        border-radius: 24px;
        line-height: 30px;
        padding: 0px 30px;
        border: 1px solid #707070;
    }
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

const WalletLinks = () => {
    return (
        <WalletWrapper>
            <div className="rowItem walletHeader">
                <div className="title"> Ethereum Logo </div>
                <div> 0xda2ed8e7776d54495cc7a1a5d5…… </div>
            </div>

            <div className="rowItem"> Assign a call-to-action URL to This Gallery</div>
            <div className="rowItem">(Filter By Category)</div>
            <TagSection className="rowItem">
                <div className="tags">Fashion</div>
                <div className="tags">Art</div>
                <div className="tags tag-active">Music</div>
                <div className="tags">Sports</div>
                <div className="tags">Meme</div>
                <div className="tags">Other</div>
            </TagSection>
            <LinkSection className="rowItem">
                <LinksBtn />
                <LinksBtn />
                <LinksBtn className="button-active" />
                <LinksBtn />
                <LinksBtn />
                <LinksBtn />
            </LinkSection>
        </WalletWrapper>
    )

}

export default WalletLinks;
