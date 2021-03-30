import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import TextField from '../../components/TextField/TextField'

export default function Login(props) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  function loginUser() {
    console.log('user email', email)
    console.log('user password', password)
    history.push("/");
    DropMagnetAPI.loginUser(email, password).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
      }
    });
  }

  return (
    <div className="home-container">
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <TextField setInputValue={setEmail} title={"First Name"} placeholder={"Enter your email address"} />
        <TextField setInputValue={setPassword} textFieldType="password" title={"Password"} placeholder={"Enter your password"} />
        <button className="main-button" onClick={() => loginUser()} >Log In</button>
      </div>
    </div>
  );
}