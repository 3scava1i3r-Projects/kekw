"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var test = document.getElementById("test");
var meme = document.getElementById("meme-image");
var Web3Modal = window.Web3Modal["default"];
var WalletConnectProvider = window.WalletConnectProvider["default"];
var selectedACC;

var ConnectWallet = function ConnectWallet() {
  var providerOptions, web3Modal, provider, web3, accounts, chainId;
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
});

var getNFT = function getNFT() {};

document.getElementById("nft-file-input").addEventListener("change", function _callee(res) {
  var pinataApiKey, pinataSecretApiKey, url, data, metadata;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          /* console.log(res.target.files[0]);
          const ipfs = window.IpfsApi("gateway.ipfs.io"); // Connect to IPFS 
          const Buffer = window.IpfsApi().Buffer;
          let buf_blob = await res.target.files[0].arrayBuffer();
          let buf = Buffer(buf_blob);
           ipfs.files.add(buf, (err, result) => {
            // Upload buffer to IPFS
            if (err) {
              console.error(err);
              return;
            }
            let url = `https://ipfs.io/ipfs/${result[0].hash}`;
            console.log(`Url --> ${url}`);
          });
           ipfs.add(buf).then((res) => console.log(res)); */
          pinataApiKey = process.env.pinataApiKey;
          pinataSecretApiKey = process.env.pinataSecretApiKey;
          url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
          data = new FormData();
          /*   const ipfs = window.IpfsApi("gateway.ipfs.io"); // Connect to IPFS
            const Buffer = window.IpfsApi().Buffer;
            let buf_blob = await res.target.files[0].arrayBuffer();
            let buf = Buffer(buf_blob);
            console.log(buf) */

          data.append("file", res.target.files[0]);
          metadata = JSON.stringify({
            name: "testname",
            keyvalues: {
              exampleKey: "exampleValue"
            }
          });
          data.append("pinataMetadata", metadata);
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
            console.log("https://ipfs.io/ipfs/" + response.data.IpfsHash);
          })["catch"](function (error) {//handle error here
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});