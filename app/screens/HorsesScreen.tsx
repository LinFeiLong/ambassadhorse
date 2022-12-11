// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { ethers } from 'ethers'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { FlatList, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import Contract from '../../hardhat/artifacts/contracts/Horses.sol/Horses.json'
import { CardOnSale, Screen } from '../components'
import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackScreenProps } from '../navigators'
import { colors } from '../theme'
import { DATA } from './HorsesScreen.data'
import {
    $root, FLATLIST, SUBNAV, SUBNAV_MENU_ACTIVE, SUBNAV_MENU_ITEM
} from './HorsesScreen.styles'

type Horse = {
  id: number
  name: string
  // price: string
  // quantity: string
  // priceLabel: string
  // quantityLabel: string
}

const SubNav = () => {
  const tab = ["Nos 2 ans", "Nos 3 ans", "Nos 4 ans"]
  const [active, setActive] = useState("Nos 2 ans")
  const handlePress = (tab) => setActive(tab)

  return (
    <View style={SUBNAV}>
      {tab.map((i) => {
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
      })}
    </View>
  )
}

export const HorsesScreen: FC<StackScreenProps<AppStackScreenProps, "Horses">> = observer(
  function HorsesScreen() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)

    const { account, provider } = useEthersProvider()
    const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider)

    const getHorses = async () => {
      setIsLoading(true)
      const signer = await provider.getSigner()
      const contractWithSigner = contract.connect(signer)

      try {
        const result = await contractWithSigner.getHorses()

        setIsLoading(false)
        if (_.isEmpty(result)) {
          return []
        }
        return result
      } catch (error) {
        console.log({ error })
        setIsLoading(false)
        return []
      }
    }

    const renderItem = ({ item }) => {
      const goToHorseDetails = () => navigation.navigate("HorseDetails", { horseId: item.id })

      return (
        <CardOnSale
          picture={item.picture}
          title={item.title}
          price={item.price}
          tokenPrice={item.tokenPrice}
          deadline={item.deadline}
          onPress={goToHorseDetails}
        />
      )
    }

    return (
      <Screen style={$root} preset="scroll">
        <SubNav />

        {/* TODO: https://devfabi.com/react-native-dynamic-flatlist */}
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={FLATLIST}
        />
      </Screen>
    )
  },
)
