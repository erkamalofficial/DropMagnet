import styled from "styled-components";
import LinksBtn from "../../components/blocks/links-btn";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";

const WalletWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const WalletLinksWrapper = styled.div`
  background-color: rgb(18, 18, 18);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-weight: 700;
  .rowItem {
    margin-bottom: 1rem;
    padding: 0 10px;
  }
  .walletHeader {
    background: rgba(31, 31, 31, 1);
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
const TagSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  .tags {
    background-color: var(--darkGray);
    border-radius: 24px;
    line-height: 30px;
    padding: 0px 30px;
    border: 1px solid #707070;
  }
  .tag-active {
    background-color: rgba(255, 204, 67, 1);
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
`;

const WalletLinks = (props) => {
  return (
    <WalletWrapper>
      <FixedHeader {...props} />

      <WalletLinksWrapper>
        <div className="rowItem walletHeader">
          <div className="title"> Ethereum Logo </div>
          <div> 0xda2ed8e7776d54495cc7a1a5d5…… </div>
        </div>

        <div className="rowItem">
          {" "}
          Assign a call-to-action URL to This Gallery
        </div>
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
      </WalletLinksWrapper>
    </WalletWrapper>
  );
};

export default WalletLinks;
