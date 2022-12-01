/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle, Text, TextStyle,Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import { fonts, palette, styling } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, SimpleLineIcons , EvilIcons } from '@expo/vector-icons';


// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">

      <View style={NAVBAR}>
        <View style={styling.ROW}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={24} color="white" style={ICON_MENU} />
          </TouchableOpacity>
          <Text style={LOGO_LABEL} >Ambassad'horse</Text>
          
          <TouchableOpacity style={MENU_ITEM}>
            <MaterialCommunityIcons name="chevron-down" size={18} color="white" />
            <Text style={{ fontSize: 12, color: "white", fontFamily: fonts.nunito.light }} >Chevaux</Text>
          </TouchableOpacity>

          <TouchableOpacity style={MENU_ITEM}>
            <MaterialCommunityIcons name="chevron-down" size={18} color="white" />
            <Text style={{ fontSize: 12, color: "white", fontFamily: fonts.nunito.light }} >Services</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={MENU_ITEM}>
            <Text style={{ fontSize: 12, color: "white", fontFamily: fonts.nunito.light }} >News</Text>
          </TouchableOpacity>
        </View>

        <View style={styling.ROW}>
          <TouchableOpacity>
            <EvilIcons name="search" size={24} color="white" style={NAVBAR_ICON} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="basket" size={18} color="white" style={NAVBAR_ICON} />
          </TouchableOpacity>
          <TouchableOpacity style={BTN_LOGIN}>  
            <MaterialCommunityIcons name="account-outline" size={18} color="black" />
            <Text style={BTN_LOGIN_TEXT}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

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

      <View style={styling.ROW}>
        <View style={HERO_CTA_CONTAINER}>
          <Text style={TITLE}>Ambassad'Horse</Text>
          <Text style={HERO_TEXT}>Vivez l'expérience, devenez propriétaire d'un cheval de sport</Text>
        
          <View style={styling.ROW_CENTER_Y}>
            <LinearGradient
              start={{ x: 0.9, y: 0 }}
              colors={[ '#ff1a92',   "#179cff", '#0c3cdb',  ]}
              style={BTN_GRADIENT}
              >
              <Text style={BTN_GRADIENT_TEXT}>Own now</Text>
            </LinearGradient>
            <View style={HERO_SEPARATOR}></View>
            <Text style={HERO_PRICING}>Start at $799,99</Text>
          </View>
        </View>

        <Image source={ require('../../assets/images/hero.png')} style={HERO_IMG} />
      </View>
      
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: palette.neutral800
}

const PAGE_PADDING_X: ViewStyle = {
  paddingHorizontal: 50,
}

// NAVBAR
const NAVBAR: ViewStyle = {
  ...PAGE_PADDING_X,
  ...styling.ROW_CENTER_Y,
  paddingVertical: 30,
  justifyContent: "space-between",
  borderBottomColor: "rgba(255,255,255, 0.1)",
  borderBottomWidth: 1
}
const ICON_MENU: ViewStyle = {
  paddingRight: 20
}
const LOGO_LABEL: TextStyle = {
  fontSize: 15,
  fontFamily: fonts.nunito.bold,
  paddingRight: 50,
  color: "white"
}
const MENU_ITEM: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal: 10
}
const NAVBAR_ICON: ViewStyle = {
  paddingHorizontal: 10
}
const BTN_LOGIN: ViewStyle = {
  marginHorizontal: 10,
  ...styling.ROW_CENTER_Y,
  paddingVertical: 4,
  paddingHorizontal: 20,
  borderRadius: 25,
  backgroundColor: "white"
}
const BTN_LOGIN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  paddingLeft: 5,
  color: "black"
}

// SUBNAV
const SUBNAV: ViewStyle = {
  ...styling.ROW,
  ...PAGE_PADDING_X,
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
const TITLE: TextStyle = {
  fontSize: 18,
  fontFamily: fonts.nunito.light,
  paddingTop: 30,
  paddingBottom: 10,
  color: "white"
}
const HERO_CTA_CONTAINER: ViewStyle = {
  ...PAGE_PADDING_X,
  minWidth: "40%",
  maxWidth: 450,
  paddingBottom: 20,
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
