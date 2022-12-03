import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle, Text, TextStyle,Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Btn, Screen } from "../components"
import { fonts, styling, spacing, gradients, colors } from "../theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { StrokedText } from 'stroked-text'

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goToHorses = () => navigation.navigate("Horses")

  return (
    <Screen style={$root} preset="scroll">

      <View style={SUBNAV}>
        <TouchableOpacity>
          <Text style={[SUBNAV_MENU_ITEM, SUBNAV_MENU_ACTIVE]}>Highlights</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={SUBNAV_MENU_ITEM}>Specifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={SUBNAV_MENU_ITEM}>Compare</Text>
        </TouchableOpacity>
      </View>

      <View style={[styling.ROW, styling.SPACE_BETWEEN]}>
        <View style={HERO_WRAPPER}>
          <View style={HERO_CTA_CONTAINER}>
            <View style={TITLE_CONTAINER}>
              <Text style={TITLE}>Ambassad'</Text>
              <StrokedText fill="transparent" stroke="white" strokeWidth={1} style={TITLE_STROKE}>
                Horse
              </StrokedText>
            </View>
            <Text style={HERO_TEXT}>Vivez {"\n"}l'expérience,{"\n"}devenez{"\n"}propriétaire d'un cheval de sport</Text>

            <View style={styling.ROW_CENTER_Y}>
              <Btn text="Investir" textStyle={BTN_GRADIENT_TEXT} gradient={gradients.default} gradientStyle={BTN_GRADIENT} onPress={goToHorses}/>
              <View style={HERO_SEPARATOR}></View>
              <Text style={HERO_PRICING}>Commence à 25€</Text>
            </View>
          </View>
        </View>

        <Image source={ require('../../assets/images/hero.png')} style={HERO_IMG} />
      </View>

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground
}

// SUBNAV
const SUBNAV: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal : spacing.screen,
  paddingTop: 30,
}
const SUBNAV_MENU_ITEM: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.nunito.light,
  paddingBottom: 10,
  marginHorizontal: 10,
  color: "white",
}
const SUBNAV_MENU_ACTIVE: TextStyle = {
  borderBottomColor: "#424242",
  borderBottomWidth: 3
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
const TITLE_STROKE : TextStyle =  {
  fontSize: 29,
  fontFamily: fonts.anton.regular,
  paddingTop: 1, // stroke hack
  textTransform: "uppercase",
}
const HERO_WRAPPER: ViewStyle = {
  alignSelf: "center",
}
const HERO_CTA_CONTAINER: ViewStyle = {
  minWidth: "40%",
  maxWidth: 450,
  paddingLeft : spacing.screen,
}
const HERO_TEXT: TextStyle = {
  fontSize: 41,
  fontFamily: fonts.nunito.light,
  paddingBottom : 30,
  color: "white"
}
const BTN_GRADIENT: ViewStyle = {
  ...styling.CENTER,
  alignSelf: "flex-start",
  height: 40,
  paddingHorizontal: 37,
  borderRadius: 25
}
const BTN_GRADIENT_TEXT: TextStyle = {
  fontSize: 18,
  fontFamily: fonts.nunito.light,
  color: "white"
}
const HERO_SEPARATOR: ViewStyle = {
  height: 1,
  width: 40,
  marginHorizontal: 20,
  backgroundColor: "white"
}
const HERO_PRICING: TextStyle = {
  fontSize: 14,
  fontFamily: fonts.nunito.light,
  color: "white"
}
const HERO_IMG: ImageStyle = {
  width: 728,
  height: 626,
  maxWidth: "70%",
  resizeMode: "contain"
}
