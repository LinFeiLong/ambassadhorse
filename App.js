// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import "expo-dev-client"
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { NativeBaseProvider } from "native-base"

// import { configureChains, creatClient, WagmiConfig } from "wagmi"
// import { mainnet, polygonMumbai } from "wagmi/chains"
// import { infuraProvider } from "wagmi/providers/infura"

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
// import { InjectedConnector } from "wagmi/connectors/injected"
// import { MetaMaskConnector } from "wagmi/connectors/metaMask"
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

SplashScreen.preventAutoHideAsync()

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet, polygonMumbai],
//   [infuraProvider({ apiKey: process.env.INFURA_API_KEY })],
// )

// const wagmiClient = creatClient({
//   autoConnect: true,
//   connectors: [
//     // new CoinbaseWalletConnector({ chains }),
//     // new InjectedConnector({ chains, options: { name: "Injected" } }),
//     new MetaMaskConnector({ chains }),
//     // new WalletConnectConnector({ chains }),
//   ],
//   provider,
//   webSocketProvider,
// })

function IgniteApp() {
  return (
    // <WagmiConfig client={wagmiClient}>
    <NativeBaseProvider>
      <App hideSplashScreen={SplashScreen.hideAsync} />
    </NativeBaseProvider>
    // </WagmiConfig>
  )
}

registerRootComponent(IgniteApp)
export default IgniteApp
