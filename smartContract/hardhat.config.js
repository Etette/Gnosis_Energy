require("@nomicfoundation/hardhat-toolbox");

 const accounts = { mnemonic: "frozen chronic report guilt choose yellow recipe orange mosquito box robust fire",}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    chiado: {
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: accounts,
    }
  }
};
