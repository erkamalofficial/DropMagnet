

// wallet connect and reading NFT's packages.
import { FetchWrapper } from "use-nft";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";

 const Nft = function () {
    let web3 = null;
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
            let url =
              "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=" +
              accounts[0] +
              "&startblock=0&endblock=999999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1";

            // main net
            //let url = 'https://api.etherscan.io/api?module=account&action=txlist&address='   + accounts[0]  +  '&startblock=0&endblock=99999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'
            //let url = 'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' + accounts[0] + '&startblock=0&endblock=999999999&sort=asc&apikey=4UXJPJNUIQ5BI9HGTP8WPB6S7GP65EY2H1'

            axios
              .post(url)
              .then(async (resp) => {
                for (const entry of resp.data.result) {
                  let contractAddress = entry.contractAddress;
                  let tokenId = entry.tokenID;

                  const fetcher = [
                    "ethers",
                    { ethers, provider: ethers.getDefaultProvider() },
                  ];
                  const fetchWrapper = new FetchWrapper(fetcher);
                  const result = await fetchWrapper.fetchNft(
                    // sample NFT contract address and token ID which can be used for testing
                    //"0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
                    //"90473"
                    contractAddress,
                    tokenId
                  );

                  // just logging the NFT meta data here but they con be stored or displayed in a gallery as needed.
                  console.log(result);
                  console.log(result.image);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      let web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };

  export default Nft;
