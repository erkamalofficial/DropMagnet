import React from "react";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripePaymentButton = styled.div`
  display: flex;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 50%);
  border-radius: 23px;
  background-color: rgba(23, 23, 24, 0.88);
  flex-direction: row;
  width: 100%;
  line-height: 48px;
  justify-content: space-between;
  margin-bottom: 18px;
  cursor: pointer;
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

const StripeCheckoutButton = ({ price, idToken }) => {
  const priceForStripe = price * 100;

  const publishableKey =
    "pk_test_51IuOlYBDufd2b5OuLFab7yOLhWiYZwxDBsHZTLP0iT5EkkfmRfC5B2Qd4d8GOM9A8y5MqypsXxn6lqHiAQqfxu7T00FxleYWdK";

  const onToken = (token) => {
    axios({
      // url: "http://localhost:8080/payments",
      url: "https://drop-backend-rnd454q4pa-ew.a.run.app/payments",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((response) => {
        console.log("succesful payment", response);
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Dropmagnet"
      billingAddress
      shippingAddress
      image="./drop_icon.png"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      token={onToken}
      panelLabel="Pay Now"
      stripeKey={publishableKey}
    >
      <StripePaymentButton>
        <img src="./stripe.svg" alt="Stripe" />
        <span className="paymentTitle">Stripe</span>
        <span>.</span>
      </StripePaymentButton>
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;
