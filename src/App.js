import logo from './logo.svg';
import './App.css';
import Home from './pages/home/index'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import TermsAndConditions from './pages/terms';
import DropCreation from './pages/create_drop';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import SquareGallery from './pages/galleries/square-gallery';
import MagGallery from './pages/galleries/mag-gallery';
import WalletLinks from './pages/wallet/wallet-links';
import PersonalLinks from './pages/wallet/personal-links';
import NftDisplay from './pages/wallet/nft-display';
import ConnectedWallets from './pages/wallet/connected-wallets';
import { useState, useEffect } from 'react';
import { FirebaseAuthProvider } from "../src/contexts/FirebaseAuthContext"
import firebase from "firebase/app";

// wallet connect and reading NFT's packages.
import { FetchWrapper } from "use-nft";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from 'axios';

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
  window.addEventListener('load', function() {
    let web3       = null;
    const ethereum = window.ethereum;

    // Modern DApp Browsers
    if (window.ethereum) {
      let web3 = new Web3(ethereum);

      try {
        ethereum.enable().then(function () {
          // User has allowed account access to DApp...
          web3.eth.getAccounts().then((accounts) => {

            // URLS to get the TX or NFT's for a given wallet address.

            // rinkeby testnet
            //let url = 'https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address='   + accounts[0]  +  '&startblock=0&endblock=99999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'
            let url = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=' + accounts[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'

            // main net
            //let url = 'https://api.etherscan.io/api?module=account&action=txlist&address='   + accounts[0]  +  '&startblock=0&endblock=99999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'
            //let url = 'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' + accounts[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'

            axios.post(url)
              .then(async (resp) => {
                for (const entry of resp.data.result) {
                  let contractAddress = entry.contractAddress;
                  let tokenId = entry.tokenID

                  const fetcher = ["ethers", { ethers, provider: ethers.getDefaultProvider() }]
                  const fetchWrapper = new FetchWrapper(fetcher)
                  const result = await fetchWrapper.fetchNft(
                      // sample NFT contract address and token ID which can be used for testing
                      //"0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
                      //"90473"
                      contractAddress,
                      tokenId
                  )

                  // just logging the NFT meta data here but they con be stored or displayed in a gallery as needed.
                  console.log(result)
                  console.log(result.image)
                }
              })
              .catch((error) => {
                console.log(error)
              })
          })
        });
      }
      catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      let web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert('You have to install MetaMask !');
    }
  });


  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    let user = {
      "name": "Crypto Art Man",
      "handle": "cryptoartman",
      "bio": "The Drop From Space is a piece that signifies the launch of this incredible app — Drop Magnet! Designed by the lead designer of Drop Magnet, it’ll be available for auction on Crypto Art Man’s OpenSea page from this Friday onwards.",
      "image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg"
    }
    console.log('user in app', user)
    setUserDetails(user)
  }, [])


  return (
    <Router>
      <FirebaseAuthProvider>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/terms" render={(props) => <TermsAndConditions {...props} />} />
          <Route path="/square_gallery" render={(props) => <SquareGallery {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/mag_gallery" render={(props) => <MagGallery {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/create_drop" render={(props) => <DropCreation {...props} userHandle={userDetails.handle} />} />
          <Route path="/signup" render={(props) => <Signup {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/profile" render={(props) => <Profile {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/wallet_links" render={(props) => <WalletLinks {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/nfts" render={(props) => <NftDisplay {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/cw" render={(props) => <ConnectedWallets {...props} userDetails={userDetails} userLoggedIn={true} />} />
          <Route path="/personal_links" render={(props) => <PersonalLinks {...props} userDetails={userDetails} userLoggedIn={true} />} />
        </Switch>
      </FirebaseAuthProvider>
    </Router>
  );
}

export default App;
