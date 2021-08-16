const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const test = document.getElementById("test");
const meme = document.getElementById("meme-image");


let selectedACC;
let metadata_hash = null;
let nonce_needed = null
let contract = null;
let NFTName = null;
let NFTDescription = null;
let NFTPrice = null;
let nftId = null;


const Token_Contract_Address = "0x514066a543d8Df91680b140d1d5190396cA37Eeb";
const market_contract_address = "0xe29F63CdCF772b320Ee1075D9996873b3d2098Da";


window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";


const init = async() => {
  window.web3 = await Moralis.Web3.enable();
  window.tokenContract = new web3.eth.Contract(MemeABI , Token_Contract_Address)
  window.marketContract = new web3.eth.Contract(
    MarketABI,
    market_contract_address
  );

  console.log(marketContract)
}

init();

const ConnectWallet = async () => {
  
  try {
      
    window.tokenContract = new web3.eth.Contract(MemeABI , Token_Contract_Address)
    let user = await Moralis.Web3.authenticate()
    
    if(user){
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();
      selectedACC = accounts[0];
      acc.innerText = selectedACC;
    }

    if ((selectedACC != null) | undefined) {
      console.log(selectedACC);
    } else {
      console.log("yo! connect the damn wallet");
    }
  } catch (e) {
    console.log(e)
  }
  
};

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
          
          swal("Good job!", "Image and Metadata Uploaded!", "success");
        })
    })
    .catch(function (error) {
      console.log(error)
    });

});


document.getElementById("name_field").addEventListener("change", (r) => {
  console.log(r.target.value);
  NFTName = r.target.value;
});

document.getElementById("price_field").addEventListener("change", (r) => {
  console.log(r.target.value);
  NFTPrice = r.target.value;

});


document.getElementById("textarea_field").addEventListener("change", (res) => {
  console.log(res.target.value);
  NFTDescription = res.target.value;
});

  
document.getElementById("Submit").addEventListener("click" ,async() => {
  
  console.log(
    NFTDescription,
    NFTName,
    tokenContract,
    metadata_hash,
    Token_Contract_Address,
    ethereum.selectedAddress);


  nftId = await mintNFT(metadata_hash);

  console.log(nftId)


  document.getElementById("name_field").value = ""
  document.getElementById("price_field").value = "";
  document.getElementById("textarea_field").value = "";
  

  
})

document.getElementById("Submit-Sell").addEventListener("click" ,async() => {

  try {
    nftId = await mintNFT(metadata_hash);
    
    await ensureMarketApprove(nftId, Token_Contract_Address);
    
    await marketContract.methods
      .addItemToMarket(nftId, Token_Contract_Address, NFTPrice)
      .send({ from: ethereum.selectedAddress });

      console.log(nftId, Token_Contract_Address, NFTPrice);
      console.log(ethereum.selectedAddress);
  } catch (e) {
    console.log(e)
  }


            swal("Good job!", "Ooooooooo! We have a NFT now", "success");


  document.getElementById("name_field").value = "";
  document.getElementById("price_field").value = "";
  document.getElementById("textarea_field").value = "";
  
})


const ensureMarketApprove = async (tokenId, tokenAddress) => {
  let user = await Moralis.User.current();
  const userAddress = user.get("ethAddress");
  const contract = new web3.eth.Contract(MemeABI, tokenAddress);
  const approvedAddress = await contract.methods.getApproved(tokenId).call({from: userAddress})
  if(approvedAddress != market_contract_address)
  {
    await contract.methods.approve(market_contract_address , tokenId).send({from:ethereum.selectedAddress});

  }

};



const mintNFT = async(tokenURI) => {

  const nonce = await web3.eth.getTransactionCount(ethereum.selectedAddress, "latest");
  nonce_needed = nonce.toString();
  
  let receipt = await tokenContract.methods.createItem(tokenURI).send({from : ethereum.selectedAddress})
    
    console.log(receipt);
    /* ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: Token_Contract_Address,
            nonce:nonce_needed,
            data: tokenContract.methods.createItem(tokenURI).encodeABI(),
          },
        ],
      })
      .then((result) => {
        console.log(result);
        
      })
      .catch((error) => {
        console.log(error);
      });   */

      return receipt.events.Transfer.returnValues.tokenId;
  };