import React from 'react'
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import "./MagicLogin.css"
import { useHistory } from "react-router-dom";
// import { useWallet, UseWalletProvider } from 'use-wallet'
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
// import Coinbase from 'coinbase'


// const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, {
//     extensions: [new OAuthExtension()],
// });


const MagicLogin = () => {

    // var client = new Coinbase.Client({
    //     'apiKey': 'c8b63cd9b440d6e4f965fa2c081cea563ca248a325d5115959777d8a3700247f', 
    //     'apiSecret': '09308e58b1a3927533c6d7011841871a49b9ab4c6607a2652becdf01367a688f'
    // });

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
                key: "pk_test_AFA830F46E222207"
            }
        },

        // coinbase: {
        //     package: client,
        //     options: {
        //         apiKey: '',
        //         apiSecret: '09308e58b1a3927533c6d7011841871a49b9ab4c6607a2652becdf01367a688f'
        //     }
        // }
    };

    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        theme: "dark"
    });

    const handleLogin = async () => {
        // await magic.oauth.loginWithRedirect({
        //     provider: 'google' /* '', 'facebook', 'apple', or 'github' */,
        //     redirectURI: 'http://localhost:3000/home'
        // });
    }

    const connectWallet = async (e) => {
        e.preventDefault()
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
    }

    const history = useHistory();

    return (

        <div>
            <div className="header-container">
                <div className="header-left-holder">
                    <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
                        history.push('/');
                    }} className="header-left-image clickable" src="./drop_logo.png" />

                </div>
            </div>
            <div className="custom-login-container">
                <div className="options">


                    <div className="magic-login-box">
                        <h3>Passwordless Login</h3>
                        <button onClick={handleLogin}>Log In With Magic Link</button>
                    </div>

                    <p>or</p>

                    <div className="connect-options">
                        <button onClick={connectWallet}>Connect Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MagicLogin
