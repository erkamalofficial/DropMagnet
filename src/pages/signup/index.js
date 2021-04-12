import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import TextField from '../../components/elements/TextField/TextField'
import TextView from '../../components/elements/TextView/TextView'

export default function Signup(props) {

  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [userId, setUserId] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')

  const [signupStep, setSignupStep] = useState(0)

  let history = useHistory()

  function signupUser() {        
    setSignupStep(1)
    DropMagnetAPI.signup(handle, email, password).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        setSignupStep(1)
      }
    });
  }

  function setUserDetails() {
    history.push("/");
    DropMagnetAPI.setUserDetails(userId, firstName, lastName, bio).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        history.push("/");
      }
    });
  }

  return (
    <div className="signup-container">
      {signupStep == 0 ?
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 36px'}}>
          <img src="./drop-magnet-logo.png" width="100%" style={{paddingBottom: '60px'}}/>
          <TextField setInputValue={setHandle} title={"Handle"} placeholder={"Enter your handle"} />
          <TextField setInputValue={setEmail} title={"Email Address"} placeholder={"Enter your email address"} />
          <TextField setInputValue={setPassword} textFieldType="password" title={"Password"} placeholder={"Enter your password"} />
          <div style={{paddingTop: '16px', display: 'flex'}}>
            <div style={{width: '16px', height: '14px', border: 'solid 1px #eaeaea', borderRadius: '4px', marginTop: '2px', marginRight: '12px'}}></div>
            <p2 >By signing up you agree with the Terms and Conditions</p2>
          </div>
          <button className="main-button" style={{marginTop: '65px'}} onClick={() => signupUser()} >Sign Up</button>
        </div>
        :
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 36px'}}>
          <img src="./drop-magnet-logo.png" width="100%" style={{paddingBottom: '60px'}}/>
          <TextField setInputValue={setFirstName} title={"First Name"} placeholder={"Enter your first name"} />
          <TextField setInputValue={setLastName} title={"Last Name"} placeholder={"Enter your last name"} />
          <TextView setInputValue={setBio} title={"Your Bio"} placeholder={"Enter your bio"} />
          <button className="main-button" onClick={() => setUserDetails()} >Continue</button>
        </div>
      }
    </div>
  );
}
