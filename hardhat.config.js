require("@nomiclabs/hardhat-waffle");

const Infura_Key = "";
const PrivateKey = ""
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
