import React, { useEffect, useState } from 'react'
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

    const borderstyles = [
        {
            grd3: '#B283FF',
            grd4: '#B283FF'
        },
        {
            grd3: '#7000FE',
            grd4: '#7000FE'
        },
        {
            grd3: '#478CE0',
            grd4: '#478CE0'
        },
        {
            grd3: '#6C00FF',
            grd4: '#FF00C7'
        }
    ]

    const user = JSON.parse(localStorage.getItem('userDetails'))
    const [subscription, setSubscription] = useState(null)
    const [others, setOthers] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if(user){
            setSubscription(user.subscription)
            setOthers(user.prevSubs ? user.prevSubs : [])
        }
    }, [user.subscription])

    const history = useHistory()

    function openHome() {
        history.push("/");
    }

    useEffect(() => {
        // First rendering
        if (props.reload) {
            sessionStorage.setItem('headerLoad', 'true')
        }
        else if (!props.reload && sessionStorage.headerLoad) {
            sessionStorage.removeItem('headerLoad')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            props.setReload(false)
        }, 500);
    }, [])

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '56px 16px 128px 16px'
            }}>
                <div className="plans-container">
                    {Subscriptions.map((p, i) => (
                        <Plan plan={p} 
                        purchased={p.name.toLocaleLowerCase() === subscription}
                        setSubscription={setSubscription}
                        loader={loader}
                        setLoader={setLoader}
                        others={others}
                        borders={borderstyles[i]} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage
