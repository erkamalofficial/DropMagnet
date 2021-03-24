import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'

export default function Signup(props) {

  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [userId, setUserId] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')


  function signupUser(handle, email, password) {
    DropMagnetAPI.signup(handle, email, password).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        history.push("/home");
      }
    });
  }

  function setUserDetails(userId, firstName, lastName, bio) {
    DropMagnetAPI.setUserDetails(userId, firstName, lastName, bio).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        history.push("/home");
      }
    });
  }

  const history = useHistory();

  return (
    <div>
    </div>
  );
}
