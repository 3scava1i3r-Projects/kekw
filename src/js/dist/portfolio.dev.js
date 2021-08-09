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
          };
          fetch("https://testnets-api.opensea.io/api/v1/assets?format=json&limit=40&offset=0&order_direction=desc&owner=0x55590DcD461Ce79eB2280Cd1446932b46112AFc9", options).then(function (s) {
            return s.json();
          }).then(function (_char) {
            _char.assets.map(function (res, i) {
              try {
                var image;
                console.log(res.image_url);

                if (res.image_url === ("" && null && undefined)) {
                  image = "https://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552";
                } else {
                  image = res.image_url;
                }

                var gg = document.getElementById("nft-balance");
                var content = "\n                        <div id=\"container\">\n                            <div id=\"card\">\n                                <div id=\"content\">\n                                <img src=\"".concat(image, "\" alt=\"NFT image\" id=\"nftimg\" >\n                                    <h2>").concat(res.name, "</h2>\n                                    <h3>").concat(res.asset_contract.address, "</h3>\n                                    <p>").concat(res.asset_contract.asset_contract_type, "</p>\n                                    <a class=\"nes-btn\" href=\"").concat(res.permalink, "\">More info on the nft</a>\n                                </div>\n                            </div>\n                        </div>\n                        ");
                gg.innerHTML += content;
              } catch (e) {
                console.log(e);
              }
            });
          });
          /* const Moralis = window.Moralis;
           Moralis.initialize("qaLhTI9RB5qlTnmeWGChjHfPHVSV5innftpvJBmK");
          Moralis.serverURL = "https://np6vdm0epmsi.moralisweb3.com:2053/server";
          const testnetNFTs = await Moralis.Web3.getNFTs({
            address: selectedACC,
            chain: "rinkeby",
          }); */

          testnetNFTs.map(function (res, i) {
            try {
              /* const gg = document.getElementById("nft-balance");
              const content = `
                              <div id="container">
                                  <div id="card">
                                      <div id="content">
                                      <img src="${res}" alt="NFT image" id="nftimg" >
                                          <h2>${res.name}</h2>
                                          <h3>${res.token_address}</h3>
                                          <p>${res.contract_type}</p>
                                          <a href="https://testnets.opensea.io/assets/${res.token_address}/${res.token_id}">More info on the nft</a>
                                      </div>
                                  </div>
                              </div>
                              `;
              gg.innerHTML += content; */
            } catch (error) {
              console.log(error);
            }
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};