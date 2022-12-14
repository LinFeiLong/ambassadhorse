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

const cavalier1 = require("../../assets/images/cavalier1.png")
const cavalier2 = require("../../assets/images/cavalier2.png")

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HorsePerformanceScreen: FC<StackScreenProps<AppStackScreenProps, "HorsePerformance">> =
  observer(function HorsePerformanceScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar />

        <View style={MAIN_WRAPPER}>
          <OwnerHeader />
          <Text style={TITLE}>Performance & training Overview</Text>
          <View style={MAIN_WRAPPER_INNER}>
            {/* COL LEFT */}
            <View style={COL_LEFT}>
              <View style={styling.ROW_CENTER_Y}>
                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Heures d'entrainement</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={BOX_STAT}>104 h 31</Text>
                </View>

                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Nombre de compétitions</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <Text style={BOX_STAT}>19</Text>
                </View>

                <View style={BOX}>
                  <View style={BOX_TITLE_CONTAINER}>
                    <GradientBullet style={BULLET} />
                    <Text style={BOX_TITLE}>Palmares compétition</Text>
                  </View>
                  {/* TODO: add DATA */}
                  <View style={[styling.ROW_CENTER_Y, { flex: 1, alignSelf: "center" }]}>
                    <Ionicons name="star" size={24} color={palette.yellow} />
                    <Ionicons name="star" size={24} color={palette.yellow} />
                    <Ionicons name="star" size={24} color={palette.yellow} />
                  </View>
                </View>
              </View>

              <View style={styling.ROW_CENTER_Y}>
                <View style={[BOX, { alignItems: "flex-start" }]}>
                  <Text style={[BOX_TITLE, { color: palette.pinkBright }]}>
                    Le mot de Pénélope : Semaine 42
                  </Text>
                  <Text style={BOX_TEXT_UPPERCASE}>
                    "UNE BELLE PROGRESSION, LIBERTY SE MONTRE TRÈS FRANCHE AU TRAVAIL"
                  </Text>
                  <Text style={[BOX_TITLE, { color: palette.blue, paddingTop: 15 }]}>
                    Le mot d'Olivier : Semaine 42
                  </Text>
                  <Text style={BOX_TEXT_UPPERCASE}>
                    "UNE JUMENT TRÈS SÉRIEUSE. UNE BELLE ÉNERGIE CETTE SEMAINE"
                  </Text>
                </View>
              </View>

              <View style={styling.ROW}>
                <View
                  style={[BOX, styling.ROW_SPACE_BETWEEN, { flex: 2, alignItems: "flex-start" }]}
                >
                  <View style={{ flex: 1.5 }}>
                    <View style={BOX_TITLE_CONTAINER}>
                      <GradientBullet style={BULLET} />
                      <Text style={BOX_TITLE}>Allures</Text>
                    </View>
                    <Text style={[TEXT, { paddingBottom: 12 }]}>25% Pas</Text>
                    <Text style={[TEXT, { paddingBottom: 12 }]}>8% Galop</Text>
                    <Text style={[TEXT, { paddingBottom: 12 }]}>12% Trot</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={BOX_TITLE_CONTAINER}>
                      <GradientBullet style={BULLET} />
                      <Text style={BOX_TITLE}>Obstacles</Text>
                    </View>
                    <View style={styling.ROW_CENTER_Y}>
                      <Ionicons name="share-social-outline" size={34} color={palette.pinkBright} />
                      <Text style={[TEXT_LARGE, { paddingLeft: 10 }]}>78% succès</Text>
                    </View>
                    <View style={styling.ROW_CENTER_Y}>
                      <Ionicons name="sync-outline" size={34} color={palette.blue} />
                      <Text style={[TEXT_LARGE, { paddingLeft: 10 }]}>22% refus</Text>
                    </View>
                  </View>
                </View>

                <View style={[BOX, { flex: 1 }]}>
                  <Text style={BOX_TITLE}>Figures de dressages</Text>
                  {/* TODO : add chart */}
                </View>
              </View>
            </View>

            {/* COL RIGHT */}
            <View style={COL_RIGHT}>
              <View style={COACH_CONTAINER}>
                <Image source={cavalier1} style={COACH_IMG} />
                <Text style={TEXT}>Cavalier pro : Penelope Leprevost</Text>
              </View>

              <View style={COACH_CONTAINER}>
                <Image source={cavalier2} style={COACH_IMG} />
                <Text style={TEXT}>Entraîneur : Oliver Oelrich</Text>
              </View>

              <View style={BOX}>
                <Text style={BOX_TITLE}>Planning entrainement </Text>
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

const BOX_STAT: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 48,
  color: "white",
}

const BOX_TEXT_UPPERCASE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 14,
  textTransform: "uppercase",
  color: "white",
}

const TEXT: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 10,
  color: "white",
}

const TEXT_LARGE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 17,
  color: "white",
}

// COACH
const COACH_CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  marginVertical: 30,
}

const COACH_IMG: ImageStyle = {
  width: 113,
  height: 113,
  maxWidth: "100%",
  marginRight: 24,
}
