// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Horses is ERC1155URIStorage, Ownable, ERC1155Supply, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// Useful for Marketplace
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.000000001 ether;
    address payable ownerOfContract;
    address user;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );
    ///

    struct Horse {
        uint256 id;
        string uri;
        uint256 amount;
    }

    // Contract name
    string public name;

    // Contract symbol
    string public symbol;

    string gateway = "https://gray-occasional-firefly-693.mypinata.cloud";
    string url = "/ipfs/QmPKLrqLHQQzFnXTd7GK5EWsqk5aHxdoBi9n6Jndx2St6t/";
    string extension = ".json";

    Horse[] horses;

    constructor() ERC1155("") {
        name = "Ambassad'Horse";
        symbol = "ZEHORSE";

        // Useful for Marketplace
        ownerOfContract = payable(msg.sender);
        user = 0x70ae7F5a41517aD09b1dF2E623a771E371804043;

        init();
        _setBaseURI("");
    }

    function setURI(uint256 tokenId, string memory newUri) public onlyOwner {
        _setURI(tokenId, newUri);
        horses[tokenId].uri = newUri;
        setTokenURI(tokenId, newUri);
    }

    function getHorses() public view returns (Horse[] memory) {
        return horses;
    }

    function getHorse(uint256 tokenId) public view returns (Horse memory) {
        return horses[tokenId];
    }

    function mintHorse(
        address account,
        uint256 amount,
        string memory _uri
    ) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        horses.push(Horse(newItemId, _uri, amount));
        setURI(newItemId, _uri);
        horses[newItemId].uri = _uri;
        _mint(account, newItemId, amount, "");
        // _setTokenRoyalty(newItemId, msg.sender, 1000);
        _tokenIds.increment();
        return newItemId;
    }

    // :: URI ::
    function uri(uint256 tokenId)
        public
        view
        virtual
        override(ERC1155, ERC1155URIStorage)
        returns (string memory)
    {
        return super.uri(tokenId);
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _setBaseURI(baseURI);
    }

    function setTokenURI(uint256 _tokenId, string memory _cid)
        public
        onlyOwner
    {
        _setURI(_tokenId, _cid);
    }

     // :: INTERNAL ::
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Supply, ERC1155) whenNotPaused {
        // for (uint256 i; i < ids.length; i++) {
        //     require(!votingState, "cant transfer bottle in Voting state");
        // }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // Init a set of horses for demo
    function init() public {
        // Populate horses
        mintHorse(msg.sender, 200, string(abi.encodePacked(gateway, url, "1", extension)));
        mintHorse(msg.sender, 140, string(abi.encodePacked(gateway, url, "2", extension)));
        mintHorse(msg.sender, 150, string(abi.encodePacked(gateway, url, "3", extension)));
        mintHorse(msg.sender, 180, string(abi.encodePacked(gateway, url, "4", extension)));
        mintHorse(msg.sender, 160, string(abi.encodePacked(gateway, url, "5", extension)));
        mintHorse(msg.sender, 250, string(abi.encodePacked(gateway, url, "6", extension)));
        mintHorse(msg.sender, 220, string(abi.encodePacked(gateway, url, "7", extension)));
        // Give some token to other accounts
        // safeTransferFrom(msg.sender, user, 0, 10, "");
        // safeTransferFrom(msg.sender, user, 4, 30, "");
        // safeTransferFrom(msg.sender, user, 7, 20, "");
    }
}
