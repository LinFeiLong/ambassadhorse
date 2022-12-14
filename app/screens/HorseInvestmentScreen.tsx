import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text, TextStyle, Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { GradientBullet, OwnerHeader, Screen, Sidebar } from "../components"
import { colors, fonts, palette, spacing, styling } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const logo = require("../../assets/images/logo-shf.png")

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HorseInvestmentScreen: FC<StackScreenProps<AppStackScreenProps, "HorseInvestment">> =
  observer(function HorseInvestmentScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar />

        <View style={MAIN_WRAPPER}>
          <OwnerHeader />
          <Text style={TITLE}>Investment Overview</Text>
          <View style={MAIN_WRAPPER_INNER}>
            {/* COL LEFT */}
            <View style={COL_LEFT}>
              <View style={styling.ROW_CENTER_Y}>
                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Classement concours</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={[TEXT_LARGER, TEXT_PINK]}>+4 points</Text>
                  <Text style={[TEXT_LARGE, TEXT_PINK]}>last 2/12/22</Text>
                </View>

                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Classement compétition</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={[TEXT_LARGER, TEXT_BLUE]}>+1 point</Text>
                  <Text style={[TEXT_LARGE, TEXT_BLUE]}>last 2/12/22</Text>
                </View>

                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Morphologie</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={TEXT_LARGER}>+1 point</Text>
                  <Text style={TEXT_LARGE}>last 2/12/22</Text>
                </View>
              </View>

              <View style={styling.ROW_CENTER_Y}>
                <View style={[BOX, { alignItems: "flex-start" }]}>
                  <Text style={BOX_TITLE}>Audit / évaluation 2022</Text>
                </View>
              </View>
            </View>

            {/* COL RIGHT */}
            <View style={COL_RIGHT}>
              <View style={BOX}>
                <View style={[BOX_TITLE_CONTAINER, { alignSelf: "flex-start" }]}>
                  <GradientBullet style={BULLET} />
                  <Text style={BOX_TITLE}>ÉVALUATION </Text>
                </View>
                <Image source={logo} style={LOGO_IMG} />

                <View style={{ alignItems: "flex-start" }}>
                  <Text style={[BOX_TEXT_LIGHT, { color: palette.orange }]}>Trimestre 1 :</Text>
                  <Text style={[BOX_TEXT_LIGHT, { marginBottom: 10 }]}>
                    "Une arrière main qui commence bien à se développer. 3 points gagné en concours
                    modèle et allures."
                  </Text>

                  <Text style={[BOX_TEXT_LIGHT, { color: palette.orange }]}>Trimestre 2 :</Text>
                  <Text style={[BOX_TEXT_LIGHT, { marginBottom: 10 }]}>
                    "Une encolure qui commence à se développer"
                  </Text>

                  <Text style={[BOX_TEXT_LIGHT, { color: palette.orange }]}>Trimestre 3 :</Text>
                  <Text style={[BOX_TEXT_LIGHT, { marginBottom: 10 }]}>
                    "Première place au concours "modèle de sport jeunes chevaux"
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Screen>
    )
  })

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
  paddingTop: 30,
  paddingHorizontal: spacing.screen,
}
const MAIN_WRAPPER_INNER: ViewStyle = {
  ...styling.ROW_SPACE_BETWEEN,
  flexWrap: "wrap",
}

// COLUMNS
const COL_LEFT: ViewStyle = {
  flex: 1,
  flexWrap: "wrap",
  minWidth: 500,
}

const COL_RIGHT: ViewStyle = {
  flex: 1,
  flexWrap: "wrap",
  minWidth: "35%",
  maxWidth: 260,
}

const TITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 26,
  paddingBottom: 9,
  color: "white",
}

// BOX
const BOX: ViewStyle = {
  flex: 1,
  alignItems: "center",
  alignSelf: "stretch",
  padding: 15,
  margin: 10,
  borderRadius: 15,
  backgroundColor: palette.greyBlue,
}

const BOX_TITLE_CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  marginBottom: 5,
}

const BULLET: ViewStyle = {
  marginRight: 10,
}

const BOX_TITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 14,
  flexWrap: "wrap",
  color: "white",
}

const BOX_TEXT_LIGHT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 14,
  flexWrap: "wrap",
  color: "white",
}

const TEXT_PINK: TextStyle = {
  color: palette.blue,
}

const TEXT_BLUE: TextStyle = {
  color: palette.pinkBright,
}

const TEXT_LARGE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 17,
  color: "white",
}

const TEXT_LARGER: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 20,
  color: "white",
}

// LOGO
const LOGO_IMG: ImageStyle = {
  width: 169,
  height: 69,
  maxWidth: "100%",
}
