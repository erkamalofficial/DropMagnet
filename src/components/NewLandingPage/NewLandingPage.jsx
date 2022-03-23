import React, { useState, useEffect } from "react"
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
import logo from "./imgs/logo.png"

// import logo from "../dropMagnet/assets/logo.svg"

import { getUserProfile } from "../../DropMagnetAPI"
import Web3 from "web3";
import Web3Modal, { getProviderInfoByName } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink"
import * as DropMagnetAPI from "../../DropMagnetAPI"

import axios from "axios"

import { useHistory, useParams } from "react-router-dom";
import { SignInWithCustomToken } from "../../helpers/AuthHelper"
import { useDispatch, useSelector } from "react-redux"
import { getAuthToken, getAuthTokenAndUserId } from "../../store/reducers/AuthReducer"
import { DROPMAGNET_SERVER_URL } from '../../config/constants'
import * as solanaWeb3 from '@solana/web3.js';
import Modal from "../elements/Modal/Modal"

const SOLANA_RPC_URL = 'https://api.devnet.solana.com';

export const NewLandingPage = () => {
  const { token, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const collections = [
    { name: "CryptoPunks", link: CP },
    { name: "BAYC", link: BAYC },
    { name: "Doodles", link: Dood },
    { name: "Cool Cats", link: CC },
    { name: "World Of Women", link: WOW },
    { name: "CyberKongz", link: CK },
    { name: "DeadFellaz", link: DF },
    { name: "Firat NFTs Collection", link: Fir },
    { name: "VeeFriends", link: VF },
    { name: "Killer GF", link: KGF },
    { name: "FND NFT", link: FND },
    { name: "SuperNormalbyZipcy", link: SNBZ },
    { name: "Boss Beauties", link: BB },
  ]

  const { id } = useParams()

  const [error, setError] = useState("")

  const [loading, setLoading] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const history = useHistory();

  const coinbase = getProviderInfoByName('Coinbase')

  const walletLink = new WalletLink({
    appName: "Dropmagnet",
    appLogoUrl: "https://example.com/logo.png",
    darkMode: "false"
  })

  const ethereum = walletLink.makeWeb3Provider(
    "https://ropsten.infura.io/v3/dc1c5b7b227d4885a03cf5eeb5e3224c", 1
  )

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "dc1c5b7b227d4885a03cf5eeb5e3224c",
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
    },
    // "custom-Solana": {
    //   display: {
    //     logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    //     name: 'Solana'
    //   },
    //   package: solanaWeb3,
    //   connector: async () => {
    //     const provider = window.solana;
    //     await provider.connect()
    //     return provider;
    //   }
    // },
  };

  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: providerOptions,
    theme: "dark",
  });

  // ================>Step 4
  const customTokenLogin = async (token, user_id) => { // This one is for wallet
    const res = await SignInWithCustomToken(token)
    let tk = await res.user.getIdToken()

    await getUserProfile(res.user.uid, tk).then((response) => {
      if (response === null) {
        history.push("/create")
      }
      else {
        dispatch(getAuthTokenAndUserId({ token: tk, userId: res.user.uid }))
        if (response?.status === "error") {
        } else {
          if (id) {
            history.push(`/drop/${id}`);
          }
          else {
            sessionStorage.removeItem('headerLoad')
            history.push("/swiper");
          }
        }
      }
    })
  }

  // ================>Step 3
  const authenticateSignatures = async (account, signature, chain) => {
    try {
      const authenticate = await axios.post(`${DROPMAGNET_SERVER_URL}/auth`, { addr: account, sig: signature, chain: chain })
      await customTokenLogin(authenticate.data.token, account)
    } catch (err) {
      if (err.message.includes("401")) {
        setError("access denied")
      }
    }
  }


  // ================>Step 2
  const connectToEthereumChain = async () => {
    console.log('called')
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts().then(acc => acc)
    const account = accounts[0]

    let nonce = await DropMagnetAPI.getNonce(account)
    let message = `Sign In to DropMagnet: ${nonce.nonce}`
    let _signature
    await web3.eth.personal.sign(message, account, async (err, signature) => {
      if (err) {
        console.log('Metamask Signing Error===>', err)
      }
      _signature = signature
    })
    await authenticateSignatures(account, _signature)
  }

  const connectToSolanaChain = async () => {

    const provider = window.solana;
    if (!provider) {
      console.log('No Solana based Wallet Detected')
      return
    }

    await provider.connect()
    const web3 = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('testnet'),
      'confirmed',
    );
    const account = provider.publicKey.toString()
    const chain = 'sol'

    let nonce = await DropMagnetAPI.getNonce(account, chain)
    const msg = new TextEncoder().encode(`Sign In to DropMagnet: ${nonce.nonce}`);
    const signedMessage = await window.solana.request({
      method: "signMessage",
      params: {
        message: msg,
        display: "utf8",
      },
    });
    console.log('signedMessage', signedMessage)
    const signature = signedMessage.signature
    await authenticateSignatures(account, signature, chain)
  }


  // ================>Step 1
  useEffect(() => {
    if (userId) {
      history.push("/swiper")
    }
  }, [token, userId])

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
            <div>
              <button className="landing__main-content__button" onClick={() => setConnectModal(true)} >Connect Wallet</button>
              <h4 className="landing__main-content__error">{error}</h4>
            </div>
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
            <h5>DropSwipe™ and ReSwipe™ are patent-pending.</h5>
            <div className="landing__footer__links">
              <h5><a href="/">Terms & Conditions</a></h5>
              <h5><a href="/">Privacy Policy</a></h5>
              <h5>© DropMagnet 2022</h5>
            </div>
          </div>
        </div>
      </div>

      {connectModal &&
        <Modal key={'Connect-Wallet-Button-Model'} isOpen={connectModal} onClose={() => setConnectModal(false)} showCloseButton>
          <div className="Connect-Wallet-Modal">
            <div className="Connect-Wallet-Button-Container">
              <h1>What Blockchain?</h1>
              <div className="Connect-Wallet-Button-Wrapper">
                <div className="Connect-Wallet-Button">
                  <div onClick={connectToEthereumChain} className="Connect-Wallet-Button-Img">
                    <img src="https://global-uploads.webflow.com/5ef27900119086588ee44420/6009e881ba9c2a278c623ce9_116_Ethereum_logo_logos-512.png" alt="" srcset="" />
                  </div>
                  <p>Ethereum</p>
                </div>
                <div className="Connect-Wallet-Button">
                  <div onClick={connectToSolanaChain} lassName="Connect-Wallet-Button-Img">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="" srcset="" />
                  </div>
                  <p>Solana</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      }
    </>
  )
}