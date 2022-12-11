// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { ethers } from 'ethers'
import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack'

import Contract from '../../hardhat/artifacts/contracts/Horses.sol/Horses.json'
import { Btn, Screen, Sidebar } from '../components'
import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackScreenProps } from '../navigators'
import { colors, fonts, palette, styling } from '../theme'

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AdminCreateScreen: FC<StackScreenProps<AppStackScreenProps, "AdminCreate">> = observer(
  function AdminCreateScreen() {
    const { account, provider } = useEthersProvider()
    const [isLoading, setIsLoading] = useState(false)
    const contractAddress = "0x2c333d594D03721D3486bA462f4786c5b31bb784"

    console.log({ provider })

    const createHorse = async () => {
      console.log("Create Horse")
      setIsLoading(true)
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider)

      const signer = await provider.getSigner()

      console.log({ signer })
      const contractWithSigner = contract.connect(signer)

      await contractWithSigner
        .init()
        .then((result) => {
          console.log({ result })
        })
        .catch((error) => {
          console.log({ error })
        })
      // await contract
      //   .mintHorse(
      //     contractAddress,
      //     2 * 10 ** 6,
      //     "Parisiens",
      //     "https://gray-occasional-firefly-693.mypinata.cloud/ipfs/QmexER8EgqcC2Bwiv9WbDWfV4JZbmSs19RqYer6fKhoEQw",
      //   )
      //   .then((result) => {
      //     console.log({ result })
      //   })
      //   .catch((error) => {
      //     console.log({ error })
      //   })
      setIsLoading(false)
    }

    // FORM
    const [name, onChangeName] = useState("")
    const [price, onChangePrice] = useState("")
    const [tokens, onChangeTokens] = useState("")
    const [description, onChangeDescription] = useState("")

    // if (account)

    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar admin />

        <View style={MAIN_WRAPPER}>
          <View style={FORM_CONTAINER}>
            {!account ? (
              <View style={HEADER}>
                <Text style={TITLE}>Vous n'êtes pas connecté</Text>
              </View>
            ) : (
              <>
                <View style={HEADER}>
                  <Text style={TITLE}>Créer un nouveau cheval</Text>
                </View>

                <View style={BODY}>
                  <Text style={SUBTITLE}>Image, Video, Audio, or 3D Model</Text>
                  <Text style={TEXT_INFO}>
                    Fichiers acceptés: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                    size: 100 MB
                  </Text>

                  <Text style={INPUT_LABEL}>Nom</Text>
                  <TextInput
                    editable
                    placeholder="Nom du cheval"
                    placeholderTextColor={colors.placeholder}
                    maxLength={150}
                    onChangeText={(text) => onChangeName(text)}
                    value={name}
                    style={INPUT}
                  />

                  <Text style={INPUT_LABEL}>Prix du token</Text>
                  <TextInput
                    editable
                    placeholder="Prix du token"
                    placeholderTextColor={colors.placeholder}
                    maxLength={150}
                    onChangeText={(text) => onChangePrice(text)}
                    value={price}
                    style={INPUT}
                  />

                  <Text style={INPUT_LABEL}>Nombre de tokens</Text>
                  <TextInput
                    editable
                    placeholder="Nombre de tokens"
                    placeholderTextColor={colors.placeholder}
                    maxLength={150}
                    onChangeText={(text) => onChangeTokens(text)}
                    value={tokens}
                    style={INPUT}
                  />

                  <Text style={INPUT_LABEL}>Description</Text>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    maxLength={150}
                    onChangeText={(text) => onChangeDescription(text)}
                    value={description}
                    style={INPUT_TEXTAREA}
                  />

                  <Btn style={BTN} text="create" textStyle={BTN_TEXT} onPress={createHorse} />
                </View>
              </>
            )}
          </View>
        </View>
      </Screen>
    )
  },
)

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground,
}

const CONTAINER_INNER: ViewStyle = {
  flexGrow: 1,
  ...styling.ROW_SPACE_BETWEEN,
}

// MAIN CONTENT
const MAIN_WRAPPER: ViewStyle = {
  flex: 1,
  ...styling.CENTER,
}

const FORM_CONTAINER: ViewStyle = {
  alignSelf: "center",
  width: 450,
  maxWidth: "95%",
}

const HEADER: ViewStyle = {
  ...styling.CENTER_X,
  padding: 15,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  backgroundColor: palette.greyLight,
}

const TITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 26,
  textAlign: "center",
  color: "#131724",
}

const BODY: ViewStyle = {
  paddingHorizontal: 30,
  paddingTop: 10,
  paddingBottom: 30,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  backgroundColor: "white",
}

const SUBTITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  paddingTop: 10,
  textTransform: "uppercase",
  color: "#131724",
}

const TEXT_INFO: TextStyle = {
  paddingVertical: 8,
}

// INPUT
const INPUT: ViewStyle = {
  height: 30,
  borderBottomWidth: 2,
  borderBottomColor: "black",
  marginBottom: 15,
}

const INPUT_LABEL: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  textTransform: "uppercase",
}

const INPUT_TEXTAREA: ViewStyle = {
  padding: 15,
  borderWidth: 2,
  borderColor: "black",
}

// BUTTON
const BTN: ViewStyle = {
  ...styling.CENTER_X,
  marginTop: 16,
  borderRadius: 5,
  backgroundColor: "#131724",
}

const BTN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  textTransform: "uppercase",
  color: "white",
}
