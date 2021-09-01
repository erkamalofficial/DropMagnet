import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import {useAuth} from "../../contexts/FirebaseAuthContext"
import * as DropMagnetAPI from "../../DropMagnetAPI"

const Plan = (props) => {

    const { plan, purchased } = props
    const {currentUser} = useAuth()

    const onToken = async (token, address) => {
        const res = await axios.post('https://drop-backend-rnd454q4pa-ew.a.run.app/payments', {
            token,
            amount: Math.round(priceVal * 100)
        })


        console.log(res)

        if (res.data['success'] && res.data['success'].status === 'succeeded') {
            currentUser.getIdToken(false).then(function (idToken) {
                DropMagnetAPI.updateUserDetails("subscription", plan.name.toLowerCase(), idToken)
                .then((res) =>
                    window.location.reload()
                );
            });
        }

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
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        billingAddress
                        shippingAddress
                        amount={priceVal ? Math.round(priceVal * 100) : 0}
                        name={`${plan.name} Subscription`}
                    >
                        <button className="purchase-btn">
                            {purchased ? <span>Subscribed</span>
                                : <span>Purchase</span>}
                        </button>
                    </StripeCheckout>
                ) : (
                    <button className="purchase-btn">
                        {purchased ? <span>Subscribed</span>
                            : <span>Purchase</span>}
                    </button>
                )}

            </div>
            <p className="short-dese">{plan.shortDesc}</p>
            <p className="long-desc">{plan.longDesc}</p>
        </div>


    )
}

export default Plan
