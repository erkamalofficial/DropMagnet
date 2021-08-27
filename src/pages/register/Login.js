import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  FormWrapper,
  FormBtn,
  FormAlert,
  FormInput,
  FormLabel,
  GridItem,
} from "./FormComponents";
import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import { getUserProfile } from "../../DropMagnetAPI";
import Spinner from "../../components/blocks/spinner";

import Web3 from "web3";
import Web3Modal, { getProviderInfoByName } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink"
import * as DropMagnetAPI from "../../DropMagnetAPI"


export default function Login() {

  let pubAdd = JSON.stringify(localStorage.getItem('publicAddress'))
  const { id } = useParams()
  console.log(id)

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithCustomToken, currentUser } = useAuth();
  const [error, setError] = useState("");

  const [address, setAddress] = useState(pubAdd || '')

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Entered submit here.....")

    try {
      setError("");
      setLoading(true);
      const res = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      
      console.log(res.user.uid, res)

      
      getUserProfile(res.user.uid, res.user.Aa).then(function (response) {
        console.log('user profile response', response)
        if (response.status === "error") {
          // setLoginError(response.message);
          setLoading(false);
        } else {
          localStorage.setItem('userDetails', JSON.stringify(response));
          if (res.user.emailVerified) {
            if (id) {
              history.push(`/drop/${id}`);
            }
            else {
              sessionStorage.removeItem('headerLoad')
              history.push("/home");
            }
          } else {
            setError("Email not verified!! check your inbox and verifiy");
            setLoading(false);
          }
        }
      })
    } catch(err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const coinbase = getProviderInfoByName('Coinbase')

  const walletLink = new WalletLink({
    appName: "Dropmagnet",
    appLogoUrl: "https://example.com/logo.png",
    darkMode: "false"
  })

  const ethereum = walletLink.makeWeb3Provider(
    "https://ropsten.infura.io/v3/a789adc9c04146d88b3fb64732fbf206", 1
  )

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        key: "pk_live_201A6F01A7385804"
      }
    },
    "custom-coinbase": {
      display: {
        logo: coinbase.logo,
        name: coinbase.name
      },
      package: ethereum,
      connector: async () => {
        const provider = ethereum;
        await provider.enable()
        return provider;
      }
    }
  };

  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: providerOptions,
    theme: "dark",
  });

  const userLogin = async (token) => { // This one is for wallet
    const res = await signInWithCustomToken(token)
      .then(cred => cred)

    getUserProfile(res.user.uid, res.user.za).then(function (response) {
      console.log('user profile response', response)
      if (response.status === "error") {
        setLoading(false);
      } else {
        setLoading(false)
        localStorage.setItem('userDetails', JSON.stringify(response));
        if (id) {
          history.push(`/drop/${id}`);
          setLoading(false)
        }
        else {
          sessionStorage.removeItem('headerLoad')
          history.push("/home");
          setLoading(false)
        }
      }
    })
  }

  const signMessage = async (web3, accounts, nonce) => {
    let message = `You are signing in to DropMagnet: ${nonce.data}`
    await web3.eth.personal.sign(message, accounts[0], async function (error, result) {
      if (error) {
        console.log(error)
        alert("Error occurred!")
        setLoading(false)
      }
      else {
        const signingAddress = await web3.eth.accounts.recover(message,
          result);
        if (accounts[0] === signingAddress) {
          setLoading(true)
          localStorage.setItem('publicAddress', accounts[0])

          if (nonce.status === 0) {
            setLoading(false)
            history.push("/create")
          }
          else {
            userLogin(nonce.token)
          }
        }
        else {
          setLoading(false)
          alert("Signature not verified.")
        }
      }

    })

  }


  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    console.log(provider)
    const wb = new Web3(provider);
    setLoading(true)
    let accounts = await wb.eth.getAccounts()
      .then(acc => acc)
    let nonce = await DropMagnetAPI.getNonce(accounts[0])

    signMessage(wb, accounts, nonce);
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-left-holder">
          <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
            history.push('/');
          }} className="header-left-image clickable" src="./drop_logo.png" />

        </div>
      </div>
      <div style={{ height: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormWrapper>
          <form className="formGrid" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <FormAlert variant="danger">{error}</FormAlert>}
            {!loading ? (
              <>
                <GridItem id="email">
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" ref={emailRef} required />
                </GridItem>
                <GridItem id="password">
                  <FormLabel>Password</FormLabel>
                  <FormInput type="password" ref={passwordRef} required />
                </GridItem>
                {!loading && (
                  <FormBtn disabled={loading} className="w-100" type="submit">
                    Log In
                  </FormBtn>
                )}

                <GridItem>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </GridItem>

                <GridItem>
                  Need an account? <Link to="/signup">Sign Up</Link>
                </GridItem></>
            ) : <Spinner />}
          </form>

          {!loading && (
            <FormBtn className="w-100" type="submit"
              onClick={connectWallet}
              style={{ marginTop: "20px" }}>
              Sign In Using Wallet
            </FormBtn>
          )}

        </FormWrapper>
      </div>
    </div>
  );
}
