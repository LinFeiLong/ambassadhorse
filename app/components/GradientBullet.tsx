import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { LinearGradient } from "expo-linear-gradient"
import { gradients } from "../theme"

export interface GradientBulletProps {
  style?: StyleProp<ViewStyle>
  size?: number
}

export const GradientBullet = observer(function GradientBullet(props: GradientBulletProps) {
  const { style, size = 15 } = props
  const styles = [container, style]

  return (
    <LinearGradient style={styles} {...gradients.bullet}>
      <View style={{ height: size, width: size }}></View>
    </LinearGradient>
  )
})

const container: ViewStyle = {}
