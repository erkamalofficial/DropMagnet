// @title DropMagnet NFT smart contract
//
// @author Martin Bullman <cryptoknight1988@gmail.com>
// @notice This contract mints NFT's for the DropMagnet application
// @return new NFT id

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DropMagnetNFT is ERC721URIStorage, Ownable {
    // counter to keep track of the number of NFT's minted and there ID's
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;

    // create a new ERC721 DropMagnet token.
    constructor() public ERC721("DropMagnetNFT", "DropMagnet") {}

    // main DropMagnet method too mint new NFT's.
    function mintNFT(address recipient, string memory hash, string memory metadata) public
    returns (uint256)
    {
        require(hashes[hash] != 1);
        hashes[hash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadata);
        return newItemId;
    }
}
