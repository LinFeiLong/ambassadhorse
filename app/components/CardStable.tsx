import * as React from "react"
import { Image, ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { styling, fonts, palette, gradients } from "../theme"
import { Btn } from "./Btn"

export interface CardStableProps {
  style?: StyleProp<ViewStyle>
  name: string
  tokens: number
  initPrice: number
  currentPrice: number
  ownerSince: string
  picture: any
  onPress: () => void
}

export const CardStable = observer(function CardStable(props: CardStableProps) {
  const { style, picture, name, tokens, initPrice, currentPrice, ownerSince, onPress } = props
  const styles = [CONTAINER, style]

  return (
    <View style={styles}>
      <View style={IMG_CONTAINER}>
        <Image style={IMG} source={picture} />
        <Btn style={BTN} text="INFO" gradient={gradients.default} gradientStyle={BTN_GRADIENT} onPress={() => onPress} />
      </View>

      <Text style={TITLE}>{name}</Text>
      <Text style={SUBTITLE_ORANGE}>Ma part : {tokens} tokens</Text>
      <Text style={SUBTITLE}>Prix de revient initial : {initPrice}</Text>
      <Text style={SUBTITLE}>Prix de revient actuel : {currentPrice}</Text>
      <Text style={SUBTITLE}>Propriétaire depuis : {ownerSince}</Text>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  ...styling.POS_END,
  alignSelf: "flex-end",
  minWidth: 310,
  margin: 10
}

const IMG_CONTAINER: ViewStyle = {
  position: "relative",
  zIndex: 1,
}

const IMG: ImageStyle = {
  width: 310,
  height: 400,
  maxWidth: "100%",
  maxHeight: "100%",
  resizeMode: "cover"
}

const BTN: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  height: 30,
}

const BTN_GRADIENT: ViewStyle = {
  ...styling.CENTER_Y,
  height: 30,
  paddingHorizontal: 37,
  borderRadius: 25,
}

const TITLE: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  paddingVertical: 10,
  color: "white",
}

const SUBTITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 14,
  color: "white"
}

const SUBTITLE_ORANGE: TextStyle = {
  ...SUBTITLE,
  color: palette.orange
}
