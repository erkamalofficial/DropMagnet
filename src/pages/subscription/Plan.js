import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const Plan = (props) => {

    const { plan } = props

    const onToken = async(token, address) => {
        console.log(token, address)
        const res = await axios.post('https://drop-backend-rnd454q4pa-ew.a.run.app/payments', {
            token,
            amount: priceVal*100
        })
        console.log(res)
    }

    const priceVal = Number(plan.price.split(' ')[0].substr(1))

    return (
        <div className="plan-card">
            <div className="plan-card-top">
                <div>
                    <p className="plan-name">{plan.name}</p>
                    <p className="plan-price">{plan.price}</p>
                </div>

                {priceVal ? (
                    <StripeCheckout
                        token={onToken}
                        stripeKey={process.env.REACT_STRIPE_KEY}
                        billingAddress
                        shippingAddress
                        amount={priceVal ? priceVal * 100 : 0}
                        name={`${plan.name} Subscription`}
                    >
                        <button className="purchase-btn">
                            <span>Purchase</span>
                        </button>
                    </StripeCheckout>
                ) : (
                    <button className="purchase-btn">
                        <span>Purchase</span>
                    </button>
                )}

            </div>
            <p className="short-dese">{plan.shortDesc}</p>
            <p className="long-desc">{plan.longDesc}</p>
        </div>


    )
}

export default Plan
