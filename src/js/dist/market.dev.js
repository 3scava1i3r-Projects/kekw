"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var Web3Modal = window.Web3Modal["default"];
var WalletConnectProvider = window.WalletConnectProvider["default"];
var selectedACC;
var chainId;

var ConnectWallet = function ConnectWallet() {
  var providerOptions, web3Modal, provider, web3, accounts;
  return regeneratorRuntime.async(function ConnectWallet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          providerOptions = {
            walletconnect: {
              "package": WalletConnectProvider,
              // required
              options: {
                infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4" // required

              }
            },
            portis: {
              "package": Portis,
              // required
              options: {
                id: "b7d059de-0fea-4fbf-a725-143562297c30" // required

              }
            }
          };
          web3Modal = new Web3Modal({
            providerOptions: providerOptions // required

          });
          _context.next = 4;
          return regeneratorRuntime.awrap(web3Modal.connect());

        case 4:
          provider = _context.sent;
          web3 = new Web3(provider);
          _context.next = 8;
          return regeneratorRuntime.awrap(web3.eth.getAccounts());

        case 8:
          accounts = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(web3.eth.net.getId());

        case 11:
          chainId = _context.sent;
          console.log(chainId);
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

          if (selectedACC != null | undefined) {
            console.log(selectedACC);
          } else {
            console.log("yo! connect the damn wallet");
          }

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
  setTimeout(function () {
    getNftBalance();
  }, 2000);
});

var getNftBalance = function getNftBalance() {
  var options;
  return regeneratorRuntime.async(function getNftBalance$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
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
          /* let Moralis = window.Moralis;
           Moralis.initialize("qaLhTI9RB5qlTnmeWGChjHfPHVSV5innftpvJBmK");
          Moralis.serverURL = "https://np6vdm0epmsi.moralisweb3.com:2053/server";
          const testnetNFTs = await Moralis.Web3.getNFTs({
            address: selectedACC,
            chain: "binance",
          }); */

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};