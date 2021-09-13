import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Spinner from '../../components/blocks/spinner'
import { useAuth } from '../../contexts/FirebaseAuthContext'
import { FormAlert, FormBtn, FormInput, FormLabel, FormSuccess, FormWrapper, GridItem } from './FormComponents'
import * as DropMagnetAPI from '../../DropMagnetAPI'


var VERIFY_EMAIL_PATH;
if (process.env === "development") {
    VERIFY_EMAIL_PATH = "https://fb-web-763f4.web.app";
} else {
    VERIFY_EMAIL_PATH = "https://fb-web-763f4.web.app";
}


const ProfileForm = () => {

    const nameRef = useRef();
    const usernameRef = useRef();
    const { signInWithCustomToken } = useAuth();

    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const registerUser = async (e) => {
        setLoading(true)
        const address = localStorage.getItem('publicAddress')
        e.preventDefault()
        try {
            setError("");
            let name = nameRef.current.value
            let username = usernameRef.current.value

            if (!username.split(' ')[1]) {
                DropMagnetAPI.createWalletUser(username, name, address).then(async function (response) {
                    if (response.status === "error") {
                        console.log('error', response)
                    }
                    else {
                        await signInWithCustomToken(response.token)
                            .then(cred => {
                                setLoading(false)
                                sessionStorage.removeItem('headerLoad')
                                history.push("/home")

                            })
                    }

                })
            }
            else{
                alert("Username must be of one word.")
                setLoading(false)
            }


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
                        {message === '' && !loading ? (
                            <>
                                <GridItem id="name">
                                    <FormLabel>Name</FormLabel>
                                    <FormInput type="text" ref={nameRef} required />
                                </GridItem>
                                <GridItem id="username">
                                    <FormLabel>Username</FormLabel>
                                    <FormInput type="text" ref={usernameRef} required />
                                </GridItem>
                            </>
                        ) : <Spinner />}

                    </form>

                    {message === "" && !loading &&
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
