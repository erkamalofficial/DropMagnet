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

// const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, {
//     extensions: [new OAuthExtension()],
// });


const MagicLogin = () => {

    console.log(uuidv4())

    // const [provider, setProvider] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [signature, setSignature] = useState('')
    // const [web3, setWeb3] = useState(null)

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

    const signMessage = async (web3, provider) => {
        let accounts = await web3.eth.getAccounts()
            .then(acc => acc)
        await web3.eth.personal.sign("Fsdfsdfsdfsdfsdf", accounts[0], function (error, result){
            setSignature(result)
        })
        .then(console.log)

    }


    const connectWallet = async () => {
        const provider = await web3Modal.connect();
        console.log(provider)
        const wb = new Web3(provider);
        signMessage(wb, provider);
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
                    {signature !== '' && <p>Signature: {signature}</p>}
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
