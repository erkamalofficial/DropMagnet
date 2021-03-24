import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'

export default function Login(props) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginUser(email, password) {
    DropMagnetAPI.loginUser(email, password).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        // history.push("/home");
      }
    });
  }

  return (
    <div>
    </div>
  );
}