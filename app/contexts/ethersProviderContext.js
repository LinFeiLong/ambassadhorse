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

  const hMM = hasMetamask()

  useEffect(() => {
    if (hMM) {
      console.log("hasMetamask1")
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    }
  }, [])

  useEffect(() => {
    if (hMM) {
      console.log("hasMetamask2")

      // chain
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("chainChanged")
        console.log({ chainId })
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })

      // accounts changed
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("accountsChanged")
        if (_.isEmpty(accounts)) {
          AsyncStorage.removeItem("AMBASSADHORSE_APP::ACCOUNT_VALUE")
          setAccount(null)
        } else {
          setAccount(accounts[0])
        }
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })

      // connect
      window.ethereum.on("connect", () => {
        console.log("connect")
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
      // disconnect
      window.ethereum.on("disconnect", () => {
        console.log("disconnect")
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
    }
  }, [hMM])

  useEffect(() => {
    AsyncStorage.getItem("AMBASSADHORSE_APP::ACCOUNT_VALUE").then((valueFromGet) => {
      console.log({ valueFromGet })
      if (valueFromGet && !account) {
        setAccount(valueFromGet)
      }
    })
  }, [])

  useEffect(() => {
    if (account) {
      AsyncStorage.setItem("AMBASSADHORSE_APP::ACCOUNT_VALUE", `${account}`)
      console.log({ account })
    }
  }, [account])

  return (
    <EthersContext.Provider value={{ account, provider, setAccount }}>
      {children}
    </EthersContext.Provider>
  )
}

export default EthersContext
