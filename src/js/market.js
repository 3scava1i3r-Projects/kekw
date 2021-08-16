const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");

const market_contract_address = "0xe29F63CdCF772b320Ee1075D9996873b3d2098Da";


let selectedACC;
let chainId;
let length = null;

window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";


const init = async() => {
  window.web3 = await Moralis.Web3.enable();
  window.marketContract = new web3.eth.Contract(MarketABI , market_contract_address)
  console.log(marketContract)
  const Items = await Moralis.Cloud.run("getItems");
  console.log(Items);

  getAndRenderItemData(Items , renderMarket);

  
  
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


const renderMarket = async(index) => {


  const gg = document.getElementById("market-area");
  const content = `
                        <div id="mcontainer">
                            <div id="mcard" value=${index.uid}  class="market-card">
                                <div id="content">
                                <img src="${index.Info.image}" alt="NFT image" id="nftimg" >
                                    <h2>${index.name}</h2>
                                    <h3>Owner:${index.owner}</h3>
                                    <h3 value=${index.askingPrice}>Price:${index.askingPrice}</h3>
                                    <p>${index.Info.description}</p>
                                    
                                </div>
                            </div>
                        </div>
                        `;
  gg.innerHTML += content;


  let x = document.getElementsByClassName("market-card");
  
  for (var i = 0; i < x.length; i++) {
    x[i].addEventListener(
      "click",
      function () {
        let selectedEl = document.querySelector(".selected");
        if (selectedEl) {
          selectedEl.classList.remove("selected");
        }
        this.classList.add("selected");
      },
      false
    );
  }

  document.getElementById("select").addEventListener("click", function () {
    
    var selectedEl = document.querySelector(".selected");
    if (selectedEl) {
      console.log(selectedEl.childNodes[1].childNodes[7].attributes[0].value);
      buyItem(selectedEl.attributes[1].value ,selectedEl.childNodes[1].childNodes[7].attributes[0].value );
    } else alert("please choose an option");
  });
 
}


const getAndRenderItemData = (item, renderFunction) => {
  length = item.length;
  item.map((res) => {
    if (res.tokenUri != null && res.tokenUri.slice(0, 4) == "http") {
      fetch(res.tokenUri)
      .then(async (r) => {
        r = await r.json();
        r.uid = res.uid;
        r.askingPrice = res.AskingPrice;
        r.owner = res.ownerOf;
        
        renderFunction(r);

      });      
    }
  });
};




const buyItem = async (uid,price) => {
  let user = await Moralis.User.current();
  await marketContract.methods
    .buyItem(uid)
    .send({ from: user.get("ethAddress"), value: price });


    console.log("ggwp")
};