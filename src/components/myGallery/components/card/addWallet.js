import React from 'react'
import styled from "styled-components";
import Web3 from "web3";
import Onboard from 'bnc-onboard'
import Web3Modal, { getProviderInfoByName } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink"

const Add = styled.div`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    cursor: pointer;
    margin: 0 auto;
    width:fit-content;
`;

const AddWallet = () => {

    let web3;

    const BLOCKNATIVE_KEY = 'ed9b93de-1eb2-418c-b7b5-f514174741cf'

    // the network id that your dapp runs on
    const NETWORK_ID = 4

    // initialize onboard
    const onboard = Onboard({
        darkMode: true,
        dappId: BLOCKNATIVE_KEY,
        networkId: NETWORK_ID,
        subscriptions: {
            wallet: async(wallet) => {
                web3 = new Web3(wallet.provider)
                // wallet.provider.enable()
                await wallet.connect()
                console.log(`${wallet.name} connected!`)
            }
        },
        walletSelect: {
            wallets: [
                { walletName: "metamask", preferred: true },
                { walletName: "coinbase", preferred: true },
                {
                    walletName: "fortmatic",
                    apiKey: "pk_live_201A6F01A7385804",
                    preferred: true
                },
                {
                    walletName: "walletConnect",
                    infuraKey: "8043bb2cf99347b1bfadfb233c5325c0"
                },
            ]
        },
        walletCheck: [
            { checkName: 'derivationPath' },
            { checkName: 'accounts' },
            { checkName: 'connect' },
        ]
    })

    // Prompt user to select a wallet


    // Run wallet checks to make sure that user is ready to transact



    const handleConnect = async () => {
        let resSelect = await onboard.walletSelect()
        let res = await onboard.walletCheck()
        console.log(res)
    }

    return (
        <Add onClick={handleConnect}>Add another wallet</Add>
    )
}

export default AddWallet
