import React, { useState, useEffect, useRef } from 'react'
import "./verify.css"
import {
    FormWrapper,
    FormBtn,
    FormAlert
} from "./FormComponents";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useAuth } from "../../contexts/FirebaseAuthContext";

const Verify = (props) => {
    
    const { isSignInWithEmailLink, signInWithEmailLink, currentUser } = useAuth()
    const [verifying, setVerifying] = useState(false)
    const [error, seterror] = useState(null)

    const verifyEmail = () => {
        setVerifying(true)
        if (isSignInWithEmailLink(window.location.href)) {
            let email = localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(email, window.location.href)
                .then(function (result) {
                    setVerifying(false)
                    localStorage.removeItem('emailForSignIn');
                })
                .catch(function (error) {
                    seterror(error.message)
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
                            ) : !error ? (
                                <>
                                    <p>Email Verifed</p>
                                    <CheckCircleIcon className="success-icon" />
                                </>
                            ) : <FormAlert variant="danger">{error}</FormAlert> }
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

export default Verify
