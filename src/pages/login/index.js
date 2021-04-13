import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'
import TextField from '../../components/elements/TextField/TextField'
import firebase from "firebase/app";
import { useAuth } from "../../contexts/FirebaseAuthContext"

export default function Login(props) {
  
  const { login, currentUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  async function loginUser() {
    try {
      await login(email, password).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log('logged in user', user)
        history.push("/")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      })
    } catch {

    }

  }

  function connectMetamask() {

  }


  return (
      <div className="signup-container">
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 36px'}}>
          <img src="./drop-magnet-logo.png" width="100%" style={{paddingBottom: '82px'}}/>
          <TextField setInputValue={setEmail} title={"Email address"} placeholder={"Enter your email address"} />
          <TextField setInputValue={setPassword} textFieldType="password" title={"Password"} placeholder={"Enter your password"} />
          <button className="main-button" onClick={() => loginUser()} >Log In</button>
          <button style={{margin: '0px auto'}} className="main-button" onClick={() => connectMetamask()} >Connect With Metamask</button>
        </div>
      </div>
  );
}