// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import "expo-dev-client"
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { NativeBaseProvider } from "native-base"
import { EthersProvider } from "./app/contexts/ethersProviderContext"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
    <EthersProvider>
      <NativeBaseProvider>
        <App hideSplashScreen={SplashScreen.hideAsync} />
      </NativeBaseProvider>
    </EthersProvider>
  )
}

registerRootComponent(IgniteApp)
export default IgniteApp
