// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface IERC2981Royalties {
    function royaltyInfo(uint256 _tokenId, uint256 _value) external view  returns (address _receiver, uint256 _royaltyAmount);
}

contract Royalties is IERC2981Royalties, ERC165{
    struct RoyaltyInfo {
      address recipient;
      uint24 amount;
    }

    mapping(uint256 => RoyaltyInfo) internal _royalties;

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
      return interfaceId == type(IERC2981Royalties).interfaceId || super.supportsInterface(interfaceId);
    }

    function _setTokenRoyalty( uint256 tokenId, address recipient, uint256 value) internal {
      require(value <= 10000, 'ERC2981Royalties: Too high');
      _royalties[tokenId] = RoyaltyInfo(recipient, uint24(value));
    }

    function royaltyInfo(uint256 tokenId, uint256 value) external view override returns (address receiver, uint256 royaltyAmount)
    {
      RoyaltyInfo memory royalties = _royalties[tokenId];
      receiver = royalties.recipient;
      royaltyAmount = (value * royalties.amount) / 10000;
    }
}

contract Horses is ERC1155, Royalties, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Horse{
      uint256 id;
      string uri; // json uri
    }

    // Contract name
    string public name;

    // Contract symbol
    string public symbol;

    string gateway = "https://gray-occasional-firefly-693.mypinata.cloud";
    string url = "/ipfs/QmPKLrqLHQQzFnXTd7GK5EWsqk5aHxdoBi9n6Jndx2St6t/";
    string extension =  ".json";

    Horse[] horses;

    constructor() ERC1155("") {
      name = "Ambassad'Horse";
      symbol = "ZEHORSE";

      init();
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, Royalties) returns (bool){
      return super.supportsInterface(interfaceId);
    }

    function setURI(string memory newUri, uint256 tokenId) public onlyOwner {
      horses[tokenId].uri = newUri;
    }

    function uri(uint256 id) public view virtual override returns (string memory) {
      return horses[id].uri;
    }

    function getHorses() public view returns (Horse[] memory) {
      return horses;
    }

    function getHorse(uint256 tokenId) public view returns (Horse memory) {
      return horses[tokenId];
    }

    function mintHorse(address account, uint256 amount, string memory _uri) public onlyOwner returns (uint) {
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();
      horses.push(Horse(newItemId, _uri));
      _mint(account, newItemId, amount, "");
      _setTokenRoyalty(newItemId, msg.sender, 1000);

      return newItemId;
    }

    // Init a set of horses for demo
    function init()public {
      mintHorse(
        msg.sender,
        200,
        string(abi.encodePacked(gateway, url, "1", extension))
      );
      mintHorse(
        msg.sender,
        140,
        string(abi.encodePacked(gateway, url, "2", extension))
      );
      mintHorse(
        msg.sender,
        150,
        string(abi.encodePacked(gateway, url, "3", extension))
      );
      mintHorse(
        msg.sender,
        180,
        string(abi.encodePacked(gateway, url, "4", extension))
      );
      mintHorse(
        msg.sender,
        160,
        string(abi.encodePacked(gateway, url, "5", extension))
      );
      mintHorse(
        msg.sender,
        250,
        string(abi.encodePacked(gateway, url, "6", extension))
      );
      mintHorse(
        msg.sender,
        220,
        string(abi.encodePacked(gateway, url, "7", extension))
      );
    }
}