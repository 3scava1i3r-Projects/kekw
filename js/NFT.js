const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const test = document.getElementById("test");
const meme = document.getElementById("meme-image");


const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let selectedACC;

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

  if ((selectedACC != null) | undefined) {
    console.log(selectedACC);
  } else {
    console.log("yo! connect the damn wallet");
  }
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
});

const getNFT = () => {
  
}

document.getElementById("nft-file-input").addEventListener("change", async (res) => {
  
  
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



  const pinataApiKey = process.env.pinataApiKey;
  const pinataSecretApiKey = process.env.pinataSecretApiKey 
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"

  let data = new FormData();
/*   const ipfs = window.IpfsApi("gateway.ipfs.io"); // Connect to IPFS
  const Buffer = window.IpfsApi().Buffer;
  let buf_blob = await res.target.files[0].arrayBuffer();
  let buf = Buffer(buf_blob);
  console.log(buf) */
  data.append("file", res.target.files[0]);
  

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);
  
  axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      console.log(response.data)
      console.log(`https://ipfs.io/ipfs/` + response.data.IpfsHash);
    })
    .catch(function (error) {
      //handle error here
    });

});




