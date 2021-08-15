"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var selectedACC;
var chainId;
var Token_Contract_Address = "0x514066a543d8Df91680b140d1d5190396cA37Eeb";
window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";

var init = function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Moralis.Web3.enable());

        case 2:
          window.web3 = _context.sent;
          getNftBalance();

        case 4:
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

var getAndRenderItemData = function getAndRenderItemData(item, renderFunction) {
  item.map(function (res) {
    if (res.Metadata != null && res.Metadata.slice(0, 4) == "http") {
      fetch(res.Metadata).then(function _callee(r) {
        return regeneratorRuntime.async(function _callee$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(r.json());

              case 2:
                r = _context3.sent;
                console.log(r);
                r.TokenId = res.TokenId;
                renderFunction(r);
                /* if (r.status != 404) {
                let l = r.json();
                
                l.TokenId = res.TokenId;
                console.log(l);
                renderFunction(l);
                
                  
                } else {
                  let l = {
                    name: null,
                    Info: {
                      description: null,
                      image: "https://lettertrein.be/images/Error/404.gif",
                    },
                  };
                  l.TokenId = res.TokenId;
                  console.log(l);
                  renderFunction(l);
                }
                */

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        });
      });
      /* .then((final) => console.log(final)) */
    }
  });
};

var RenderUserItems = function RenderUserItems(inputData) {
  var gg = document.getElementById("nft-balance");
  var content = "\n                    <div id=\"container\">\n                        <div id=\"card\">\n                            <div id=\"content\">\n                              <img src=\"".concat(inputData.Info.image, "\" alt=\"NFT image\" id=\"nftimg\" >\n                                <h2>").concat(inputData.name, "</h2>\n                                <h3>").concat(inputData.TokenId, "</h3>\n                                <p>").concat(inputData.Info.description, "</p>\n                              </div>\n                          </div>\n                      </div>\n                        ");
  gg.innerHTML += content;
};

var getNftBalance = function getNftBalance() {
  var ownerItems;
  return regeneratorRuntime.async(function getNftBalance$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Moralis.Cloud.run("getUserItems"));

        case 2:
          ownerItems = _context4.sent;
          console.log(ownerItems);
          getAndRenderItemData(ownerItems, RenderUserItems);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});