import React, { FC } from "react"
import { Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Btn, Screen, Subnav } from "../components"
import { styling, fonts, spacing, colors, gradients } from "../theme"
import * as ImagePicker from "expo-image-picker"
import { pinFileToIPFS } from "../utils/pinata/pinFileToIPFS"
// import { useStores } from "../models"

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

      if (!result.canceled) {
        await pinFileToIPFS(result?.assets[0]?.uri)
        console.log(result)
      } else {
        alert("You did not select any image.")
      }
    }

    // pinFileToIPFS()

    return (
      <Screen style={$root} preset="scroll">
        {/* <Subnav /> */}

        <View style={[styling.ROW, styling.SPACE_BETWEEN]}>
          <View style={HERO_WRAPPER}>
            <View style={HERO_CTA_CONTAINER}>
              <TouchableOpacity onPress={pickImageAsync}>
                <View style={TITLE_CONTAINER}>
                  <Text style={TITLE}>Ambassad'</Text>
                  <Text style={TITLE}>Horse</Text>
                </View>
              </TouchableOpacity>
              <Text style={HERO_TEXT}>
                Vivez {"\n"}l'expérience,{"\n"}devenez{"\n"}propriétaire d'un cheval de sport
              </Text>

              <View style={styling.ROW_CENTER_Y}>
                <Btn
                  text="Investir"
                  textStyle={BTN_GRADIENT_TEXT}
                  gradient={gradients.default}
                  gradientStyle={BTN_GRADIENT}
                  onPress={goToHorses}
                />
                <View style={HERO_SEPARATOR}></View>
                <Text style={HERO_PRICING}>Commence à 25€</Text>
              </View>
            </View>
          </View>

          <Image source={require("../../assets/images/hero.png")} style={HERO_IMG} />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground,
}

const TITLE_CONTAINER: TextStyle = {
  ...styling.ROW_CENTER_Y,
  paddingTop: 30,
  paddingBottom: 10,
}
const TITLE: TextStyle = {
  fontSize: 29,
  fontFamily: fonts.anton.regular,
  textTransform: "uppercase",
  color: "white",
}
const HERO_WRAPPER: ViewStyle = {
  alignSelf: "center",
}
const HERO_CTA_CONTAINER: ViewStyle = {
  minWidth: "40%",
  maxWidth: 450,
  paddingLeft: spacing.screen,
}
const HERO_TEXT: TextStyle = {
  fontSize: 41,
  fontFamily: fonts.nunito.light,
  paddingBottom: 30,
  color: "white",
}
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
const HERO_SEPARATOR: ViewStyle = {
  height: 1,
  width: 40,
  marginHorizontal: 20,
  backgroundColor: "white",
}
const HERO_PRICING: TextStyle = {
  fontSize: 14,
  fontFamily: fonts.nunito.light,
  color: "white",
}
const HERO_IMG: ImageStyle = {
  width: 728,
  height: 626,
  maxWidth: "60%",
  resizeMode: "contain",
}
