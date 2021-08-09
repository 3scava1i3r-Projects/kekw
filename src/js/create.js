const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const test = document.getElementById("test");
const meme = document.getElementById("meme-image")



const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let selectedACC;
let selectedmeme = null;
let hh = null;
let inputarray = []
let posturl = null;
let res_url = null;

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



window.addEventListener("load", () => {
  
  getmeme();
});


const getmeme = () => {
    
    const options = { method: "GET" };
    fetch(`https://api.imgflip.com/get_memes`, options)
      .then((response) => response.json())
      .then((res) => {

        selectedmeme = res.data.memes; 
        res.data.memes.map((char, i) => {

            content = `
            <div id="meme-card" class="card-meme" >
                <div id="meme-content" value=${i}>
                    <img src="${char.url}" alt="meme-image" id="meme-image" >
                </div>
            </div>`;

            document.getElementById("meme-div").innerHTML += content;

        });

        let x = document.getElementsByClassName("card-meme");
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
          )};

        document
          .getElementById("select")
          .addEventListener("click", function () {
            var selectedEl = document.querySelector(".selected");
            if (selectedEl) {
              
              console.log(
                selectedmeme[selectedEl.children[0].attributes[1].value]
              );
              hh = selectedmeme[selectedEl.children[0].attributes[1].value];
              let lol = `
                <img src="${
                  (selectedmeme[selectedEl.children[0].attributes[1].value]).url
                }" alt="selected_meme_img" id="selected-img">
                `;

              document.getElementById("create-div").innerHTML = lol;

              for(let k=0;k<(selectedmeme[selectedEl.children[0].attributes[1].value]).box_count ;k++){
                let input_fields = `
                  <div class="meme-make-div">               
                    <input type="text" id="inline_field" class="nes-input input${k} meme-input" placeholder="Text${k + 1}">
                  </div>
                `;
                document.getElementById("create-div").innerHTML += input_fields;
              }

            }
            else alert("please choose an option");
          });
      });

}


document.getElementById("sendbtn").addEventListener("click", () => {
  console.log(hh)

  let url = `https://api.imgflip.com/caption_image?template_id=${hh.id}&username=SeekNDstroy1&password=winninguy4`;

  for (let i = 0; i < hh.box_count; i++) {
    // console.log(document.querySelector(`.input${i}`).value);
    inputarray.push(document.querySelector(`.input${i}`).value);

    url += `&text${i}=${inputarray[i]}`
    // console.log(url)

    if(i === (hh.box_count - 1)){
      posturl = url
    }
  }
  
  axios
    .post(
      posturl
    )
    .then(async(response) =>{
      console.log(response.data.data.url);
      res_url = response.data.data.url;

        const image = await fetch(res_url);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        const link = document.createElement("a");
        link.href = imageURL;
        link.download = "image file name here";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      

    })
});