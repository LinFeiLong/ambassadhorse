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

contract HorsesSFT is ERC1155, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Horse{
        string name;
        uint height;
        bool hair;
    }
    Horse[] horses;
    constructor() ERC1155("https://ipfs.io/votrehash/{id}.json") {}

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, Royalties) returns (bool){
        return super.supportsInterface(interfaceId);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintHorse(address account, uint256 amount, string memory _name, uint _height, bool _hair) public onlyOwner {
      _tokenIds.increment();
      horses.push(Horse(_name, _height, _hair));
      uint256 newItemId = _tokenIds.current();
      _mint(account, id, amount, "");
      _setTokenRoyalty(newItemId, msg.sender, 1000);

      return newItemId;
    }
}