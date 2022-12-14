// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { ethers } from 'ethers'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import Contract from '../../hardhat/artifacts/contracts/Horses.sol/Horses.json'
import { Btn, EAttribute, Metadata, Screen } from '../components'
import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackScreenProps } from '../navigators'
import { gradients, palette, styling } from '../theme'
import {
    BG_DECORATION, BTN, BTN_GRADIENT, BTN_TEXT, BTN_TEXT_BOTTOM, COL_LEFT, COL_RIGHT,
    DEADLINE_CONTAINER, DEADLINE_TEXT, IMG, INVEST_TEXT, LAYER, MENTION, MODAL_BTN, MODAL_CONTAINER,
    MODAL_CONTENT, MODAL_DESCRIPTION, MODAL_ICON_CONTAINER, MODAL_TITLE, SECTION, SUBTITLE, TEXT,
    TEXT_INFO_BOLD, TITLE, WRAPPER
} from './HorseDetailsScreen.styles'
import { Horse } from './HorsesScreen'
import { $root } from './HorsesScreen.styles'

const axios = require("axios")

const circle = require("../../assets/images/circle-gradient.png")

export const HorseDetailsScreen: FC<StackScreenProps<AppStackScreenProps, "HorseDetails">> =
  observer(function HorseDetailsScreen() {
    // TextInput
    const [text, onChangeText] = React.useState("1")

    // DISCLAIMER MODAL
    const [disclaimerVisible, setDisclaimerVisible] = useState(false)

    const handlePress = () => {
      console.log("handlePress()")
      setDisclaimerVisible(!disclaimerVisible)
    }

    // DISCLAIMER MODAL
    const [paymentVisible, setPaymentVisible] = useState(false)

    const handlePressPayment = () => {
      console.log("handlePress()")
      setPaymentVisible(!paymentVisible)
    }

    const route = useRoute()
    const { horseId } = route.params

    const { account, provider } = useEthersProvider()
    const [isLoading, setIsLoading] = useState(false)
    const [horse, setHorse] = useState<Horse>(null)
    const [m, setMetadata] = useState<Metadata>(null)
    const [balance, setBalance] = useState(null)

    const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS

    const getBalance = async () => {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider)

      await contract
        .owner()
        .then(async (owner: string) => {
          await contract
            .balanceOf(owner, horseId)
            .then((result) => {
              setBalance(Number(result))
            })
            .catch((error) => {
              console.log({ error })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    useEffect(() => {
      getBalance()
    }, [])

    const getHorse = async (horseId: number) => {
      setIsLoading(true)
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider)

      if (!_.isEmpty(contract)) {
        try {
          const result = await contract.getHorse(horseId)

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
              onPress={handlePress}
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
              <Text style={MENTION}>les frais de pension des écuries</Text>
              <Text style={MENTION}>*)</Text>
            </Text>

            {/* TODO: ADD DATA */}
            <View style={[styling.ROW, { paddingVertical: 10 }]}>
              <Text style={[TEXT_INFO_BOLD, { color: "orange" }]}>{balance}</Text>
              <Text style={TEXT_INFO_BOLD}>{`/${horse?.amount} Tokens disponibles`}</Text>
            </View>

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={disclaimerVisible}
          presentationStyle="fullScreen"
          onRequestClose={handlePress}
        >
          <View style={MODAL_CONTAINER}>
            <View style={MODAL_CONTENT}>
              <View style={[styling.ROW_SPACE_BETWEEN, styling.ROW_CENTER_Y]}>
                <Text style={MODAL_TITLE}>ATTENTION</Text>
                <TouchableOpacity
                  style={MODAL_ICON_CONTAINER}
                  onPress={() => setDisclaimerVisible(false)}
                >
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={MODAL_DESCRIPTION}>
                L'investissement dans un cheval de sport peut présenter des risques de perte en
                capital, partielle ou totale. La valorisation d'un cheval de sport dépendra
                essentiellement des aptitudes qu'il développera à l'entrainement et pourra être
                fortement impactée en cas d'accident ou de problèmes de santé.
              </Text>

              <Btn
                style={MODAL_BTN}
                text="NEXT"
                textStyle={{ color: "black" }}
                // TODO: add onPress
                onPress={() => {
                  handlePress()
                  handlePressPayment()
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={paymentVisible}
          presentationStyle="fullScreen"
          onRequestClose={handlePressPayment}
        >
          <View style={MODAL_CONTAINER}>
            <View style={MODAL_CONTENT}>
              <View style={[styling.ROW_SPACE_BETWEEN, styling.ROW_CENTER_Y]}>
                <Text style={MODAL_TITLE}>Choisir un nombre de token</Text>
                <TouchableOpacity
                  style={MODAL_ICON_CONTAINER}
                  onPress={() => setPaymentVisible(false)}
                >
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={MODAL_DESCRIPTION}>Paiement</Text>

              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                keyboardType="numeric"
                onSubmitEditing={() => handlePressPayment()}
              />

              <Btn
                style={MODAL_BTN}
                text="NEXT"
                textStyle={{ color: "black" }}
                // TODO: add onPress
                onPress={() => {
                  handlePressPayment()
                }}
              />
            </View>
          </View>
        </Modal>
      </Screen>
    )
  })

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
})
