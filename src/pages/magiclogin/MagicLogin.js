import React, { useState } from 'react'
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import "./MagicLogin.css"
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import Web3Modal, { getInjectedProvider, getInjectedProviderName, getProviderInfoByName } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink"
import { v4 as uuidv4 } from 'uuid';
import * as DropMagnetAPI from "../../DropMagnetAPI"

// const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, {
//     extensions: [new OAuthExtension()],
// });


const MagicLogin = () => {

    let pubAdd = JSON.stringify(localStorage.getItem('publicAddress'))
    const [address, setAddress] = useState(pubAdd || '')

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
                key: "pk_test_AFA830F46E222207"
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

    const signMessage = async (web3, accounts, nonce) => {
        let message = `You are signing in to DropMagnet: ${nonce}`
        await web3.eth.personal.sign(message, accounts[0], async function (error, result) {
            const signingAddress = await web3.eth.accounts.recover(message,
                result);
            if(accounts[0] === signingAddress){
                localStorage.setItem('publicAddress', accounts[0])
                DropMagnetAPI.getWalletUser(accounts[0])
                .then(res => {
                    console.log(res)
                    setAddress(accounts[0])
                })
                
            }
            else{
                alert("Signature not verified.")
            }
        })

    }


    const connectWallet = async () => {
        const provider = await web3Modal.connect();
        console.log(provider)
        const wb = new Web3(provider);
        let accounts = await wb.eth.getAccounts()
            .then(acc => acc)

        let nonce = await DropMagnetAPI.getNonce(accounts[0])

        signMessage(wb, accounts, nonce.data);
    }

    // const disConnectWallet = async (e) => {
    //     if (web3 && web3.currentProvider && web3.currentProvider.close) {
    //         await web3.currentProvider.close();
    //     }
    //     await web3Modal.clearCachedProvider();
    //     // setProvider(null)
    //     setAddresses([])
    // }

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
                    {address !== '' && <p>Address: {address}</p>}
                    <div className="connect-options">
                        <button onClick={connectWallet}>Connect Wallet</button>
                        {/* {provider && <button onClick={() => disConnectWallet()}>Diconnect Wallet</button>} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MagicLogin
