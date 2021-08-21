import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const Plan = (props) => {

    const { plan } = props

    const onToken = (token, address) => {
        console.log(token, address)
    }

    const priceVal = Number(plan.price.split(' ')[0].substr(1))
    console.log(priceVal)

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
                        stripeKey="pk_test_51Hr13fE7BvSkBO4prE35EeVzyGVKfQCPfpfcOZZkSLfa4jfONQeEOrd9A4wFIERlRXuVpBu3NYVm1YwCrFfY0gs400dAaCrTp0"
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
