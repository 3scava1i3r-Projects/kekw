"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var test = document.getElementById("test");
var meme = document.getElementById("meme-image");
var contractAddress = "0x248dD7b699042C53fAc61A8f4efA15f413E5477b";
var contract_json;
fetch("../artifacts/MyNFT.json").then(function (res) {
  return res.json();
}).then(function (result) {
  contract_json = result;
});
var Web3Modal = window.Web3Modal["default"];
var WalletConnectProvider = window.WalletConnectProvider["default"];
var selectedACC;
var metadata_hash = null;
var nonce_needed = null;
var contract = null;
var NFTName = null;
var NFTDescription = null;

var ConnectWallet = function ConnectWallet() {
  var providerOptions, web3Modal, provider, web3, accounts, chainId, nftContract, nonce;
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
          nftContract = new web3.eth.Contract(contract_json.abi, contractAddress);
          contract = nftContract;
          console.log(contract);
          _context.next = 20;
          return regeneratorRuntime.awrap(web3.eth.getTransactionCount(selectedACC, "latest"));

        case 20:
          nonce = _context.sent;
          nonce_needed = nonce.toString();

          if (selectedACC != null | undefined) {
            console.log(selectedACC);
          } else {
            console.log("yo! connect the damn wallet");
          }

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
};

;
web3btn.addEventListener("click", function () {
  ConnectWallet();
});
document.getElementById("nft-file-input").addEventListener("change", function _callee(res) {
  var pinataApiKey, pinataSecretApiKey, url, jsonUrl, data;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pinataApiKey = "a770d310d147135d5ec4";
          pinataSecretApiKey = "076b05a1c38c2910d32a8079e1007d52b8c02264990e0af61fa0e544cd760c78";
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
              console.log("image uploaded");
            });
          })["catch"](function (error) {
            console.log(error);
          });

        case 7:
        case "end":
          return _context2.stop();
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
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(NFTDescription, NFTName, contract, metadata_hash);

          mintNFT = function mintNFT(tokenURI) {
            return regeneratorRuntime.async(function mintNFT$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
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
                      console.log(result); // The result varies by by RPC method.
                      // For example, this method will return a transaction hash hexadecimal string on success.
                    })["catch"](function (error) {
                      console.log(error);
                    });

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          };

          mintNFT(metadata_hash);
          document.querySelector(".nes-textarea").value = "";
          document.querySelector(".nes-input").value = "";

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});