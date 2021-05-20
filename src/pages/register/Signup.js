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

var VERIFY_EMAIL_PATH;
if (process.env === "development") {
  VERIFY_EMAIL_PATH = "http://localhost:3000";
} else {
  VERIFY_EMAIL_PATH = "https://jj-web-ed26d.web.app";
}

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
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
      const res = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      try {
        window.localStorage.setItem("emailForSignIn", emailRef.current.value);
        await res.user.sendEmailVerification({
          handleCodeInApp: true,
          url: `${VERIFY_EMAIL_PATH}/home`,
        });
        setMessage("Check your email inbox for further instructions");
      } catch {
        setError("Failed to send email");
      }
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <FormWrapper>
      <form className="formGrid" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <FormAlert variant="danger">{error}</FormAlert>}
        {message && <FormSuccess variant="success">{message}</FormSuccess>}
        {!message && (
          <>
            <GridItem id="email">
              <FormLabel>Email</FormLabel>
              <FormInput type="email" ref={emailRef} required />
            </GridItem>
            <GridItem id="password">
              <FormLabel>Password</FormLabel>
              <FormInput type="password" ref={passwordRef} required />
            </GridItem>
            <GridItem id="password-confirm">
              <FormLabel>Password Confirmation</FormLabel>
              <FormInput type="password" ref={passwordConfirmRef} required />
            </GridItem>
            <FormBtn disabled={loading} type="submit">
              Sign Up
            </FormBtn>
          </>
        )}

        <div>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </FormWrapper>
  );
}
