import '@nomiclabs/hardhat-etherscan'
import '@nomicfoundation/hardhat-toolbox'

import { HardhatUserConfig } from 'hardhat/config'

require("dotenv").config({ path: "../.env" })

const { INFURA_URI, POLYGONSCAN_API_KEY, PRIVATE_KEY } = process.env

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      chainId: 80001,
      from: "0x4ac8E6177D6bA59EC47087fb1fFD2F100eaFe949",
    },
    mumbai: {
      url: INFURA_URI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    currency: "EUR",
    gasPrice: 21,
    enabled: true,
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
}

export default config
