import React from 'react'
import FadeIn from 'react-fade-in'
import { useHistory } from 'react-router-dom'
import HeaderBar from '../../components/elements/HeaderBar/HeaderBar'
import LabeledButton from '../../components/elements/LabeledButton/LabeledButton'
import TextField from '../../components/elements/TextField/TextField'
import { FormBtn } from '../register/FormComponents'
import "./subscription.css"
import styled from "styled-components";
import Plan from './Plan'
import Subscriptions from "./subscriptions.json"

const SubscriptionPage = (props) => {

    console.log(Subscriptions)

    const history = useHistory()

    function openHome() {
        history.push("/");
    }

    return (
        <div>
            <FadeIn delay={200}>
                <div className="fixed-container">
                    <HeaderBar
                        openHome={() => openHome()}
                        userLoggedIn={props.userLoggedIn}
                        userImage={props.userImage}
                        reload={props.reload}
                        userDetails={props.userDetails}
                    />
                </div>
            </FadeIn>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '56px 16px 128px 16px'
            }}>
                <div className="plans-container">
                    {Subscriptions.map(p => (
                        <Plan plan={p}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage
