import * as React from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle, Text, TextStyle, } from "react-native"
import { observer } from "mobx-react-lite"
import { styling, palette } from "../theme"
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"


export interface SidebarProps {
  style?: StyleProp<ViewStyle>
}

export const Sidebar = observer(function Sidebar(props: SidebarProps) {
  const { style } = props
  const styles = [CONTAINER, style]

  const navigation = useNavigation()
  const goToOwnerHome = () => navigation.navigate("OwnerHome")
  const goToDao = () => navigation.navigate("Dao")

  return (
    <View style={styles}>
      <TouchableOpacity style={MENU_CONTAINER} onPress={goToOwnerHome}>
        <AntDesign name="home" size={34} color="white" />
        <Text style={MENU_TEXT}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={MENU_CONTAINER}>
        <Entypo name="gauge" size={34} color="white" />
        <Text style={MENU_TEXT}>Perf</Text>
      </TouchableOpacity>

      <TouchableOpacity style={MENU_CONTAINER}>
        <View style={ICON_WRAPPER}>
          <Feather name="heart" size={34} color="white" />
          <View style={ICON_CONTAINER}>
            <Feather name="activity" size={14} color="white" />
          </View>
        </View>
        <Text style={MENU_TEXT}>Santé</Text>
      </TouchableOpacity>

      <TouchableOpacity style={MENU_CONTAINER}>
        <Ionicons name="briefcase-outline" size={34} color="white" />
        <Text style={MENU_TEXT}>Invest</Text>
      </TouchableOpacity>

      <TouchableOpacity style={MENU_CONTAINER} onPress={goToDao}>
        <Feather name="users" size={34} color="white" />
        <Text style={MENU_TEXT}>DAO</Text>
      </TouchableOpacity>

    </View>
  )
})

const CONTAINER: ViewStyle = {
  ...styling.CENTER_X,
  width: 100,
  paddingTop: 20,
  backgroundColor: palette.pinkBright
}

const MENU_CONTAINER: ViewStyle = {
  position: "relative",
  ...styling.CENTER_X,
  paddingVertical: 20,
}

const MENU_TEXT: TextStyle = {
  textAlign: "center",
  color: "white"
}

const ICON_WRAPPER: ViewStyle = {
  ...styling.CENTER,
  position: "relative",
}

const ICON_CONTAINER: TextStyle = {
  position: "absolute",
}
