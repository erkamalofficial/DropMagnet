/**
 * Mint new NFT's script.
 *
 * @author Martin Bullman <cryptonight1988@gmail.com>
 */
require('dotenv').config();

const API_URL     = process.env.API_URL;
const PUBLIC_KEY  = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../build/contracts/DropMagnetNFT.json");
const contractAddress = "0x89af7a3590483b4C3954A8B9f967aac3F86CE76b";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

/**
 * Creates an NFT transaction.
 *
 * @param tokenURI - the uri of the NFT meta data.
 * @returns {Promise<void>}
 */
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    // the transaction
    const tx = {
        'from' : PUBLIC_KEY,
        'to'   : contractAddress,
        'nonce': nonce,
        'gas'  : 500000,
        'data' : nftContract.methods.mintNFT(PUBLIC_KEY, 'QmRMEbUoqz6TYkLgdtyWNYn1EbbxrxASnfxSDaEu92bdm7', tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise.then((signedTx) => {

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
            if (!err) {
                console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
            }
            else {
                console.log("Something went wrong when submitting your transaction:", err)
            }
        });

    })
    .catch((err) => {
        console.log(" Promise failed:", err);
    });
}

mintNFT("https://cloudflare-ipfs.com/ipfs/QmcsLLWAD4qnbcU7E3DLnjeh5G5FeUAkvZsBChY5Rk5Ghz")
