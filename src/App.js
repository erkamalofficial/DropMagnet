import "./App.css";
// import Home from "./pages/home/index";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/wrappers/PrivateRoute";
import React, { Suspense } from "react";

import TermsAndConditions from "./pages/terms";
import DropCreation from "./pages/create_drop";
import Signup from "./pages/register/Signup";
import Signup2 from "./pages/signup/index2";
import Login from "./pages/register/Login";
import ForgotPassword from "./pages/register/ForgotPassword";
import Profile from "./pages/profile";
import SquareGallery from "./pages/galleries/square-gallery";
import MagGallery from "./pages/galleries/mag-gallery";
import WalletLinks from "./pages/wallet/wallet-links";
import BuyLinks from "./pages/wallet/buy-links";
import PersonalLinksHome from "./pages/wallet/personal-links-home";
import NftDisplay from "./pages/wallet/nft-display";
import ConnectedWallets from "./pages/wallet/connected-wallets";
import PersonalLinksPayment from "./pages/wallet/personal-links-payments";
// import SelectLinks from "./pages/wallet/select-links";
// import TinderCards from './pages/react-tinder-card/DemoSwiper';
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../src/contexts/FirebaseAuthContext";
import About from "./pages/about";
import AboutDrop from "./pages/aboutDrop";
import GetToken from "./pages/getToken";
import Reswipe from "./pages/reswipe";
// import Nft from "./nft";
// import firebase from "firebase/app";
const HomeComponent = React.lazy(() => import("./pages/home/index"));

const HomePage = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomeComponent
      {...props}
      userDetails={props.userDetails}
      userLoggedIn={true}
    />
  </Suspense>
);

function App() {
  // TODO - Martin Bullman Notes
  // The flowing code is written as proof of concept and will need to be refactored into an
  // appropriate method at at a later stage.
  //
  // The code will try to connect to the Ethereum network on first load of the DropMagnet app.
  // If the users has never authenticated with Metamask it will ask the user to login to Metamask
  // and connect DropMagent too there MetaMask accounts.
  //
  // Once the user has completed Auth the code will then read there wallet address and pull all the NFT's
  // they have in their wallet and list the meta data for each NFT in the JS console.
  //
  // Its at this point we can either show the NFT in a Gallery or store it in the Firebase DB.
  // THIS WORK STILL NEEDS TO BE IMPLEMENTED.
  // window.addEventListener("load",  Nft);
  const [userDetails, setUserDetails] = useState({});

  const {logout} = useAuth();

  useEffect(() => {
    let user = {
      name: "Crypto Art Man",
      handle: "cryptoartman",
      bio: "The Drop From Space is a piece that signifies the launch of this incredible app — Drop Magnet! Designed by the lead designer of Drop Magnet, it’ll be available for auction on Crypto Art Man’s OpenSea page from this Friday onwards.",
      image:
        "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
    };
    localStorage.setItem('userDetails',JSON.stringify(user))
    setUserDetails(user);
  }, []);

  return (
    <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/home"
            userDetails={userDetails}
            isLogged
            component={HomePage}
          />
          <Route
            path="/terms"
            render={(props) => <TermsAndConditions {...props} />}
          />

          <Route
            path="/about"
            render={(props) => <About {...props} />}
          />

          <Route
            path="/aboutDrop"
            render={(props) => <AboutDrop {...props} />}
          />

          <Route
            path="/getToken"
            render={(props) => <GetToken {...props} />}
          />

          <Route
            path="/square_gallery"
            render={(props) => (
              <SquareGallery
                {...props}
                userDetails={userDetails}
                userLoggedIn={true}
              />
            )}
          />
          <Route
            path="/mag_gallery"
            render={(props) => (
              <MagGallery
                {...props}
                userDetails={userDetails}
                userLoggedIn={true}
              />
            )}
          />
          <Route
            path="/create_drop"
            render={(props) => (
              <DropCreation {...props} userHandle={userDetails.handle} />
            )}
          />

          <Route 
            path="/reswipe"
            component={Reswipe}
          />

          <Route path="/signup2" render={(props) => <Signup2 {...props} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <Route
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                userImage={userDetails.image}
                userDetails={userDetails}
                userLoggedIn={true}
              />
            )}
          />
          <Route
            path="/wallet_links"
            render={(props) => (
              <WalletLinks
                {...props}
                userDetails={userDetails}
                userLoggedIn={true}
              />
            )}
          />
          <Route
            path="/nfts"
            render={(props) => (
              <NftDisplay
                {...props}
                userDetails={userDetails}
                userLoggedIn={true}
              />
            )}
          />
          <Route
            path="/cw"
            render={(props) => (
              <ConnectedWallets
                {...props}
                userDetails={userDetails}
                userLoggedIn={true}
              />
            )}
          />

          <Route exact path="/" component={PersonalLinksHome} />

          <Route exact path="/logout" render={(props)=>{
            logout()
            .then(()=>{
              props.history.push('/')
            })
            .catch(()=>{
              props.history.push('/')
            })
            return null
          }} />
          <PrivateRoute
            exact
            path="/links-payment"
            component={PersonalLinksPayment}
          />
          <PrivateRoute path="/buy-links" exact component={BuyLinks} />
        </Switch>
    </Router>
  );
}

export default App;
