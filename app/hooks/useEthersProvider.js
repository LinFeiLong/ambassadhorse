import { useContext } from "react"
import EthersContext from "../contexts/ethersProviderContext"

export default function useEthersProvider() {
  const context = useContext(EthersContext)
  if (!context) {
    throw new Error("useEthersProvider must be used within a EthersProvider")
  }
  return context
}
