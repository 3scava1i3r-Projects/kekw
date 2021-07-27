const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const test = document.getElementById("test");
const meme = document.getElementById("meme-image");


const contractAddress = "0x248dD7b699042C53fAc61A8f4efA15f413E5477b";

let contract_json;
fetch("../artifacts/MyNFT.json")
  .then((res) => res.json())
  .then((result) => {
    contract_json = result;
  });

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let selectedACC;
let metadata_hash = null;
let nonce_needed = null
let contract = null;
let NFTName = null;
let NFTDescription = null;




const ConnectWallet = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4", // required
      },
    },
    portis: {
      package: Portis, // required
      options: {
        id: "b7d059de-0fea-4fbf-a725-143562297c30", // required
      },
    },
  };

  const web3Modal = new Web3Modal({
    providerOptions, // required
  });

  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const chainId = await web3.eth.net.getId();
  console.log(chainId);
  selectedACC = accounts[0];
  acc.innerText = selectedACC;

  const nftContract = new web3.eth.Contract(contract_json.abi, contractAddress);
  contract = nftContract;
  console.log(contract)
  const nonce = await web3.eth.getTransactionCount(
    selectedACC,
    "latest"
  )

  nonce_needed = nonce.toString();

  if ((selectedACC != null) | undefined) {
    console.log(selectedACC);
  } else {
    console.log("yo! connect the damn wallet");
  }
};;

web3btn.addEventListener("click", () => {
  ConnectWallet();
});

document.getElementById("nft-file-input").addEventListener("change", async (res) => {
  
  const pinataApiKey = "a770d310d147135d5ec4"; 
  const pinataSecretApiKey =
    "076b05a1c38c2910d32a8079e1007d52b8c02264990e0af61fa0e544cd760c78";
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
  const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  let data = new FormData();
  data.append("file", res.target.files[0]);

  axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then( (response) => {
      //handle response here
      console.log(response.data)
      console.log(`image url = https://ipfs.io/ipfs/` + response.data.IpfsHash);

      const metadata = JSON.stringify({
        name: NFTName,
        Info: {
          description: NFTDescription,
          image:`https://ipfs.io/ipfs/` + response.data.IpfsHash
        },
      });

      axios
        .post(jsonUrl, metadata, {
          maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
          headers: {
            "Content-Type":'application/json',
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        })
        .then((res) =>{
          console.log(`metadata url = https://ipfs.io/ipfs/${res.data.IpfsHash}`)
          let gg = `https://ipfs.io/ipfs/${res.data.IpfsHash}`
          metadata_hash = gg
          
          console.log("image uploaded")
        })
    })
    .catch(function (error) {
      console.log(error)
    });

});


document.querySelector(".nes-input").addEventListener("change" , (r) => {
  console.log(r.target.value)
  NFTDescription = r.target.value;
})



document.querySelector(".nes-textarea").addEventListener("change", (res) => {
  console.log(res.target.value);
  NFTName = res.target.value;
});

  
document.getElementById("Submit").addEventListener("click" ,async() => {
  
  console.log(NFTDescription, NFTName,contract ,(metadata_hash))


  const mintNFT = async(tokenURI) => {
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: selectedACC,
            to: contractAddress,
            nonce: nonce_needed,
            gas: "500000",
            data: contract.methods.mintNFT(selectedACC, tokenURI).encodeABI(),
          },
        ],
      })
      .then((result) => {
        console.log(result);
        // The result varies by by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  mintNFT(metadata_hash);


  document.querySelector(".nes-textarea").value = ""
  document.querySelector(".nes-input").value = ""

  
})
