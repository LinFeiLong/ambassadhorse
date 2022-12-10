import * as React from "react"
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { LinearGradient } from 'expo-linear-gradient'
import { styling } from "../theme"

export interface BtnProps {
  style?: StyleProp<ViewStyle>
  onPress: () => void
  text?: string
  textStyle?: StyleProp<TextStyle>
  gradient?: any
  gradientStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const Btn = observer(function Btn(props: BtnProps) {
  const { style, onPress, text, textStyle, gradient, gradientStyle, children, iconPosition = "left" } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity style={$styles} onPress={onPress}>
      {
        gradient
          ? (
            <LinearGradient {...gradient} style={[{ flexDirection: (children) ? "row" : "column" }, gradientStyle]}>
              {(children && iconPosition === "left") ? children : null}
              <Text style={textStyle}>{text}</Text>
              {(children && iconPosition === "right") ? children : null}
            </LinearGradient>
          )
          :
          <View style={{ flexDirection: (children) ? "row" : "column" }}>
            {(children && iconPosition === "left") ? children : null}
            <Text style={textStyle}>{text}</Text>
            {(children && iconPosition === "right") ? children : null}
          </View>
      }
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  ...styling.CENTER,
  height: 40,
  borderRadius: 25,
}