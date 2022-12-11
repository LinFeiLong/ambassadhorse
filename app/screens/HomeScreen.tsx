/* eslint-disable react-native/no-inline-styles */
import * as ImagePicker from 'expo-image-picker'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { Btn, HeroLogo, Screen, Subnav } from '../components'
import { AppStackScreenProps } from '../navigators'
import { colors, fonts, gradients, styling } from '../theme'
import { pinFileToIPFS } from '../utils/pinata/pinFileToIPFS'
// import { useStores } from "../models"

const windowWidth = Dimensions.get('window').width
const isMobile = (windowWidth <= 767)

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(
  function HomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    const goToHorses = () => navigation.navigate("Horses")

    // Image Picker
    const pickImageAsync = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })

      await console.log({ result })

      if (!result.cancelled) {
        await pinFileToIPFS(result?.uri)
        console.log(result)
      } else {
        alert("You did not select any image.")
      }
    }

    return (
      <Screen style={$root} contentContainerStyle={CONTAINER} preset="scroll">
        {/* <Subnav /> */}

        <View style={[{ flex: 1 }, (isMobile) ? WRAPPER_COL : WRAPPER_ROW]}>
          <View style={[COL_LEFT, (!isMobile) ? COL_SMALL : null]}>

            <TouchableOpacity style={[LOGO_CONTAINER, (isMobile) ? styling.CENTER_X : null]} onPress={pickImageAsync}>
              <HeroLogo />
            </TouchableOpacity>

            <Text style={(isMobile) ? TITLE_SMALL : TITLE_LARGE}>
              {`Vivez l'expérience, investissez dans un cheval de sport`}
            </Text>

            <View style={[styling.ROW_CENTER_Y, (isMobile ? { alignSelf: "center", marginBottom: 30 } : null)]}>
              <Btn
                text="En savoir +"
                textStyle={BTN_GRADIENT_TEXT}
                gradient={gradients.default}
                gradientStyle={BTN_GRADIENT}
                onPress={goToHorses}
              />
            </View>

            {
              isMobile ? (
                <View style={{ marginBottom: 30 }}>
                  <Image style={IMG_SMALL} source={require("../../assets/images/hero.png")} />
                </View>
              ) : null
            }
          </View>

          <View style={[COL_RIGHT, (!isMobile) ? COL_LARGE : null]}>
            {
              !isMobile
                ? (
                  <Image style={IMG_LARGE} source={require("../../assets/images/hero.png")} />
                )
                : null
            }
          </View>
        </View>
      </Screen >
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground,
}

const CONTAINER: ViewStyle = {
  flexGrow: 1,
}

const WRAPPER_ROW: ViewStyle = {
  ...styling.ROW_SPACE_BETWEEN,
}

const WRAPPER_COL: ViewStyle = {
  ...styling.CENTER_Y,
}

const COL_LEFT: ViewStyle = {
  alignSelf: "center",
  paddingHorizontal: 20,
}

const COL_RIGHT: ViewStyle = {
  ...styling.CENTER_Y,
  alignContent: "flex-end",
}

const COL_LARGE: ViewStyle = {
  flex: 1.5
}

const COL_SMALL: ViewStyle = {
  flex: 1
}

// LOGO
const LOGO_CONTAINER: TextStyle = {
  paddingVertical: 10,
}

// TITLE
const TITLE_LARGE: TextStyle = {
  fontSize: 41,
  fontFamily: fonts.nunito.light,
  paddingBottom: 30,
  color: "white",
}

const TITLE_SMALL: TextStyle = {
  fontSize: 28,
  fontFamily: fonts.nunito.light,
  paddingVertical: 20,
  textAlign: "center",
  color: "white",
}

// BUTTON
const BTN_GRADIENT: ViewStyle = {
  ...styling.CENTER,
  alignSelf: "flex-start",
  height: 40,
  paddingHorizontal: 37,
  borderRadius: 25,
}
const BTN_GRADIENT_TEXT: TextStyle = {
  fontSize: 18,
  fontFamily: fonts.nunito.light,
  color: "white",
}

// IMAGE
const IMG_LARGE: ImageStyle = {
  width: 728,
  height: 626,
  maxWidth: "100%",
  resizeMode: "contain",
  alignSelf: "flex-end",
}

const IMG_SMALL: ImageStyle = {
  width: 728 / 3,
  height: 626 / 3,
  maxWidth: "100%",
  resizeMode: "contain",
  alignSelf: "center",
}
