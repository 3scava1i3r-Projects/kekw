require("@nomiclabs/hardhat-waffle");

const Infura_Key = "https://rinkeby.infura.io/v3/e90bfecd04d34d1d83858a13a7202b41";
const PrivateKey = "a145bdaa05bb21fc28734ff723483e52ad72a28f5523412a85958ad0e9e50c97"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `${Infura_Key}`,
      accounts: [`0x${PrivateKey}`],
    },
  },
};
