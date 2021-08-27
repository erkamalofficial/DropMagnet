import React, { useEffect } from "react";
import Header from "./components/header/header";
import Search from "./styled-components/textfield";
import Card from "./components/card/card";
import image1 from "./assets/background.png";
import image2 from "./assets/background2.png";
import CreateURL from "./components/createurl/CreateURL";
import { FetchWrapper } from "use-nft";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from 'axios';


const MyGallery = () => {

    const fetchNFTs = () => {
        // const ethereum = window.ethereum;
        // let web3 = new Web3(ethereum);
        // ethereum.enable().then(function () {

        //     web3.eth.getAccounts().then((accounts) => {

        //         // URLS to get the TX or NFT's for a given wallet address.

        //         // rinkeby testnet
        //         //let url = 'https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address='   + accounts[0]  +  '&startblock=0&endblock=99999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'
        //         let url = 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=' + accounts[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'

        //         // main net
        //         //let url = 'https://api.etherscan.io/api?module=account&action=txlist&address='   + accounts[0]  +  '&startblock=0&endblock=99999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'
        //         //let url = 'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' + accounts[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'

        //         axios.post(url)
        //             .then(async (resp) => {
        //                 for (const entry of resp.data.result) {
        //                     let contractAddress = entry.contractAddress;
        //                     let tokenId = entry.tokenID

        //                     const fetcher = ["ethers", { ethers, provider: ethers.getDefaultProvider() }]
        //                     const fetchWrapper = new FetchWrapper(fetcher)
        //                     const result = await fetchWrapper.fetchNft(
        //                         // sample NFT contract address and token ID which can be used for testing
        //                         //"0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
        //                         //"90473"
        //                         contractAddress,
        //                         tokenId
        //                     )
        //                     console.log(result)
        //                     console.log(result.image)
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             })
        //     })
        // });
    }

    const cntWallets = JSON.parse(localStorage.getItem('cntWallets'))
    useEffect(() => {
        if (!cntWallets) {
            localStorage.setItem('cntWallets', JSON.stringify([]))
        }
    }, [cntWallets])

    useEffect(() => {
        fetchNFTs()
    }, [])

    return (
        <div style={{marginTop: '70px'}}>
            <Header />
            <Search type="search" placeholder="Search" />
            <div style={{ marginBottom: '96px' }}>
                {[1, 2, 3, 4].map(c => (
                    <Card key={c}
                        id={c}
                        nft={10} artist={"Artist.link/CryptoArtMan"} image={image1} />
                ))}
            </div>
            <CreateURL />
        </div>
    )
}


export default MyGallery