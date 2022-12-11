import '@nomicfoundation/hardhat-toolbox'

import { HardhatUserConfig } from 'hardhat/config'

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
    },
  },
}

export default config
