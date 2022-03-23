import "./App.css";
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./components/wrappers/PrivateRoute";
import React, { Suspense, useMemo, useState, useEffect } from "react";
import TermsAndConditions from "./pages/terms";
import Signup from "./pages/register/Signup";
import Signup2 from "./pages/signup/index2";
import Login from "./pages/register/Login";
import MagicLogin from "./pages/magiclogin/MagicLogin";
import ForgotPassword from "./pages/register/ForgotPassword";
import Profile from "./pages/profile";
import WalletLinks from "./pages/wallet/wallet-links";
import BuyLinks from "./pages/wallet/buy-links";
import PersonalLinksHome from "./pages/wallet/personal-links-home";
import NftDisplay from "./pages/wallet/nft-display";
import ConnectedWallets from "./pages/wallet/connected-wallets";
import PersonalLinksPayment from "./pages/wallet/personal-links-payments";
import { useAuth } from "../src/contexts/FirebaseAuthContext";
import About from "./pages/about";
import AboutDrop from "./pages/aboutDrop";
import GetToken from "./pages/getToken";
import UpgradeSub from "./pages/upgradeSub";

import Reswipe from "./pages/reswipe";
import { getUserProfile } from './DropMagnetAPI';
import { useDispatch, useSelector } from "react-redux";
import DropPage from "./pages/home/DropPage";
import ProfileForm from "./pages/register/ProfileForm";
import ProfilePage from "./pages/profile/ProfilePage";

import ExploreGalleries from "./components/exploreGalleries";
import DropMagnet from "./components/dropMagnet";
import MyGallery from "./components/myGallery";
import MovieFarm from "./components/movieFarm";
import Politician from "./components/dropMagnet/components/politician/politician"

import SettingsPage from "./pages/settings";
import SubscriptionPage from "./pages/subscription";
import HeaderBar from "./components/elements/HeaderBar/HeaderBar";
import { GlobalContext } from "./utils/GlobalContext"
import FadeIn from "react-fade-in";
import Verify from "./pages/register/Verify";
import SignupVerify from "./pages/register/SignupVerify";
import { MoralisProvider } from "react-moralis";
import { getFirstExternalCategoryPosition } from "./utils/category";

import { NewLandingPage } from "./components";
import { fetchCategories } from "./store/reducers/CategoryReducer";
import { useGetCategoriesQuery } from "./store/api/DropApi";
import { LogoutCurrentUser } from "./helpers/AuthHelper";
import { fetchCurrentUser, getAuthTokenAndUserId, removeAuthTokenAndUserId } from "./store/reducers/AuthReducer";
import { auth } from "./firebase";
import { MORILIS_APP_ID, MORILIS_SERVER_URL } from "./config/constants";
import { Redirect } from 'react-router-dom'

const HomeComponent = React.lazy(() => import("./pages/home/index"));
const DummyHomeComponent = React.lazy(() => import("./pages/home/DummyPage/dummyIndex"));
const CreateDropComponent = React.lazy(() => import("./pages/create_drop"));

const HomePage = (props) => (
  <Suspense fallback={null}>
    <HomeComponent
      {...props}
      userDetails={props.userDetails}
      userLoggedIn={
        localStorage.getItem('userDetails') !== null ? true
          : false}
    />
  </Suspense>
);

const DummyHomePage = (props) => (
  <Suspense fallback={null}>
    <DummyHomeComponent
      {...props}
      userDetails={props.userDetails}
      userLoggedIn={
        localStorage.getItem('userDetails') !== null ? true
          : false}
    />
  </Suspense>
);

const CreateDropPage = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateDropComponent
      {...props}
      userDetails={JSON.parse(localStorage.getItem('userDetails'))}
      userLoggedIn={
        localStorage.getItem('userDetails') !== null ? true
          : false}
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


  // Global functions
  const history = useHistory()
  const dispatch = useDispatch()
  // const state = useSelector((state) => state);
  // const curIndex = useSelector((state) => state.category.curIndex);
  const activeTabIndex = useSelector((state) => state.category.general.activeTabIndex);
  const allCategories = useSelector((state) => state.category);

  const isInternalCreator = useMemo(() => {
    const position = getFirstExternalCategoryPosition(allCategories);
    return position > activeTabIndex;
  }, [activeTabIndex, allCategories]);

  const [date, setDate] = useState(new Date().getTime())

  const [reload, setReload] = useState(true)
  const [isTokenFetched, setIsTokenFetched] = useState(false)

  const addFlag = () => {
    if (!sessionStorage.reloading) {
      sessionStorage.setItem("reloading", "true");
      sessionStorage.removeItem("profileDetails");
    }
  }
  const removeFlag = () => {
    sessionStorage.removeItem("reloading");
  }

  useEffect(() => {
    window.addEventListener("beforeunload", addFlag);
    window.addEventListener("onload", addFlag);
    return () => {
      window.removeEventListener("beforeunload", addFlag);
      window.removeEventListener("onload", addFlag);
    };
  }, []);

  useEffect(() => {
    let reloading = JSON.parse(sessionStorage.getItem('reloading'))
    if (reloading) {
      setReload(true)
      removeFlag()
    }
  }, []);


  const [userDetails] = useState({});


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsTokenFetched(true)
        history.push('/swiper')
      }
      user.getIdToken().then(function (token) {
        if (token) {
          dispatch(getAuthTokenAndUserId({ token, userId: user.uid }))
          setIsTokenFetched(true)
        }
      });

    });
  }, []);


  return (
    <>
      {isTokenFetched &&
        // <MoralisProvider appId={MORILIS_APP_ID} serverUrl={MORILIS_SERVER_URL}>
          <Router>
            <div className="fixed-container"
              style={{ top: '0' }}>
              {window.location.pathname !== "/" ?
                reload ? (
                  <FadeIn delay={200}>
                    <HeaderBar
                      openHome={() => { }}
                      openMenu={() => { }}
                      isLogoNotVisible
                      curIndex={date}
                      selectedDropdownDate={date}
                      setSelectedDropdownDate={setDate}
                      datePickerVisible={isInternalCreator}
                      userLoggedIn={true}
                      userImageVisible={true}
                      reload={reload}
                    />
                  </FadeIn>
                ) : (
                  <HeaderBar
                    openHome={() => { }}
                    openMenu={() => { }}
                    isLogoNotVisible
                    curIndex={date}
                    selectedDropdownDate={date}
                    setSelectedDropdownDate={setDate}
                    datePickerVisible={isInternalCreator}
                    userLoggedIn={true}
                    userImageVisible={true}
                    reload={reload}
                  />
                ) : null}
            </div>
            <Switch>
              <Route
                exact
                path="/new-landing"
                component={NewLandingPage}
              />
              <Route
                exact
                path="/home/dummy"
                userDetails={userDetails}
                isLogged
                component={DummyHomePage}
              />
              <Route
                exact
                path="/swiper"
                userDetails={userDetails}
                isLogged
                render={(props) => (
                  <HomePage
                    date={date}
                    reload={reload}
                    setReload={setReload} />
                )}
              />

              <Route
                exact
                path="/drop/:id"
                component={DropPage}
              />
              <Route
                path="/terms"
                render={(props) => <TermsAndConditions {...props} />}
              />

              <Route
                path="/create"
                render={(props) => <ProfileForm />}
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
                path="/verify/signin"
                render={(props) => <Verify {...props} />}
              />

              <Route
                path="/verify/signup"
                render={(props) => <SignupVerify {...props} />}
              />

              <Route
                path="/getToken"
                render={(props) => <GetToken {...props} />}
              />

              <Route
                path="/upgradeSub"
                render={(props) => <UpgradeSub {...props} />}
              />

              {/* <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage
                  reload={reload}
                  setReload={setReload} />
              )}
            /> */}

              <Route
                exact
                path="/"
                component={NewLandingPage}
              />


              <PrivateRoute
                path="/create_drop"
                component={CreateDropPage}
              />

              <PrivateRoute
                path="/settings"
                component={SettingsPage}
                userImage={userDetails.image}
                userDetails={userDetails}
                userLoggedIn={true}
                reload={reload}
                setReload={setReload}
              />

              <PrivateRoute
                path="/subscription"
                component={SubscriptionPage}
                userImage={userDetails.image}
                userDetails={userDetails}
                userLoggedIn={true}
                reload={reload}
                setReload={setReload}
              />

              <Route
                path="/reswipe"
                component={Reswipe}
              />


              <Route path="/signup2" render={(props) => <Signup2 {...props} />} />
              <Route path="/signup" component={Signup} />
              <Route path="/login/redirect/:id" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/magic" component={MagicLogin} />
              <Route path="/forgot-password" component={ForgotPassword} />

              <Route
                path="/profile/saved"
                render={(props) => (
                  <Profile
                    {...props}
                    reload={reload}
                    setReload={setReload}
                    userImage={userDetails.image}
                    userDetails={userDetails}
                    userLoggedIn={true}
                  />
                )}
              />

              <Route
                path="/profile/:id"
                render={(props) => (
                  <ProfilePage
                    {...props}
                    reload={reload}
                    setReload={setReload}
                    userImage={userDetails.image}
                    userDetails={userDetails}
                    userLoggedIn={true}
                  />
                )}
              />

              <Route
                path="/profile"
                render={(props) => (
                  <Profile
                    {...props}
                    reload={reload}
                    setReload={setReload}
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

              <Route exact path="/oldLandingPage" component={PersonalLinksHome} />

              <Route exact path="/logout" render={(props) => {
                LogoutCurrentUser().then(() => {
                  dispatch(removeAuthTokenAndUserId())
                  props.history.push('/')
                })
                  .catch(() => {
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

              <PrivateRoute path="/home"
                component={ExploreGalleries}
                reload={reload}
                setReload={setReload}
              />
              <PrivateRoute path="/metaurl" component={DropMagnet} />
              <PrivateRoute path="/my-gallery" component={MyGallery} />
              <Route path="/politician" component={Politician} />
              <Route path="/movie-farm" render={() => <MovieFarm />} />
            </Switch>
          </Router>
        // </MoralisProvider>
      }
    </>
  );
}

export default App;
