// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { BigNumber, ethers } from 'ethers'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import Contract from '../../hardhat/artifacts/contracts/Horses.sol/Horses.json'
import { CardOnSale, Metadata, Screen } from '../components'
import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackScreenProps } from '../navigators'
import { $root, FLATLIST, SUBNAV } from './HorsesScreen.styles'

const axios = require("axios")

export type Horse = {
  id: BigNumber
  uri: string // json url
}

// SubNav est désactivé pour le moment
const SubNav = () => {
  // const tab = ["Nos 2 ans", "Nos 3 ans", "Nos 4 ans"]
  // const [active, setActive] = useState("Nos 2 ans")
  // const handlePress = (tab) => setActive(tab)

  return (
    <View style={SUBNAV}>
      {/* {tab.map((i) => {
        const subnavMenuItemStyles: TextStyle = {
          color: active === i ? colors.palette.orange : "white",
        }
        return (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(i)}
            style={active === i ? SUBNAV_MENU_ACTIVE : null}
          >
            <Text style={[SUBNAV_MENU_ITEM, subnavMenuItemStyles]}>{i}</Text>
          </TouchableOpacity>
        )
      })} */}
    </View>
  )
}

const Item = ({ item, navigation }) => {
  const goToHorseDetails = () => navigation.navigate("HorseDetails", { horseId: Number(item.id) })
  const [metadata, setMetadata] = useState<Metadata>(null)

  const getJSON = async () => {
    await axios
      .get(item.uri)
      .then((result) => {
        __DEV__ && console.log("JSON data from API ==>", result.data)
        setMetadata(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getJSON()
  }, [])

  if (metadata) {
    return <CardOnSale metadata={metadata} onPress={goToHorseDetails} />
  } else {
    return null
  }
}

export const HorsesScreen: FC<StackScreenProps<AppStackScreenProps, "Horses">> = observer(
  function HorsesScreen() {
    const navigation = useNavigation()
    const { account, provider } = useEthersProvider()
    const [isLoading, setIsLoading] = useState(false)
    const [horses, setHorses] = useState<Horse[]>([])

    const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS

    const getHorses = async () => {
      setIsLoading(true)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider)

      if (!_.isEmpty(contract)) {
        const contractWithSigner = contract.connect(signer)

        try {
          const result = await contractWithSigner.getHorses()

          setIsLoading(false)
          if (_.isEmpty(result)) {
            setHorses([])
          } else {
            setHorses(result)
            console.log({ result })
          }
        } catch (error) {
          console.log({ error })
          setIsLoading(false)
          setHorses([])
        }
      }
      setIsLoading(false)
    }

    useEffect(() => {
      if (contractAddress) {
        getHorses()
      }
    }, [contractAddress])

    const renderItem = ({ item }: { item: Horse }) => {
      return <Item item={item} navigation={navigation} />
    }

    return (
      <Screen style={$root} preset="scroll">
        <SubNav />

        {/* TODO: https://devfabi.com/react-native-dynamic-flatlist */}
        <FlatList
          data={horses}
          renderItem={renderItem}
          keyExtractor={(item: Horse) => item.id.toString()}
          numColumns={4}
          columnWrapperStyle={FLATLIST}
        />
      </Screen>
    )
  },
)
