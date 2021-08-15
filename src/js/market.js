const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");

const market_contract_address = "0xe29F63CdCF772b320Ee1075D9996873b3d2098Da";



let selectedACC;
let chainId;


window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";


const init = async() => {
  window.web3 = await Moralis.Web3.enable();
  window.marketContract = new web3.eth.Contract(MarketABI , market_contract_address)
  const Items = await Moralis.Cloud.run("getItems");
  console.log(Items);
  renderMarket(Items);
}

init();



const ConnectWallet = async () => {
  
  try {
      
    
    let user = await Moralis.Web3.authenticate()
    
    if(user){
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();
      selectedACC = accounts[0];
      acc.innerText = selectedACC;
    }

    if ((selectedACC != null) || undefined) {
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

  
};


const Market = () => {
  
}