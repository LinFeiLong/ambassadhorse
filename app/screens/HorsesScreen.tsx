// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { ethers } from 'ethers'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import Contract from '../../hardhat/artifacts/contracts/Horses.sol/Horses.json'
import { CardOnSale, Screen } from '../components'
import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackScreenProps } from '../navigators'
import { colors } from '../theme'
import {
    $root, FLATLIST, SUBNAV, SUBNAV_MENU_ACTIVE, SUBNAV_MENU_ITEM
} from './HorsesScreen.styles'

const axios = require("axios")
type Horse = {
  id: number
  name: string
  uri: string
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

const Item = ({ item, navigation }) => {
  const goToHorseDetails = () => navigation.navigate("HorseDetails", { horseId: item.id })
  const [data, setData] = useState(null)

  const getJSON = async () => {
    await axios
      .get(item.uri)
      .then((result) => {
        console.log("JSON data from API ==>", result.data)
        console.log(result.data.image)
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getJSON()
  }, [])

  if (data) {
    return (
      <CardOnSale
        picture={data.image}
        title={data.name}
        price={item?.price || 0}
        tokenPrice={item?.tokenPrice || 0}
        deadline={item?.deadline || ""}
        onPress={goToHorseDetails}
      />
    )
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
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          columnWrapperStyle={FLATLIST}
        />
      </Screen>
    )
  },
)
