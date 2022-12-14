import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text, TextStyle, Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { GradientBullet, OwnerHeader, Screen, Sidebar } from "../components"
import { colors, fonts, palette, spacing, styling } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

import { Ionicons } from "@expo/vector-icons"

const vet = require("../../assets/images/vet.png")
const logo = require("../../assets/images/logo-avef.png")

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HorseHealthScreen: FC<StackScreenProps<AppStackScreenProps, "HorseHealth">> = observer(
  function HorseHealthScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar />

        <View style={MAIN_WRAPPER}>
          <OwnerHeader />
          <Text style={TITLE}>Santé Overview</Text>
          <View style={MAIN_WRAPPER_INNER}>
            {/* COL LEFT */}
            <View style={COL_LEFT}>
              <View style={styling.ROW_CENTER_Y}>
                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Vaccins</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={TEXT_LARGER}>A jour - </Text>
                  <Text style={TEXT_LARGE}>last 2/12/22</Text>
                </View>

                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Vermifuge</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={TEXT_LARGER}>A jour - </Text>
                  <Text style={TEXT_LARGE}>last 2/12/22</Text>{" "}
                </View>

                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Repos / semaine</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={BOX_STAT}>130 h</Text>
                </View>
              </View>

              <View style={styling.ROW_CENTER_Y}>
                <View style={[BOX, { alignItems: "flex-start" }]}>
                  <Text style={BOX_TITLE}>Cardio entraînement Novembre 22</Text>
                </View>
              </View>
            </View>

            {/* COL RIGHT */}
            <View style={COL_RIGHT}>
              <View style={BOX}>
                <View style={styling.ROW_CENTER_Y}>
                  <View style={VET_CONTAINER}>
                    <Image source={vet} style={VET_IMG} />
                    <View>
                      <Image source={logo} style={LOGO_IMG} />
                      <Text style={BOX_TITLE}>Vet : Léa Lessage</Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: "flex-start" }}>
                  <Text style={[BOX_TITLE, { color: palette.orange }]}>02/12/22:</Text>
                  <Text style={[BOX_TITLE, { marginBottom: 10 }]}>
                    "RAS: dernier bilan de santé parfait"
                  </Text>
                  <Text style={[BOX_TITLE, { color: palette.orange }]}>04/11/22:</Text>
                  <Text style={[BOX_TITLE, { marginBottom: 10 }]}>
                    " Changement de quantité de granulé. Passage à 2L matin avec ajout minéraux"
                  </Text>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={[BOX_TITLE, { alignSelf: "flex-start" }]}>Ordonnances & Doc</Text>
                  </View>
                  <Ionicons
                    style={{ alignSelf: "center" }}
                    name="md-document-text-outline"
                    size={36}
                    color="white"
                  />
                </View>
              </View>
            </View>
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

const BOX_STAT: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 48,
  color: "white",
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

// VET
const VET_CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
}

const VET_IMG: ImageStyle = {
  width: 120,
  height: 120,
  maxWidth: "100%",
  marginRight: 24,
}

const LOGO_IMG: ImageStyle = {
  width: 93,
  height: 93,
  maxWidth: "100%",
}
