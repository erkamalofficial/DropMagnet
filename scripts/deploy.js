/**
 * Deploy Smart Contract script.
 *
 * @author Martin Bullman <cryptonight1988@gmail.com>
 */
async function main() {
    const DropMagnet = await ethers.getContractFactory("DropMagnetNFT");

    // Start deployment, returning a promise that resolves to a contract object
    const dropMagnet = await DropMagnet.deploy();
    console.log("Contract deployed to address:", dropMagnet.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });