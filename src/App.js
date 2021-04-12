import logo from './logo.svg';
import './App.css';
import Home from './pages/home/index'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import TermsAndConditions from './pages/terms';
import DropCreation from './pages/create_drop';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import { useState, useEffect } from 'react';

function App() {

  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    let user = {
      "name" : "Crypto Art Man",
      "handle" : "cryptoartman",
      "bio" : "The Drop From Space is a piece that signifies the launch of this incredible app — Drop Magnet! Designed by the lead designer of Drop Magnet, it’ll be available for auction on Crypto Art Man’s OpenSea page from this Friday onwards.",
      "image" : "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg"
    }
    console.log('user in app', user)
    setUserDetails(user)

  }, [])

  function saveCredentials(accessTokenCred, refreshTokenCred) {
    // setAccessToken(accessTokenCred)
    // setRefreshToken(refreshTokenCred)
    // for now (to review) store refresh token in localStorage, and access token in memory/state only
    localStorage.setItem("rt", refreshTokenCred);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} userDetails={userDetails} userLoggedIn={true} />} />
        <Route path="/terms" render={(props) => <TermsAndConditions {...props} />} />
        <Route path="/create_drop" render={(props) => <DropCreation {...props} userHandle={userDetails.handle}/>} />
        <Route path="/signup" render={(props) => <Signup {...props} />} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/profile" render={(props) => <Profile {...props} userDetails={userDetails} userLoggedIn={true}/>} />
      </Switch>
    </Router>
  );
}

export default App;
