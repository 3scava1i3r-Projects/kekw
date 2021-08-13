"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var test = document.getElementById("test");
var meme = document.getElementById("meme-image");
var selectedACC;
var metadata_hash = null;
var nonce_needed = null;
var contract = null;
var NFTName = null;
var NFTDescription = null;
var Token_Contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
window.Moralis.initialize("blsLc1NuNfu2igM14Qm8LTlUe39ZgtDoTxivCCPE");
window.Moralis.serverURL = "https://kndishhdb8oi.moralisweb3.com:2053/server";

var init = function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Moralis.Web3.enable());

        case 2:
          window.web3 = _context.sent;
          console.log(window);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

init();

var ConnectWallet = function ConnectWallet() {
  var user, accounts, chainId;
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
          chainId = _context2.sent;
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

        case 13:
          if (selectedACC != null | undefined) {
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
document.getElementById("nft-file-input").addEventListener("change", function _callee(res) {
  var pinataApiKey, pinataSecretApiKey, url, jsonUrl, data;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          pinataApiKey = process.env.pinataApiKey;
          pinataSecretApiKey = process.env.pinataSecretApiKey;
          url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
          jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
          data = new FormData();
          data.append("file", res.target.files[0]);
          axios.post(url, data, {
            maxBodyLength: "Infinity",
            //this is needed to prevent axios from erroring out with large files
            headers: {
              "Content-Type": "multipart/form-data; boundary=".concat(data._boundary),
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
            }
          }).then(function (response) {
            //handle response here
            console.log(response.data);
            console.log("image url = https://ipfs.io/ipfs/" + response.data.IpfsHash);
            var metadata = JSON.stringify({
              name: NFTName,
              Info: {
                description: NFTDescription,
                image: "https://ipfs.io/ipfs/" + response.data.IpfsHash
              }
            });
            axios.post(jsonUrl, metadata, {
              maxBodyLength: "Infinity",
              //this is needed to prevent axios from erroring out with large files
              headers: {
                "Content-Type": 'application/json',
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
              }
            }).then(function (res) {
              console.log("metadata url = https://ipfs.io/ipfs/".concat(res.data.IpfsHash));
              var gg = "https://ipfs.io/ipfs/".concat(res.data.IpfsHash);
              metadata_hash = gg;
              swal("image uploaded");
            });
          })["catch"](function (error) {
            console.log(error);
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
document.querySelector(".nes-input").addEventListener("change", function (r) {
  console.log(r.target.value);
  NFTDescription = r.target.value;
});
document.querySelector(".nes-textarea").addEventListener("change", function (res) {
  console.log(res.target.value);
  NFTName = res.target.value;
});
document.getElementById("Submit").addEventListener("click", function _callee2() {
  var mintNFT;
  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(NFTDescription, NFTName, contract, metadata_hash);

          mintNFT = function mintNFT(tokenURI) {
            return regeneratorRuntime.async(function mintNFT$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    ethereum.request({
                      method: "eth_sendTransaction",
                      params: [{
                        from: selectedACC,
                        to: contractAddress,
                        nonce: nonce_needed,
                        gas: "500000",
                        data: contract.methods.mintNFT(selectedACC, tokenURI).encodeABI()
                      }]
                    }).then(function (result) {
                      console.log(result); // The result varies by  RPC method.
                      // For example, this method will return a transaction hash hexadecimal string on success.
                    })["catch"](function (error) {
                      console.log(error);
                    });

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          };

          mintNFT(metadata_hash);
          document.querySelector(".nes-textarea").value = "";
          document.querySelector(".nes-input").value = "";

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});