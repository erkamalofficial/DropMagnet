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
import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const res = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (res.user.emailVerified) {
        history.push("/home");
      } else {
        setError("Email not verified!! check your inbox and verifiy");
      }
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-left-holder">
          <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
            history.push('/');
          }} className="header-left-image clickable" src="./drop_icon.png" />

        </div>
        {/* <div className="header-right-holder">
          <h2 style={{ margin: '0' }}>Log In</h2>
        </div> */}
      </div>
      <div style={{ height: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormWrapper>
          <form className="formGrid" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <FormAlert variant="danger">{error}</FormAlert>}
            <GridItem id="email">
              <FormLabel>Email</FormLabel>
              <FormInput type="email" ref={emailRef} required />
            </GridItem>
            <GridItem id="password">
              <FormLabel>Password</FormLabel>
              <FormInput type="password" ref={passwordRef} required />
            </GridItem>
            <FormBtn disabled={loading} className="w-100" type="submit">
              Log In
            </FormBtn>
            <GridItem>
              <Link to="/forgot-password">Forgot Password?</Link>
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
