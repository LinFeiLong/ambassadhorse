import React, { useState } from "react"
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { fonts, spacing, styling } from "../theme"

export interface SubnavProps {
  style?: StyleProp<ViewStyle>
}

/**
 * Home Subnav
 */
export const Subnav = observer(function Subnav(props: SubnavProps) {
  const { style } = props
  const styles = [CONTAINER, style]

  const subnav = ["Highlights", "Specifications", "Compare"]
  const [active, setActive] = useState("Highlights")
  const handlePress = (subnav) => setActive(subnav)

  return (
    <View style={styles}>
      {subnav.map((i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handlePress(i)}
          style={active === i ? MENU_ACTIVE : null}
        >
          <Text style={MENU_ITEM}>{i}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
})

const CONTAINER: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal: spacing.screen,
  paddingTop: 20,
}
const MENU_ITEM: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.nunito.light,
  paddingBottom: 10,
  marginHorizontal: 10,
  color: "white",
}
const MENU_ACTIVE: TextStyle = {
  borderBottomColor: "#424242",
  borderBottomWidth: 3,
}
