import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle, Image,ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Btn, Screen } from "../components"
import { colors, fonts, gradients, palette, spacing, styling } from "../theme"
import { LinearGradient } from "expo-linear-gradient"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const avatar = require('../../assets/images/avatar.png')
const horse = require('../../assets/images/horse-owned.png')

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DaoScreen: FC<StackScreenProps<AppStackScreenProps, "Dao">> = observer(function DaoScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={CONTAINER} preset="scroll">
      <View style={[styling.ROW_CENTER_Y, styling.SPACE_BETWEEN]}>
        <View style={styling.ROW_CENTER_Y}>
          <Image source={avatar} style={AVATAR_IMG} />

          <View style={AVATAR_CAPTION}>
            <Text style={AVATAR_CAPTION_TITLE}>Hello Olivia Wilson !</Text>
            <Text style={AVATAR_CAPTION_SUBTITLE}>Espace propriétaire</Text>
          </View>
        </View>

        <View style={[styling.COL, styling.CENTER_X]}>
          <Image source={horse} style={HORSE_IMG} />
          <Text style={HORSE_CAPTION}>Liberty</Text>
        </View>
      </View>

      <Text style={TITLE}>DAO Overview</Text>
      <Text style={TITLE_SECTION}>Décisions prises</Text>

      <View style={TABLE_WRAPPER}>
        <View style={TABLE_HEADER_CONTAINER}>
          <Text style={TABLE_HEADER_TEXT}>Dates</Text>
          <View style={TABLE_CELL_GROW}>
            <Text style={[TABLE_HEADER_TEXT, TABLE_TEXT_GROW]}>Questions soumlses au vote</Text>
          </View>
          <Text style={TABLE_HEADER_TEXT}>Statut</Text>
          <Text style={TABLE_HEADER_TEXT}>% pour</Text>
          <Text style={TABLE_HEADER_TEXT}>% contre</Text>
        </View>

        <View style={TABLE_BODY_ROW}>
          <Text style={TABLE_TEXT}>02/12/2022</Text>
          <View style={TABLE_CELL_GROW}>
            <Text style={TABLE_TEXT_GROW}>Choix de Pénélope Leprevost comme cavalière de concours</Text>
          </View>
          <Text style={[TABLE_TEXT, { color: palette.greenBright}]}>Validé</Text>
          <Text style={[TABLE_TEXT, { color: palette.blueBright}]}>100%</Text>
          <Text style={[TABLE_TEXT, { color: palette.pinkBright}]}>0%</Text>
        </View>
      </View>

      <View style={styling.ROW_CENTER_Y}>
        <LinearGradient style={GRADIENT_CONTAINER} {...gradients.default}>
          <Text style={GRADIENT_TEXT}>VOTRE VOTE</Text>
        </LinearGradient>

        <Btn style={BTN_YES} text="OUI" textStyle={{ color: "white"}} onPress={()=>{}} />
        <Btn style={BTN_NO} text="NON" textStyle={{ color: "white"}} onPress={()=>{}} />
      </View>


      {/* TABLE 2 */}
      <Text style={TITLE_SECTION}>Votes en cours</Text>

      <View style={TABLE_WRAPPER}>
        <View style={TABLE_HEADER_CONTAINER}>
          <Text style={TABLE_HEADER_TEXT}>Date butoire</Text>
          <View style={TABLE_CELL_GROW}>
            <Text style={[TABLE_HEADER_TEXT, TABLE_TEXT_GROW]}>Questions soumises au vote</Text>
          </View>
          <Text style={TABLE_HEADER_TEXT}>Statut</Text>
          <Text style={TABLE_HEADER_TEXT}>% pour</Text>
          <Text style={TABLE_HEADER_TEXT}>% contre</Text>
        </View>

        <View style={TABLE_BODY_ROW}>
          <Text style={TABLE_TEXT}>15/12/2022</Text>
          <View style={TABLE_CELL_GROW}>
            <Text style={TABLE_TEXT_GROW}>Vente cheval au "Haras de la bella vida"</Text>
          </View>
          <Text style={[TABLE_TEXT, { color: colors.error}]}>Refusé</Text>
          <Text style={[TABLE_TEXT, { color: palette.blueBright}]}>20%</Text>
          <Text style={[TABLE_TEXT, { color: palette.pinkBright}]}>80%</Text>
        </View>
      </View>

      <View style={styling.ROW_CENTER_Y}>
        <LinearGradient style={GRADIENT_CONTAINER} {...gradients.default}>
          <Text style={GRADIENT_TEXT}>VOTRE VOTE</Text>
        </LinearGradient>

        <Btn style={BTN_YES} text="OUI" textStyle={{ color: "white"}} onPress={()=>{}} />
        <Btn style={BTN_NO} text="NON" textStyle={{ color: "white"}} onPress={()=>{}} />
      </View>


    </Screen>
  )
})

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingTop: 30,
  paddingHorizontal: spacing.screen,
  backgroundColor: colors.screenBackground
}

const AVATAR_CAPTION: ViewStyle = {
  paddingLeft: 38
}

const AVATAR_CAPTION_TITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 22,
  color: "white"
}

const AVATAR_CAPTION_SUBTITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 18,
  color: "white"
}

const AVATAR_IMG: ImageStyle = {
  width: 313 / 3,
  height: 318 / 3,
  resizeMode: "contain"
}

const HORSE_IMG: ImageStyle = {
  width: 328 / 3,
  height: 338 / 3,
  resizeMode: "contain"
}

const HORSE_CAPTION: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 15,
  color: palette.orange
}

const TITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 26,
  paddingBottom: 24,
  color: "white"
}

const TITLE_SECTION: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 18,
  paddingTop: 17,
  paddingBottom: 24,
  color: "white"
}

// TABLE
const TABLE_WRAPPER: ViewStyle = {
  padding: 10,
  marginBottom: 15,
  borderRadius: 15,
  backgroundColor: palette.greyBlue
}

const TABLE_HEADER_CONTAINER: ViewStyle = {
  ...styling.ROW,
  ...styling.POS_START,
  paddingBottom: 29
}

const TABLE_BODY_ROW: ViewStyle = {
  ...styling.ROW,
  ...styling.POS_START,
  paddingVertical: 8
}

const TABLE_CELL_GROW: ViewStyle = {
  flexGrow: 1,
  flex: 3,
}

const TABLE_TEXT: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 12,
  flex: 1,
  minWidth: 75,
  maxWidth: 150,
  marginHorizontal: 1,
  paddingHorizontal: 2,
  color: "white",
}

const TABLE_HEADER_TEXT: TextStyle = {
  ...TABLE_TEXT,
  fontFamily: fonts.poppins.medium,
  fontSize: 10,
}

const TABLE_TEXT_GROW: TextStyle = {
    ...TABLE_TEXT,
  maxWidth: "unset"
}

// VOTES
const GRADIENT_CONTAINER: ViewStyle = {
  ...styling.CENTER_Y,
  height: 40,
  marginHorizontal: 7,
  paddingHorizontal: 37,
  borderRadius: 25,
}

const GRADIENT_TEXT: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 14,
  color: "black"
}

const BTN: ViewStyle = {
  paddingHorizontal: 20,
  marginHorizontal: 7,
}

const BTN_YES: ViewStyle = {
  ...BTN,
  backgroundColor: palette.greenBright
}

const BTN_NO: ViewStyle = {
  ...BTN,
  backgroundColor: palette.greyBlue
}