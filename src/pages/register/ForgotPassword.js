import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  FormWrapper,
  FormBtn,
  FormAlert,
  FormInput,
  FormLabel,
  GridItem,
} from "./FormComponents";
export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-left-holder">
          <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
            history.push('/');
          }} className="header-left-image clickable" src="./drop_logo.png" />

        </div>
        {/* <div className="header-right-holder">
          <h2 style={{ margin: '0' }}>Log In</h2>
        </div> */}
      </div>
      <div style={{ height: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <FormAlert variant="danger">{error}</FormAlert>}
            {message && <FormAlert variant="success">{message}</FormAlert>}
            <GridItem>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" ref={emailRef} required />
            </GridItem>
            <FormBtn disabled={loading} className="w-100" type="submit">
              Reset Password
            </FormBtn>
            <GridItem>
              <Link to="/login">Login</Link>
            </GridItem>
            <GridItem>
              Need an account? <Link to="/signup">Sign Up</Link>
            </GridItem>
          </form>
        </FormWrapper>
      </div>
    </div>
  );
}
