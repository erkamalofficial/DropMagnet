import logo from './logo.svg';
import './App.css';
import DropCell from './components/DropCell/DropCell'
import Home from './pages/home/index'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import TermsAndConditions from './pages/terms';
import DropCreation from './pages/create_drop';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {

  function saveCredentials(accessTokenCred, refreshTokenCred) {
    // setAccessToken(accessTokenCred)
    // setRefreshToken(refreshTokenCred)
    // for now (to review) store refresh token in localStorage, and access token in memory/state only
    localStorage.setItem("rt", refreshTokenCred);
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/terms" component={TermsAndConditions} />
        <Route path="/create_drop" component={DropCreation} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
