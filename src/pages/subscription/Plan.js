import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { useAuth } from "../../contexts/FirebaseAuthContext"
import * as DropMagnetAPI from "../../DropMagnetAPI"
import Spinner from '../../components/blocks/spinner'
import GlossyButton from '../../components/elements/GlossyButton/GlossyButton';

const Plan = (props) => {

    const { plan, purchased, others, borders } = props
    const { currentUser } = useAuth()

    const onToken = async (token, address) => {
        const res = await axios.post('https://drop-backend-rnd454q4pa-ew.a.run.app/payments', {
            token,
            amount: Math.round(priceVal * 100)
        })

        if (res.data['success'] && res.data['success'].status === 'succeeded') {
            props.setLoader(true)
            currentUser.getIdToken(false).then(function (idToken) {
                DropMagnetAPI.updateSubscription("subscription", plan.name.toLowerCase(), idToken)
                    .then((res) =>
                        DropMagnetAPI.getUserProfile(currentUser.uid, idToken).then(function (response) {
                            if (response.status === "error") {
                            } else {
                                localStorage.setItem('userDetails', JSON.stringify(response));
                                props.setLoader(false)
                                props.setSubscription(plan.name.toLowerCase())
                            }
                        })
                    );
            });
        }
    }

    const priceVal = Number(plan.price.split(' ')[0].substr(1))

    const handleClick = () => {
        props.setLoader(true)
        currentUser.getIdToken(false).then(function (idToken) {
            DropMagnetAPI.updateSubscription("subscription", plan.name.toLowerCase(), idToken)
                .then((res) => {
                    DropMagnetAPI.getUserProfile(currentUser.uid, idToken).then(function (response) {
                        if (response.status === "error") {
                        } else {
                            localStorage.setItem('userDetails', JSON.stringify(response));
                            props.setLoader(false)
                            props.setSubscription(plan.name.toLowerCase())
                        }
                    })

                });
        });

    }

    return (
        <div className="plan-card">
            {props.loader && (
                <div className="loader">
                    <div className="cnt">
                        <Spinner />
                    </div>
                    Subscribing...
                </div>
            )}
            <div className="plan-card-top">
                <div>
                    <p className="plan-name">{plan.name}</p>
                    <p className="plan-price">{plan.price}</p>
                </div>

                {priceVal && !others.includes(plan.name.toLowerCase()) ? (
                    <StripeCheckout
                        token={onToken}
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        billingAddress
                        shippingAddress
                        amount={priceVal ? Math.round(priceVal * 100) : 0}
                        name={`${plan.name} Subscription`}
                    >
                        <GlossyButton
                            label={`${purchased ? 'Subscribed': 'Purchase'}`}
                            btnStyle={{
                                padding: '10px 14px 10px 14px',
                                borderRadius: '27px',
                                fontSixe: '16px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                fontWeight: '700'
                            }}
                            borderStyle={{
                                pos: '-4px',
                                borderRadius: '27px',
                                border: '4px',
                                grd1: '#242424',
                                grd2: '#242424',
                                grd3: `${borders.grd3}`,
                                grd4: `${borders.grd4}`
                            }}
                            lableStyle={{
                                marginBottom: '-4px'
                            }}
                        ></GlossyButton>
                    </StripeCheckout>
                ) : (
                    <div onClick={handleClick}>
                        <GlossyButton
                            label={`${purchased ? 'Subscribed'
                                : others.includes(plan.name.toLowerCase()) ? 'Activate'
                                    : 'Purchase'}`}
                            btnStyle={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '27px',
                                fontSixe: '16px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                fontWeight: '700'
                            }}
                            borderStyle={{
                                pos: '-4px',
                                borderRadius: '27px',
                                border: '4px',
                                grd1: '#242424',
                                grd2: '#242424',
                                grd3: `${borders.grd3}`,
                                grd4: `${borders.grd4}`
                            }}
                            lableStyle={{
                                marginBottom: '-4px'
                            }}
                        ></GlossyButton>
                    </div>


                )}

            </div>
            <p className="short-dese">{plan.shortDesc}</p>
            <p className="long-desc">{plan.longDesc}</p>
        </div>


    )
}

export default Plan
