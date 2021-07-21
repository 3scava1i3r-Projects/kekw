const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");


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
  console.log(chainId)
  selectedACC = accounts[0];
  acc.innerText = selectedACC;

  if ((selectedACC != null) | undefined) {
    console.log(selectedACC)
  } else {
    console.log("yo! connect the damn wallet");
  }
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
});

