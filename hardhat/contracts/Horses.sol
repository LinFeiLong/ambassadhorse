// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface IERC2981Royalties {
    function royaltyInfo(uint256 _tokenId, uint256 _value)
        external
        view
        returns (address _receiver, uint256 _royaltyAmount);
}

contract Royalties is IERC2981Royalties, ERC165 {
    struct RoyaltyInfo {
        address recipient;
        uint24 amount;
    }

    mapping(uint256 => RoyaltyInfo) internal _royalties;

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC2981Royalties).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _setTokenRoyalty(
        uint256 tokenId,
        address recipient,
        uint256 value
    ) internal {
        require(value <= 10000, "ERC2981Royalties: Too high");
        _royalties[tokenId] = RoyaltyInfo(recipient, uint24(value));
    }

    function royaltyInfo(uint256 tokenId, uint256 value)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalties = _royalties[tokenId];
        receiver = royalties.recipient;
        royaltyAmount = (value * royalties.amount) / 10000;
    }
}

contract Horses is ERC1155URIStorage, Royalties, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// Useful for Marketplace
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;
    address payable ownerOfContract;

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

        init();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, Royalties)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setURI(uint256 tokenId, string memory newUri) public onlyOwner {
        _setURI(tokenId, newUri);
        horses[tokenId].uri = newUri;
    }

    function setBaseURI(string memory baseURI) internal virtual {
        _setBaseURI(baseURI);
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
        _setTokenRoyalty(newItemId, msg.sender, 1000);
        _tokenIds.increment();
        return newItemId;
    }

    // Init a set of horses for demo
    function init() public {
        mintHorse(msg.sender, 200, string(abi.encodePacked(gateway, url, "1", extension)));
        mintHorse(msg.sender, 140, string(abi.encodePacked(gateway, url, "2", extension)));
        mintHorse(msg.sender, 150, string(abi.encodePacked(gateway, url, "3", extension)));
        mintHorse(msg.sender, 180, string(abi.encodePacked(gateway, url, "4", extension)));
        mintHorse(msg.sender, 160, string(abi.encodePacked(gateway, url, "5", extension)));
        mintHorse(msg.sender, 250, string(abi.encodePacked(gateway, url, "6", extension)));
        mintHorse(msg.sender, 220, string(abi.encodePacked(gateway, url, "7", extension)));
    }

    /* Creates a sale */
    function createMarketSale(uint256 tokenId) public payable // uint256 amount
    {
        uint256 price = 1;
        address seller = msg.sender;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        // safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
        payable(ownerOfContract).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    // Attempt to do a Marketplace

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice) public payable {
        require(ownerOfContract == msg.sender, "Only marketplace owner can update listing price.");
        listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        uint256 ammount
    ) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        safeTransferFrom(msg.sender, address(this), tokenId, ammount, "");
        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(
        uint256 tokenId,
        uint256 price,
        uint256 amount
    ) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(msg.value == listingPrice, "Price must be equal to listing price");
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId, uint256 amount) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        payable(ownerOfContract).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
