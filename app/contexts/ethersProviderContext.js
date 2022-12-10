import React, { useState, useEffect } from "react"
import { hasMetamask } from "../utils/hasMetamask"

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

// Import the ethers library
import { ethers } from "ethers"

import AsyncStorage from "@react-native-async-storage/async-storage"

const EthersContext = React.createContext(null)

export const EthersProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    if (hasMetamask()) {
      // connect
      window.ethereum.on("connect", (accounts) => {
        console.log("connect")
        setAccount(accounts[0])
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
      // chain
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("chainChanged")
        console.log({ chainId })
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
      // disconnect
      window.ethereum.on("disconnect", () => {
        console.log("disconnect")
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
      // accounts changed
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("accountsChanged")
        setAccount(accounts[0])
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
    }
  })

  useEffect(() => {
    if (hasMetamask()) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    }
  }, [])

  useEffect(() => {
    if (account) {
      AsyncStorage.setItem("AMBASSADHORSE_APP::ACCOUNT_VALUE", `${account}`)
      console.log({ account })
    }
  }, [account])

  useEffect(() => {
    AsyncStorage.getItem("AMBASSADHORSE_APP::ACCOUNT_VALUE").then((value) => {
      console.log({ value })
      if (value) {
        setAccount(value)
      }
    })
  }, [])

  return (
    <EthersContext.Provider value={{ account, provider, setAccount }}>
      {children}
    </EthersContext.Provider>
  )
}

export default EthersContext
