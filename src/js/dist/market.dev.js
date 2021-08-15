"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var market_contract_address = "0xe29F63CdCF772b320Ee1075D9996873b3d2098Da";
var selectedACC;
var chainId;
window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";

var init = function init() {
  var Items;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Moralis.Web3.enable());

        case 2:
          window.web3 = _context.sent;
          window.marketContract = new web3.eth.Contract(MarketABI, market_contract_address);
          _context.next = 6;
          return regeneratorRuntime.awrap(Moralis.Cloud.run("getItems"));

        case 6:
          Items = _context.sent;
          console.log(Items);
          renderMarket(Items);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

init();

var ConnectWallet = function ConnectWallet() {
  var user, accounts, _chainId;

  return regeneratorRuntime.async(function ConnectWallet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Moralis.Web3.authenticate());

        case 3:
          user = _context2.sent;

          if (!user) {
            _context2.next = 13;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(web3.eth.getAccounts());

        case 7:
          accounts = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(web3.eth.net.getId());

        case 10:
          _chainId = _context2.sent;
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

        case 13:
          if (selectedACC != null || undefined) {
            console.log(selectedACC);
          } else {
            console.log("yo! connect the damn wallet");
          }

          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});

var getNftBalance = function getNftBalance() {
  var options;
  return regeneratorRuntime.async(function getNftBalance$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          options = {
            method: "GET"
          }; // bsc testnet api link => https://api.covalenthq.com/v1/97/address/0x55590DcD461Ce79eB2280Cd1446932b46112AFc9/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:?nft=true

          fetch("https://testnets-api.opensea.io/api/v1/assets?format=json&limit=40&offset=0&order_direction=desc&owner=0x55590DcD461Ce79eB2280Cd1446932b46112AFc9", options).then(function (s) {
            return s.json();
          }).then(function (_char) {
            _char.assets.map(function (res, i) {
              try {
                var image;

                if (res.image_url === ("" && null && undefined)) {
                  image = "https://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552";
                } else {
                  image = res.image_url;
                }

                var gg = document.getElementById("market-area");
                var content = "\n                        <div id=\"mcontainer\">\n                            <div id=\"mcard\">\n                                <div id=\"content\">\n                                <img src=\"".concat(image, "\" alt=\"NFT image\" id=\"nftimg\" >\n                                    <h2>").concat(res.name, "</h2>\n                                    <h3>").concat(res.asset_contract.address, "</h3>\n                                    <h3>Price:</h3>\n                                    <p>").concat(res.asset_contract.asset_contract_type, "</p>\n                                    <a class=\"nes-btn\" href=\"\">Buy</a>\n\n                                </div>\n                            </div>\n                        </div>\n                        ");
                gg.innerHTML += content;
              } catch (e) {
                console.log(e);
              }
            });
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var Market = function Market() {};