import React, {useRef, useState, useEffect} from "react"
import Marquee from "react-fast-marquee"
import BAYC from "./imgs/BAYC.png"
import BB from "./imgs/BB.jpg"
import CC from "./imgs/CC.png"
import CK from "./imgs/CK.gif"
import CP from "./imgs/CP.png"
import DF from "./imgs/DF.png"
import Dood from "./imgs/Dood.jpg"
import Fir from "./imgs/Fir.jpg"
import FND from "./imgs/FND.png"
import KGF from "./imgs/KGF.gif"
import SNBZ from "./imgs/SNBZ.gif"
import VF from "./imgs/VF.png"
import WOW from "./imgs/WOW.gif"

import logo from "../dropMagnet/assets/logo.svg"

import { getUserProfile } from "../../DropMagnetAPI"
import Web3 from "web3";
import Web3Modal, { getProviderInfoByName } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink"
import * as DropMagnetAPI from "../../DropMagnetAPI"

import axios from "axios"

import { useAuth } from "../../contexts/FirebaseAuthContext";
import { Link, useHistory, useParams } from "react-router-dom";


export const NewLandingPage = () => {

    const collections = [
        {name: "CryptoPunks", link: CP},
        {name: "BAYC", link: BAYC},
        {name: "Doodles", link: Dood},
        {name: "Cool Cats", link: CC},
        {name: "World Of Women", link: WOW},
        {name: "CyberKongz", link: CK},
        {name: "DeadFellaz", link: DF},
        {name: "Firat NFTs Collection", link: Fir},
        {name: "VeeFriends", link: VF},
        {name: "Killer GF", link: KGF},
        {name: "FND NFT", link: FND},
        {name: "SuperNormalbyZipcy", link: SNBZ},
        {name: "Boss Beauties", link: BB},
    ]

    let pubAdd = JSON.stringify(localStorage.getItem('publicAddress'))
    const { id } = useParams()
    console.log(id)
  
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, signInWithCustomToken, currentUser, sendSignInLinkToEmail } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
  
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
  
        let tk = await res.user.getIdToken()
  
        getUserProfile(res.user.uid, tk).then(function (response) {
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
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  
  
    async function handleSubmitEmailLink(e) {
      e.preventDefault();
  
      try {
        setError("");
        setLoading(true);
        const email = emailRef.current.value
  
        let res = await DropMagnetAPI.isUser(email)
  
        console.log(res)
  
        if (res.status) {
          sendSignInLinkToEmail(email)
            .then(res => {
              localStorage.setItem('emailForSignIn', email)
              setMessage("Email link sent. Please check email.")
              setLoading(false)
            })
            .catch(error => {
              setError(error.message);
              setLoading(false);
            });
        }
  
        else{
          setError("This email is not registered.");
          setLoading(false);
        }
  
  
      } catch (err) {
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
  
      let tk = await res.user.getIdToken()
      localStorage.setItem("token", tk)
  
      await getUserProfile(res.user.uid, tk)
      .then((response) => {
        console.log('user profile response', response)
        if(response === null) {
          history.push("/create")
        }
        else {
        if (response?.status === "error") {
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
      }
      })
    }
  
    const signMessageV2 = async (web3, accounts, nonce) => {
      let _signature, token
  
      await web3.eth.personal.sign(
        web3.utils.fromUtf8(`Sign In to DropMagnet: ${nonce.nonce}`),
        accounts[0],
        (err, signature) => {
          if (err) console.log(err)
          _signature = signature
          console.log("signature: ", signature, _signature)
        }
      )
  
      await axios.post("https://drop-api-rnd454q4pa-ew.a.run.app/auth", {
        addr: accounts[0], 
        sig: _signature,
      })
      .then(res => {
        console.log(res.data.token)
        token = res.data.token
      })
      .catch(err => {
        if (err.message.includes("401")) {
          // history.push("/getToken")
          setError("No access")
        }
      })
  
      localStorage.setItem('token', token)
      await userLogin(token)
    }
  
    const signMessage = async (web3, accounts, nonce) => {
      console.log(nonce.token)
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
      const wb = new Web3(provider);
      setLoading(true)
      let accounts = await wb.eth.getAccounts()
        .then(acc => acc)
      let nonce = await DropMagnetAPI.getNonce(accounts[0])
  
      // await signMessage(wb, accounts, nonce);
      await signMessageV2(wb, accounts, nonce)
    }

    useEffect(() => {
        const user = localStorage.getItem("userDetails")
        if (user) {
            history.push("/home")
        }
    }, [])

    return (
        <>
            <div className="landing-page">
            <div className="blur-background">
                <div className="blur-background__content"></div>
            </div>
            <div className="landing">
                <div className="landing__early-access">
                    <h5>Early Access is <span className="landing__early-access-live">live</span></h5>
                </div>
                <div className="landing__main-content">
                    <div className="landing__main-content__logo">
                        <img src={logo} alt="logo" />
                        <h1 className="landing__main-content__logo__text">drop magnet</h1>
                    </div>
                    <h4>Discover NFTs from verified collections and build your web3 social page with DropSwipe.</h4>
                    <button className="landing__main-content__button" onClick={connectWallet} >Connect Wallet</button>
                    <h4>Early access is available for collectors of Crypto Punks & Bored Apes.</h4>
                    <h4>Live collections:</h4>
                    <Marquee className="landing__main-content__slider" direction="right" gradient={false}>
                        {collections.map((el, i) => (
                            <span key={i} className="landing__main-content__slider__item">
                                <img src={el.link} alt={el.name} />
                                {el.name}
                            </span>
                        ))}
                    </Marquee>
                    <h3><a href="/">Watch video</a></h3>
                    <h4><a href="/">Twitter</a> | <a href="/">Discord</a> | <a href="/">Mirror</a></h4>
                </div>
                <div className="landing__footer">
                    <h5>DrowSwipe™ and ReSwipe™ are patent-pending.</h5>
                    <div className="landing__footer__links">
                        <h5><a href="/">Terms & Conditions</a></h5>
                        <h5><a href="/">Privacy Policy</a></h5>
                        <h5>© DropMagnet 2022</h5>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}