"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var market_contract_address = "0xe29F63CdCF772b320Ee1075D9996873b3d2098Da";
var selectedACC;
var chainId;
var length = null;
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
          console.log(marketContract);
          _context.next = 7;
          return regeneratorRuntime.awrap(Moralis.Cloud.run("getItems"));

        case 7:
          Items = _context.sent;
          console.log(Items);
          getAndRenderItemData(Items, renderMarket);

        case 10:
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
/* 
const getNftBalance = async () => {
  const options = { method: "GET" };

  // bsc testnet api link => https://api.covalenthq.com/v1/97/address/0x55590DcD461Ce79eB2280Cd1446932b46112AFc9/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:?nft=true
  fetch(
    "https://testnets-api.opensea.io/api/v1/assets?format=json&limit=40&offset=0&order_direction=desc&owner=0x55590DcD461Ce79eB2280Cd1446932b46112AFc9",
    options
  )
    .then((s) => s.json())
    .then((char) => {
      char.assets.map((res, i) => {
        try {
          let image;

          if (res.image_url === ("" && null && undefined)) {
            image =
              "https://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg/revision/latest?cb=20110517171552";
          } else {
            image = res.image_url;
          }
          const gg = document.getElementById("market-area");
          const content = `
                        <div id="mcontainer">
                            <div id="mcard">
                                <div id="content">
                                <img src="${image}" alt="NFT image" id="nftimg" >
                                    <h2>${res.name}</h2>
                                    <h3>${res.asset_contract.address}</h3>
                                    <h3>Price:</h3>
                                    <p>${res.asset_contract.asset_contract_type}</p>
                                    <a class="nes-btn" href="">Buy</a>

                                </div>
                            </div>
                        </div>
                        `;
          gg.innerHTML += content;
        } catch (e) {
          console.log(e);
        }
      });
    });

  
}; */

var renderMarket = function renderMarket(index) {
  var gg, content, x, i;
  return regeneratorRuntime.async(function renderMarket$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          gg = document.getElementById("market-area");
          content = "\n                        <div id=\"mcontainer\">\n                            <div id=\"mcard\" value=".concat(index.uid, "  class=\"market-card\">\n                                <div id=\"content\">\n                                <img src=\"").concat(index.Info.image, "\" alt=\"NFT image\" id=\"nftimg\" >\n                                    <h2>").concat(index.name, "</h2>\n                                    <h3>Owner:").concat(index.owner, "</h3>\n                                    <h3 value=").concat(index.askingPrice, ">Price:").concat(index.askingPrice, "</h3>\n                                    <p>").concat(index.Info.description, "</p>\n                                    \n                                </div>\n                            </div>\n                        </div>\n                        ");
          gg.innerHTML += content;
          x = document.getElementsByClassName("market-card");

          for (i = 0; i < x.length; i++) {
            x[i].addEventListener("click", function () {
              var selectedEl = document.querySelector(".selected");

              if (selectedEl) {
                selectedEl.classList.remove("selected");
              }

              this.classList.add("selected");
            }, false);
          }

          document.getElementById("select").addEventListener("click", function () {
            var selectedEl = document.querySelector(".selected");

            if (selectedEl) {
              console.log(selectedEl.childNodes[1].childNodes[7].attributes[0].value);
              buyItem(selectedEl.attributes[1].value, selectedEl.childNodes[1].childNodes[7].attributes[0].value);
            } else alert("please choose an option");
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getAndRenderItemData = function getAndRenderItemData(item, renderFunction) {
  length = item.length;
  item.map(function (res) {
    if (res.tokenUri != null && res.tokenUri.slice(0, 4) == "http") {
      fetch(res.tokenUri).then(function _callee(r) {
        return regeneratorRuntime.async(function _callee$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(r.json());

              case 2:
                r = _context4.sent;
                r.uid = res.uid;
                r.askingPrice = res.AskingPrice;
                r.owner = res.ownerOf;
                renderFunction(r);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        });
      });
    }
  });
};

var buyItem = function buyItem(uid, price) {
  var user;
  return regeneratorRuntime.async(function buyItem$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Moralis.User.current());

        case 2:
          user = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(marketContract.methods.buyItem(uid).send({
            from: user.get("ethAddress"),
            value: price
          }));

        case 5:
          console.log("ggwp");

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};