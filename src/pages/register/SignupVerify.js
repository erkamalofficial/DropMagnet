import React, { useState, useEffect, useRef } from 'react'
import "./verify.css"
import {
    FormWrapper,
    FormBtn,
    GridItem,
    FormLabel,
    FormInput
} from "./FormComponents";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { createNewUserProfile } from '../../DropMagnetAPI';

const SignupVerify = (props) => {

    const { isSignInWithEmailLink, signInWithEmailLink, currentUser } = useAuth()
    const [verifying, setVerifying] = useState(false)
    const [error, seterror] = useState(null)

    const usernameRef = useRef()

    const verifyEmail = () => {
        setVerifying(true)
        if (isSignInWithEmailLink(window.location.href)) {
            let data = JSON.parse(localStorage.getItem('emailForSignUp'));
            if (!data && !data.email) {
                alert("Error occurred!")
                window.location.href="/signup"
            }
            
            signInWithEmailLink(data.email, window.location.href)
                .then(async function (res) {
                    let tk = await res.user.getIdToken()
                    createNewUserProfile(data.name, data.username, data.email, tk)
                        .then(async function (response) {
                            if (response.status === "error") {
                                seterror(error)
                                setVerifying(false)
                            }
                            else {
                                setVerifying(false)
                                localStorage.removeItem('emailForSignUp');
                            }
                        })
                })
                .catch(function (error) {
                    seterror(error)
                    setVerifying(false)
                });
        }
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    const goHome = () => {
        props.history.push("/home")
    }

    return (
        <div className="verification-page">
            <div className="verification-pane">
                <FormWrapper>
                    <form className="formGrid" onSubmit={goHome}>
                        <h2 className="text-center mb-4">Verification</h2>
                        <div className="vf-message">
                            {verifying ? (
                                <>
                                    <p>Verifying email...</p>
                                    <CircularProgress color={"#fff"} />
                                </>
                            ) : (
                                <>
                                    <p>Email Verifed</p>
                                    <CheckCircleIcon className="success-icon" />
                                </>
                            )}
                        </div>
                        
                        {!verifying && (
                            <FormBtn disabled={verifying} className="w-100" type="submit"
                                style={{ marginTop: '30px' }}>
                                <p style={{ margin: '0', marginTop: '3px' }}>Go To Home & Explore</p>
                            </FormBtn>
                        )}
                    </form>

                </FormWrapper>
            </div>
        </div>
    )
}

export default SignupVerify
