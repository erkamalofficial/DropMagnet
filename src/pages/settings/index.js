import React, { useEffect } from 'react'
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

    const history = useHistory()

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
            <TextField setInputValue={() => { }} title={"Email Address"} placeholder={"Enter email"} />
            <TextField setInputValue={() => { }} title={"First Name"} placeholder={"Enter first name"} />
            <TextField setInputValue={() => { }} title={"Last Name"} placeholder={"Enter last name"} />
            <TextField setInputValue={() => { }} title={"Main Profile URL"} placeholder={"Enter profile link"} />
            <LabeledButton onClickBtn={() => { }} title={"2FA"} buttonLabel={"Set Up"} />
            <LabeledButton onClickBtn={() => { }} title={"Drop Swipe Subscription"} buttonLabel={"Active: Pro Collector\n\n(Tap to Edit Subscription)"} />
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
