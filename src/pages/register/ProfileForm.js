import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Spinner from '../../components/blocks/spinner'
import { useAuth } from '../../contexts/FirebaseAuthContext'
import { FormAlert, FormBtn, FormInput, FormLabel, FormSuccess, FormWrapper, GridItem } from './FormComponents'
import * as DropMagnetAPI from '../../DropMagnetAPI'


var VERIFY_EMAIL_PATH;
if (process.env === "development") {
    VERIFY_EMAIL_PATH = "http://localhost:3000";
} else {
    VERIFY_EMAIL_PATH = "https://fb-web-763f4.web.app";
}


const ProfileForm = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
    const history = useHistory();

    const registerUser = async (e) => {
        const address = localStorage.getItem('publicAddress')
        e.preventDefault()
        try {
            setError("");
            const res = await signup(
                emailRef.current.value,
                passwordRef.current.value
            );

            let username = res.user.email.split('@')[0]
            let name = res.user.displayName === null ? username : res.user.displayName
            let email = res.user.email

            DropMagnetAPI.createWalletUser(name, username, email, address, res.user.za).then(async function (response) {
                if (response.status === "error") {
                    console.log('error', response)
                }
                else {
                    try {
                        await res.user.sendEmailVerification({
                            handleCodeInApp: true,
                            url: `${VERIFY_EMAIL_PATH}/buy-links`,
                        });
                        setMessage("Check your email inbox for further instructions");
                    } catch {
                        setError("Failed to send email");
                    }
                }

            })
        } catch {
            console.log("Error")
            setError("Failed to create an account");
        }
    }

    return (
        <div>
            <div className="header-container">
                <div className="header-left-holder">
                    <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
                        history.push('/');
                    }} className="header-left-image clickable" src="./drop_logo.png" />

                </div>
            </div>
            <div style={{ height: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FormWrapper>
                    <form className="formGrid">
                        <h2 className="text-center mb-4">Enter Details</h2>
                        {error && <FormAlert variant="danger">{error}</FormAlert>}
                        {message && <FormSuccess variant="success">{message}</FormSuccess>}
                        {message === '' && (
                            <>
                                <GridItem id="name">
                                    <FormLabel>Name</FormLabel>
                                    <FormInput type="text" required />
                                </GridItem>
                                <GridItem id="email">
                                    <FormLabel>Email</FormLabel>
                                    <FormInput type="email" ref={emailRef} required />
                                </GridItem>
                                <GridItem id="password">
                                    <FormLabel>Password</FormLabel>
                                    <FormInput type="password" ref={passwordRef} required />
                                </GridItem>
                            </>
                        )}

                    </form>

                    {message === "" &&
                        <FormBtn className="w-100"
                            onClick={registerUser}
                            style={{ marginTop: "20px" }}>
                            Proceed
                        </FormBtn>}

                </FormWrapper>
            </div>
        </div>
    )
}

export default ProfileForm
