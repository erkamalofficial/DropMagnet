import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in'
import { useHistory } from 'react-router-dom'
import HeaderBar from '../../components/elements/HeaderBar/HeaderBar'
import LabeledButton from '../../components/elements/LabeledButton/LabeledButton'
import TextField from '../../components/elements/TextField/TextField'
import { FormBtn } from '../register/FormComponents'
import "./settings.css"
import styled from "styled-components";

const ButtonContainer = styled.div`
  margin: 36px auto 10px auto;
  width: 80%;
`;

const Button = styled.button`
  box-sizing: border-box
`;

const SettingsPage = (props) => {

    const user = JSON.parse(localStorage.getItem('userDetails'))

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        if (user) {
            let sub = user.subscription
            sub = sub?.charAt(0).toUpperCase() + sub?.slice(1);
            let pUrl = `http://dropmagnet.com/${user.username}`

            setEmail(user.email)
            setName(user.name)
            setUrl(pUrl)
            setSubscription(sub ? sub : null)
        }
    }, [])

    const handleName = (val, i) => {
        let n = name.split(' ')[1-i]
        let newName;
        if (i === 0) {
            newName = val + ' ' + n
        }
        else{
            newName = n + ' ' + val
        }
        setName(newName)
    }

    function openHome() {
        history.push("/");
    }

    const saveSettings = () => {
        history.push("/home");
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

    function renderForm() {
        return <div className="settings-fields">
            <TextField setInputValue={(val) => setEmail(val)} title={"Email Address"} placeholder={"Enter email"} value={email} />
            <TextField setInputValue={(val) => handleName(val, 0)} title={"First Name"} placeholder={"Enter first name"} value={name.split(' ')[0]} />
            <TextField setInputValue={(val) => handleName(val, 1)} title={"Last Name"} placeholder={"Enter last name"} value={name.split(' ')[1]} />
            <TextField setInputValue={(val) => { }} title={"Main Profile URL"} placeholder={"Enter profile link"} value={url} />
            <LabeledButton onClickBtn={() => { }} title={"2FA"} buttonLabel={"Set Up"} />
            <LabeledButton onClickBtn={() => props.history.push('/subscription')} title={"Drop Swipe Subscription"} 
            buttonLabel={subscription ? `Active: ${subscription} Collector (Tap to Edit Subscription)`
        : `Active: No Subscription (Tap to Edit Subscription)`} />
            <LabeledButton onClickBtn={() => { }} title={"KYC for Utility Token AirDrop"} buttonLabel={"Coming Soon"} />
            <ButtonContainer>
                <Button className={'blank-gradient-button custom'}
                    style={{ padding: "12px 45px" }}
                    onClick={saveSettings}>
                    <span className={'blank-gradient-text'}>Save Settings</span>
                </Button>
            </ButtonContainer>
        </div>
    }

    return (
        <div>
            <div className="settings-form-container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '56px 16px 128px 16px'
                }}>
                    {renderForm()}
                </div>
            </div>


        </div>
    )
}

export default SettingsPage
