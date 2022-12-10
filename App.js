// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import "expo-dev-client"
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"
import { NativeBaseProvider } from "native-base"
import { EthersProvider } from "./app/contexts/ethersProviderContext"
import { Provider as PaperProvider } from "react-native-paper"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return (
    <EthersProvider>
      <NativeBaseProvider>
        <PaperProvider>
          <App hideSplashScreen={SplashScreen.hideAsync} />
        </PaperProvider>
      </NativeBaseProvider>
    </EthersProvider>
  )
}

registerRootComponent(IgniteApp)
export default IgniteApp
