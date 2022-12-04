import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle, Text, TextStyle, StyleProp } from "react-native"
import { fonts, styling, colors, palette } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons, SimpleLineIcons , EvilIcons } from '@expo/vector-icons';
import { Btn } from "./Btn"

export interface NavbarProps {
  style?: StyleProp<ViewStyle>
}

export const Navbar = observer(function Navbar(props: NavbarProps) {
  const { style } = props
  const $styles = [NAVBAR, style]

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goToHome = () => navigation.navigate("Home")

  // Menu items
  const menu = [
    {
      title: "Chevaux en vente",
      hasSubmenu: true,
      link: "Horses"
    },
    {
      title: "Revente",
      hasSubmenu: true,
      link: "Home"
    },
    {
      title: "Concept",
      hasSubmenu: true,
      link: "Home"
    },
    {
      title: "News",
      hasSubmenu: false,
      link: "Home"
    },
    {
      title: "Contact",
      hasSubmenu: false,
      link: "Home"
    }
  ]

  const [active, setActive] = useState("")
  const handlePress = (menu) => setActive(menu)

  return (
      <View style={$styles}>
        <View style={styling.ROW}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={24} color="white" style={ICON_MENU} />
          </TouchableOpacity>

          <TouchableOpacity onPress={goToHome} >
            <Text style={LOGO_LABEL}>Ambassad'horse</Text>
          </TouchableOpacity>

          {
            menu.map(i =>
              <TouchableOpacity style={MENU_ITEM} key={i} onPress={
                () => {
                  handlePress(i.title)
                  navigation.navigate(i.link)
                }
              }
              >
                {
                  (i.hasSubmenu)
                  ? <MaterialCommunityIcons name="chevron-down" size={18} color={(active === i.title) ? palette.orange : "white" } />
                  : null
                }
                <Text style={[MENU_TEXT, (active === i.title) ? MENU_ACTIVE : null]}>{i.title}</Text>
              </TouchableOpacity>
            )
          }
        </View>

        <View style={styling.ROW}>
          <TouchableOpacity>
            <EvilIcons name="search" size={24} color="white" style={NAVBAR_ICON} />
          </TouchableOpacity>

          <TouchableOpacity>
            <SimpleLineIcons name="basket" size={18} color="white" style={NAVBAR_ICON} />
          </TouchableOpacity>

          <Btn text="Sign In" textStyle={BTN_LOGIN_TEXT} style={BTN_LOGIN} onPress={() => {}}>
            <MaterialCommunityIcons name="account-outline" size={18} color="black" />
          </Btn>
        </View>
      </View>
  )
})


const NAVBAR: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  justifyContent: "space-between",
  paddingHorizontal: 50,
  paddingVertical: 17,
  borderBottomColor: "rgba(255,255,255, 0.1)",
  borderBottomWidth: 1,
  backgroundColor: colors.screenBackground
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

const MENU_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  color: "white",
}

const MENU_ACTIVE: TextStyle = {
  color: palette.orange
}

const NAVBAR_ICON: ViewStyle = {
  paddingHorizontal: 10
}

const BTN_LOGIN: ViewStyle = {
  marginHorizontal: 10,
  paddingVertical: 4,
  paddingHorizontal: 20,
  backgroundColor: "white"
}

const BTN_LOGIN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  paddingLeft: 5,
  color: "black"
}

