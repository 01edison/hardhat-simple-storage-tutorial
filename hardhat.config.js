require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");// gives you the gas price of function calls and contract deployment
require("solidity-coverage"); // tells you which lines in your solidity code you didnt test
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4,
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //accounts: Thanks hardhat!
      chainId: 31337,
    },
  },
  etherscan: {
    // this is for contract verification
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    // these fields can be gotten from the docs
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",  //get the amount in dollars
    coinmarketcap: process.env.COIN_MARKET_CAP_KEY,
    token: "MATIC",
  },
};
