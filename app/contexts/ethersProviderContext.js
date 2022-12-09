import React, { useState, useEffect } from "react"
import { hasMetamask } from "../utils/hasMetamask"

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

// Import the ethers library
import { ethers } from "ethers"

const EthersContext = React.createContext(null)

export const EthersProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    if (hasMetamask()) {
      // chain
      window.ethereum.on("chainChanged", () => {
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
      // disconnect
      window.ethereum.on("disconnect", () => {
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
      // accounts changed
      window.ethereum.on("accountsChanged", () => {
        setAccount(null)
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
      })
    }
  })

  useEffect(() => {
    if (hasMetamask()) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    }
  }, [])

  return (
    <EthersContext.Provider value={{ account, provider, setAccount }}>
      {children}
    </EthersContext.Provider>
  )
}

export default EthersContext
