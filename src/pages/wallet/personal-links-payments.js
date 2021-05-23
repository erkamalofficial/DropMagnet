import styled from "styled-components";
import LinksWrapper from "../../components/wrappers/LinksPageWrapper";

const PaymentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TotalPriceSectionGradient = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: inset 0 1px 3px rgb(152 152 152 / 50%);
  background: linear-gradient(to left, #ac43f1, #6620de);
  border-radius: 8px;
  padding: 1px;
  margin-bottom: 32px;
  color: #fafafa;
  font-size: 24px;
  font-weight: 700;
`;
const TotalPriceSection = styled.div`
  background-color: rgba(0, 0, 0, 0.88);
  display: block;
  padding: 14px 16px;
  border-radius: 8px;
  width: 100%;

  .price {
    color: #b66ef7;
  }
`;
const PaymentOptionText = styled.div`
  color: #eaeaea;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;
const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 8px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);

  opacity: 0.8;
  margin: 0 18px 16px;
  padding: 24px 16px;
  @media (max-width: 340px) {
    margin: 8px;
    padding: 8px 0;
  }
`;

const PaymentOptionSection = styled.div`
  display: flex;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 50%);
  border-radius: 23px;
  background-color: rgba(23, 23, 24, 0.88);
  flex-direction: row;
  width: 100%;
  line-height: 48px;
  justify-content: space-between;
  margin-bottom: 18px;
  img {
    padding: 8px 0 8px 16px;
  }
  .paymentTitle {
    color: #fafafa;
    font-size: 18px;
    font-weight: 700;
  }
  > :last-child {
    visibility: hidden;
    width: 30px;
  }
`;
const TermsText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 80px;
  .terms {
    color: #b66ef7;
  }
`;
const ClaimAllUrls = styled.div`
  color: #eaeaea;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;
const BuyAllBtn = styled.div`
  cursor: pointer;

  line-height: 44px;
  box-shadow: 0 3px 25px rgba(57, 30, 125, 0.2), inset 0 -2px 0 #610bc8;
  border-radius: 8px 8px 0;
  border: 1px solid #610bc8;
  background-color: #152230;
  text-align: center;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  width: 100%;
`;
const BackBtn = styled.div`
  cursor: pointer;
  color: #eaeaea;
  font-size: 16px;
  font-weight: 700;
`;
const PersonalLinksPayments = () => {
  return (
    <LinksWrapper>
      <PaymentsWrapper>
        <TotalPriceSectionGradient>
          <TotalPriceSection>
            <span>Total Price: </span>
            <span className="price">$4 per year</span>
          </TotalPriceSection>
        </TotalPriceSectionGradient>
        <PaymentOptionText>
          Select one of the payment options below
        </PaymentOptionText>
        <CardSection>
          <PaymentOptionSection>
            <img src="./stripe.svg" alt="Stripe" />
            <span className="paymentTitle">Stripe</span>
            <span>.</span>
          </PaymentOptionSection>
          <PaymentOptionSection>
            <img src="./wyre.svg" alt="Wyre" />
            <span className="paymentTitle">Wyre</span>
            <span>.</span>
          </PaymentOptionSection>
          <PaymentOptionSection>
            <img src="./coinbase.svg" alt="Coinbase" />
            <span className="paymentTitle">Coinbase</span>
            <span>.</span>
          </PaymentOptionSection>
        </CardSection>
        <TermsText>
          <span>Read our </span>
          <span className="terms"> Terms &amp; Conditions </span>
        </TermsText>
        <ClaimAllUrls>Claim all the URLs/You</ClaimAllUrls>
        <BuyAllBtn>Buy All For $99</BuyAllBtn>
        <BackBtn>Back</BackBtn>
      </PaymentsWrapper>
    </LinksWrapper>
  );
};

export default PersonalLinksPayments;
