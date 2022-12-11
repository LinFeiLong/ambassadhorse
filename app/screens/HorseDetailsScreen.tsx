// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { ethers } from 'ethers'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { Image, ImageStyle, Text, TextStyle, View, ViewStyle } from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import Contract from '../../hardhat/artifacts/contracts/Horses.sol/Horses.json'
import { Btn, EAttribute, Metadata, Screen } from '../components'
import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackScreenProps } from '../navigators'
import { colors, fonts, gradients, palette, spacing, styling } from '../theme'
import { Horse } from './HorsesScreen'

const axios = require("axios")

const circle = require("../../assets/images/circle-gradient.png")

export const HorseDetailsScreen: FC<StackScreenProps<AppStackScreenProps, "HorseDetails">> =
  observer(function HorseDetailsScreen() {
    const route = useRoute()
    const { horseId } = route.params
    console.log({ horseId })

    const { account, provider } = useEthersProvider()
    const [isLoading, setIsLoading] = useState(false)
    const [horse, setHorse] = useState<Horse>(null)
    const [m, setMetadata] = useState<Metadata>(null)

    const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS

    const getHorse = async (horseId: number) => {
      setIsLoading(true)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider)

      if (!_.isEmpty(contract)) {
        const contractWithSigner = contract.connect(signer)

        try {
          const result = await contractWithSigner.getHorse(horseId)

          setIsLoading(false)
          if (_.isEmpty(result)) {
            setHorse(null)
          } else {
            setHorse(result)
            console.log({ result })
          }
        } catch (error) {
          console.log({ error })
          setIsLoading(false)
          setHorse(null)
        }
      }
      setIsLoading(false)
    }

    useEffect(() => {
      if (contractAddress) {
        getHorse(horseId)
      }
    }, [contractAddress, horseId])

    const getJSON = async () => {
      await axios
        .get(horse.uri)
        .then((result) => {
          __DEV__ && console.log("JSON data from API ==>", result.data)
          setMetadata(result.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    useEffect(() => {
      if (!_.isEmpty(horse)) {
        getJSON()
      }
    }, [horse])

    return (
      <Screen style={$root} preset="scroll">
        <View style={LAYER}>
          <Image style={BG_DECORATION} source={circle} />
        </View>

        <View style={WRAPPER}>
          <View style={COL_LEFT}>
            <View style={DEADLINE_CONTAINER}>
              <AntDesign name="clockcircleo" size={24} color="white" />
              <Text style={DEADLINE_TEXT}>
                {`Fin de vente le ${m?.attributes?.[EAttribute.end_date]?.value} `}
                {/* // à 7:29
                // PM GMT+0 */}
              </Text>
            </View>
            <Image style={IMG} source={{ uri: m?.image }} />

            <Btn
              style={BTN}
              onPress={() => null}
              gradient={gradients.grey}
              gradientStyle={BTN_GRADIENT}
            >
              {/* TODO: ADD DATA */}
              <Text style={BTN_TEXT}>RÉSERVER</Text>
              <Text style={BTN_TEXT_BOTTOM}>{`Token start price ${
                m?.attributes?.[EAttribute.token_price_at_start]?.value
              } € *`}</Text>
            </Btn>

            <Text>
              <Text style={MENTION}>(inclus </Text>
              {/* TODO: add link */}
              <Text style={MENTION_UNDERLINE}>les frais de pension des écuries</Text>
              <Text style={MENTION}>*)</Text>
            </Text>

            {/* TODO: ADD DATA */}
            {/* <View style={[styling.ROW, { paddingVertical: 10 }]}>
              <Text style={[TEXT_INFO_BOLD, { color: "orange" }]}>??</Text>
              <Text style={TEXT_INFO_BOLD}>{`/266 Tokens disponibles`}</Text>
            </View> */}

            {/* <Text style={TEXT_INFO}>
              L'ACHAT DE LIBERTY DE MASSA SERA CONFIRMÉ LORSQU'IL NE RESTERA PLUS QUE 100 TOKENS
              DISPONIBLES
            </Text> */}
          </View>

          <View style={COL_RIGHT}>
            <Text style={TITLE}>{m?.name}</Text>
            <Text style={SUBTITLE}>{m?.attributes?.[EAttribute.origin]?.value}</Text>

            <Text>
              <Ionicons
                name={`${m?.attributes?.[EAttribute.gender]?.value}-outline`}
                size={24}
                color="white"
              />
              <Text style={TEXT}>{`Sexe : ${
                m?.attributes?.[EAttribute.gender]?.value === "male" ? "male" : "femelle"
              }`}</Text>
            </Text>

            <View style={SECTION}>
              <Text style={TEXT}>{`Née le ${
                m?.attributes?.[EAttribute.birthdate]?.value
              } en France`}</Text>
              <Text style={TEXT}>{`Type: ${m?.attributes?.[EAttribute.type]?.value}`}</Text>
              <Text style={TEXT}>{`Couleur: ${m?.attributes?.[EAttribute.color]?.value}`}</Text>
              <Text style={TEXT}>{`Taille: ${m?.attributes?.[EAttribute.height]?.value} cm`}</Text>
            </View>

            <Text style={TEXT}>{`${m?.description}`}</Text>

            <View style={[SECTION, styling.ROW_CENTER_Y]}>
              <AntDesign name="calendar" size={24} color={palette.purple} />
              <Text style={INVEST_TEXT}>{`Horizon d'investissement : ${
                m?.attributes?.[EAttribute.investment_horizon]?.value
              } ans`}</Text>
            </View>
          </View>
        </View>
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
  position: "relative",
  zIndex: 1,
  backgroundColor: colors.screenBackground,
}

const LAYER: ViewStyle = {
  position: "absolute",
  zIndex: -1,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflow: "hidden",
}

const WRAPPER: ViewStyle = {
  ...styling.ROW_SPACE_BETWEEN,
  ...styling.CENTER_Y,
  padding: spacing.screen,
}

const BG_DECORATION: ImageStyle = {
  position: "absolute",
  right: -(845 / 3) / 2,
  width: 845 / 3,
  height: 853 / 3,
  transform: [{ rotate: "90deg" }],
}

const COL_LEFT: ViewStyle = {
  flex: 1.3,
  paddingHorizontal: 15,
}

const COL_RIGHT: ViewStyle = {
  flex: 2,
  paddingHorizontal: 15,
}

const DEADLINE_CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginBottom: 10,
  borderRadius: 15,
  backgroundColor: "#3848F1",
}

const DEADLINE_TEXT: TextStyle = {
  paddingLeft: 5,
  color: "white",
}

const IMG: ImageStyle = {
  width: 310,
  height: 400,
  maxWidth: "100%",
  maxHeight: "100%",
  resizeMode: "cover",
}

const BTN: ViewStyle = {
  alignSelf: "flex-start",
  height: 50,
  marginTop: 13,
  paddingHorizontal: 0,
  borderRadius: 0,
}

const BTN_GRADIENT: ViewStyle = {
  ...styling.COL,
  height: 50,
  paddingHorizontal: 30,
  borderRadius: 5,
}

const BTN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 25,
  paddingLeft: 5,
  color: "white",
}

const BTN_TEXT_BOTTOM: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 11,
  textTransform: "uppercase",
  color: palette.orange,
}

const MENTION: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 11,
  color: palette.orange,
}

const MENTION_UNDERLINE: TextStyle = {
  ...MENTION,
  textDecorationLine: "underline",
}

const TEXT_INFO_BOLD: TextStyle = {
  fontFamily: fonts.tomorrow.bold,
  fontSize: 12.5,
  paddingVertical: 15,
  textTransform: "uppercase",
  color: "white",
}

const TEXT_INFO: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 11,
  textTransform: "uppercase",
  color: "white",
}

const TITLE: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 42,
  textTransform: "uppercase",
  color: "white",
}

const SUBTITLE: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 22,
  paddingBottom: 55,
  textTransform: "uppercase",
  color: "white",
}

const SECTION: ViewStyle = {
  paddingVertical: 25,
}

const TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 16,
  color: "white",
}

const INVEST_TEXT: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 13,
  textTransform: "uppercase",
  paddingLeft: 10,
  color: palette.purple,
}
