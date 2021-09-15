import React, { useState, useEffect, useRef } from 'react'
import "./verify.css"
import {
    FormWrapper,
    FormBtn,
    GridItem,
    FormLabel,
    FormInput,
    FormAlert,
    FormSuccess
} from "./FormComponents";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { checkUsername, createNewUserProfile, getUserProfile } from '../../DropMagnetAPI';
import VFMessage from './VFMessage';

const SignupVerify = (props) => {

    const { isSignInWithEmailLink, signInWithEmailLink } = useAuth()
    const [verifying, setVerifying] = useState(false)
    const [error, seterror] = useState(null)
    const [loading, setLoading] = useState(false)
    const [start, setStart] = useState(false)
    const [message, setMessage] = useState(null)

    const usernameRef = useRef()
    const nameRef = useRef()

    const createUser = async (res, email) => {
        let tk = await res.user.getIdToken()
        let username = usernameRef.current.value
        let name = nameRef.current.value

        createNewUserProfile(name, username, email, tk)
            .then(async res => {
                if (res.status === 409) {
                    seterror("Conflict occurred! Change username.")
                    setVerifying(false)
                }
                else if (res.status === 400) {
                    seterror("Name not valid! Change name.")
                    setVerifying(false)
                }
                else if (res.status >= 401) {
                    seterror("Internal server error.")
                    setVerifying(false)
                }
                else {
                    localStorage.setItem('userDetails', JSON.stringify(res));
                    setVerifying(false)
                    setMessage("Account created successfully!")
                    localStorage.removeItem('emailForSignUp');
                }
            })
    }

    const isPresent = async () => {
        let u = usernameRef.current.value
        let res = await checkUsername(u)
            .then(res => res)
        if (res.status === 200) {
            seterror("")
            return false
        }
        seterror("Username exists! Change username.")
        setVerifying(false)
        setStart(false)
        return true
    }

    const verifyEmail = async (e) => {
        e.preventDefault()

        setStart(true)
        setVerifying(true)

        let present = await isPresent()

        if (isSignInWithEmailLink(window.location.href) && !present) {
            let email = localStorage.getItem('emailForSignUp');
            if (!email) {
                alert("Error occurred!")
                window.location.href = "/signup"
            }

            await signInWithEmailLink(email, window.location.href)
                .then(async res => {
                    console.log(res)
                    await createUser(res, email)
                })
                .catch(error => {
                    seterror(error.message)
                    setVerifying(false)
                });
        }
    }

    const changeRoute = (e) => {
        e.preventDefault()
        if (!error && message) {
            window.location.href = "/home"
        }
        else {
            props.history.push("/signup")
        }
    }

    return (
        <div className="verification-page">
            <div className="verification-pane">
                <FormWrapper>
                    <form className="formGrid"onSubmit={verifyEmail} >
                        <h2 className="text-center mb-4">Verification & Signup</h2>
                        {error && <FormAlert >{error}</FormAlert>}
                        {message && <FormSuccess >{message}</FormSuccess>}
                        {start && !error && (<VFMessage verifying={verifying} />)}

                        {!message && (
                            <div style={{ marginTop: '10px' }}>
                                <GridItem id="name">
                                    <FormLabel>Name</FormLabel>
                                    <FormInput type="text" ref={nameRef} required />
                                </GridItem>
                                <GridItem id="username">
                                    <FormLabel>Username</FormLabel>
                                    <FormInput type="text" ref={usernameRef} required />
                                </GridItem>
                            </div>
                        )}

                        {!verifying && !error && !message ? (
                            <FormBtn disabled={verifying || loading} className="w-100"
                                type="submit"
                                style={{ marginTop: '20px' }}>
                                <p style={{ margin: '0', marginTop: '3px' }}>Create Account</p>
                            </FormBtn>
                        ) : error ? (
                            <FormBtn disabled={verifying} className="w-100"
                                type="submit"
                                style={{ marginTop: '20px' }}>
                                <p style={{ margin: '0', marginTop: '3px' }}>Create Account</p>
                            </FormBtn>
                        ) : message ? (
                            <FormBtn disabled={verifying} className="w-100"
                                onClick={changeRoute}
                                style={{ marginTop: '20px' }}>
                                <p style={{ margin: '0', marginTop: '3px' }}>Go To Home & Explore</p>
                            </FormBtn>
                        ) : null}
                    </form>

                </FormWrapper>
            </div>
        </div>
    )
}

export default SignupVerify
