import * as React from "react"
import { Image, ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { styling, fonts, palette } from "../theme"

export interface CardOnSaleProps {
  style?: StyleProp<ViewStyle>
  end: string
  picture: any
  title: string
  price: number
  tokenPrice: number
}

export const CardOnSale = observer(function CardOnSale(props: CardOnSaleProps) {
  const { style, end, picture, title, price, tokenPrice } = props
  const styles = [CONTAINER, style]

  return (
    <View style={styles}>
      <Text style={CAPTION}>{end}</Text>
      <Image style={IMG} source={picture} />
      <Text style={TITLE}>{title}</Text>
      <Text style={SUBTITLE}>Total price {price}</Text>
      <Text style={SUBTITLE}>Token start price {tokenPrice}</Text>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  position: "relative",
  zIndex: 1,
  width: 310,
  maxWidth: "22%",
  ...styling.POS_END,
  alignSelf: "flex-end",
  margin: 10,
}

const CAPTION: TextStyle = {
  position: "absolute",
  zIndex: 10,
  top: 5,
  left: 5,
  fontFamily: fonts.nunito.bold,
  fontSize: 13,
  color: "black",
}

const IMG: ImageStyle = {
  width: 310,
  height: 330,
  maxWidth: "100%",
  maxHeight: "100%",
  resizeMode: "cover",
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
  color: palette.orange
}
