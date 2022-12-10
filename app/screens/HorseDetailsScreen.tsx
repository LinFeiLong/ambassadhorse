import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text, TextStyle, Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Btn, Screen } from "../components"
import { styling, fonts, colors, gradients, palette, spacing } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { AntDesign, Ionicons } from '@expo/vector-icons'

const picture = require("../../assets/images/horse4.png")
const circle = require("../../assets/images/circle-gradient.png")

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HorseDetailsScreen: FC<StackScreenProps<AppStackScreenProps, "HorseDetails">> = observer(function HorseDetailsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()



  return (
    <Screen style={$root} preset="scroll">
      <View style={LAYER}>
        <Image style={BG_DECORATION} source={circle} />
      </View>

      <View style={WRAPPER}>
        <View style={COL_LEFT}>
          <View style={DEADLINE_CONTAINER}>
            <AntDesign name="clockcircleo" size={24} color="white" />
            {/* TODO: ADD DATA */}
            <Text style={DEADLINE_TEXT}>Fin de vente le 5 janvier 2023 à 7:29 PM GMT+0 </Text>
          </View>
          <Image style={IMG} source={picture} />

          <Btn style={BTN} onPress={() => { }} gradient={gradients.grey} gradientStyle={BTN_GRADIENT}>
            {/* TODO: ADD DATA */}
            <Text style={BTN_TEXT}>RÉSERVER</Text>
            <Text style={BTN_TEXT_BOTTOM}>Token start price 100 € *</Text>
          </Btn>

          <Text>
            <Text style={MENTION}>(inclus </Text>
            {/* TODO: add link */}
            <Text style={MENTION_UNDERLINE}>les frais de pension des écuries</Text>
            <Text style={MENTION}>*)</Text>
          </Text>

          <View style={[styling.ROW, { paddingVertical: 10 }]}>
            {/* TODO: ADD DATA */}
            <Text style={[TEXT_INFO_BOLD, { color: "orange" }]}>66</Text>
            {/* TODO: ADD DATA */}
            <Text style={TEXT_INFO_BOLD}>/266 Tokens disponibles</Text>
          </View>

          <Text style={TEXT_INFO}>L'ACHAT DE LIBERTY DE MASSA SERA CONFIRMÉ LORSQU'IL NE RESTERA PLUS QUE 100 TOKENS DISPONIBLES</Text>
        </View>

        <View style={COL_RIGHT}>
          <Text style={TITLE}>Liberty</Text>
          <Text style={SUBTITLE}>De massa</Text>

          <Text>
            <Ionicons name="female-outline" size={24} color="white" />
            <Text style={TEXT}> Femelle</Text>
          </Text>

          <View style={SECTION}>
            <Text style={TEXT}>Née le 01/05/2021 en France</Text>
            <Text style={TEXT}>Cheval de dressage français</Text>
            <Text style={TEXT}>Bai Brun foncé</Text>
            <Text style={TEXT}>1m58</Text>
          </View>

          <Text style={TEXT}>
            Une chic femelle issue de la lignée maternelle de VODKA DE MASSA. {"\n"}
            Une pouliche très dans le sang, très noble et prometteuse. Soeur utérine de l’étalon ALYRA VILLA DE MONTEIRO.
          </Text>

          <View style={[SECTION, styling.ROW_CENTER_Y]}>
            <AntDesign name="calendar" size={24} color={palette.purple} />
            <Text style={INVEST_TEXT}>Horizon d'investissement : 3 ans</Text>
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
  flex: 1,
  overflow: "hidden",
  backgroundColor: "brown"
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
  transform: [{ rotate: '90deg' }],
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
  backgroundColor: "#3848F1"
}

const DEADLINE_TEXT: TextStyle = {
  paddingLeft: 5,
  color: "white"
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
  borderRadius: 5
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
  textDecorationLine: "underline"
}

const TEXT_INFO_BOLD: TextStyle = {
  fontFamily: fonts.tomorrow.bold,
  fontSize: 12.5,
  paddingVertical: 15,
  textTransform: "uppercase",
  color: "white"
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
  paddingVertical: 25
}

const TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 16,
  color: "white"
}

const INVEST_TEXT: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 13,
  textTransform: "uppercase",
  paddingLeft: 10,
  color: palette.purple
}