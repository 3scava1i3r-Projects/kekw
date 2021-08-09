const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let selectedACC;
let chainId;

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
  chainId = await web3.eth.net.getId();
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
  setTimeout(() => {
    getNftBalance();
  }, 2000);
});

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

  /* let Moralis = window.Moralis;

  Moralis.initialize("qaLhTI9RB5qlTnmeWGChjHfPHVSV5innftpvJBmK");
  Moralis.serverURL = "https://np6vdm0epmsi.moralisweb3.com:2053/server";
  const testnetNFTs = await Moralis.Web3.getNFTs({
    address: selectedACC,
    chain: "binance",
  }); */
};
