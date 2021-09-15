import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { Link } from "react-router-dom";
import {
  FormWrapper,
  FormBtn,
  FormAlert,
  FormInput,
  FormLabel,
  FormSuccess,
  GridItem,
} from "./FormComponents";
import * as DropMagnetAPI from '../../DropMagnetAPI'
import Spinner from "../../components/blocks/spinner";

var VERIFY_EMAIL_PATH;
if (process.env === "development") {
  VERIFY_EMAIL_PATH = "http://localhost:3000";
} else {
  VERIFY_EMAIL_PATH = "https://fb-web-763f4.web.app";
}

export default function Signup(props) {
  const emailRef = useRef();
  const usernameRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser, sendSignUpLinkToEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      let username = usernameRef.current.value

      if (!username.split(' ')[1]) {
        const res = await signup(
          emailRef.current.value,
          passwordRef.current.value
        );


        let name = res.user.displayName === null ? username : res.user.displayName
        let email = res.user.email

        let tk = await res.user.getIdToken()

        DropMagnetAPI.createNewUserProfile(name, username, email, tk)
          .then(async function (response) {
            console.log('error', response)
            if (response.status === "error") {
              console.log('error', response)
            }
            else {
              try {
                window.localStorage.setItem("emailForSignIn", emailRef.current.value);
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
      }
      else {
        alert("Username must be of one word.")
        setLoading(false)
      }


    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }


  async function handleSubmitEmailLink(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const email = emailRef.current.value
      // const name = nameRef.current.value
      // const username = usernameRef.current.value

      let res = await DropMagnetAPI.isUser(email)

      if (!res.status) {
        sendSignUpLinkToEmail(email)
          .then(res => {
            localStorage.setItem('emailForSignUp', email)
            setMessage("Email link sent. Please check email.")
            setLoading(false)
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
      }

      else {
        setError("This email is already registered.");
        setLoading(false);
      }


    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-left-holder">
          <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
            props.history.push('/');
          }} className="header-left-image clickable" src="./drop_logo.png" />

        </div>
        {/* <div className="header-right-holder">
          <h2 style={{ margin: '0' }}>Sign Up</h2>
        </div> */}
      </div>
      <div style={{ height: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormWrapper>
          <form className="formGrid" onSubmit={handleSubmitEmailLink}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <FormAlert variant="danger">{error}</FormAlert>}
            {message && <FormSuccess variant="success">{message}</FormSuccess>}
            {!loading && !message ? (
              <>
                <GridItem id="email">
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" ref={emailRef} required />
                </GridItem>
                {/* <GridItem id="name">
                  <FormLabel>Name</FormLabel>
                  <FormInput type="text" ref={nameRef} required />
                </GridItem>
                <GridItem id="username">
                  <FormLabel>Username</FormLabel>
                  <FormInput type="text" ref={usernameRef} required />
                </GridItem> */}
                <FormBtn disabled={loading} type="submit">
                  Sign Up
                </FormBtn>
              </>
            ) : !message ? <Spinner /> : null}

            {!loading && !message &&
              (<div>
                Already have an account? <Link to="/login">Log In</Link>
              </div>)
            }
          </form>
        </FormWrapper>
      </div>
    </div>
  );
}
