import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Image, ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'

import { AntDesign } from '@expo/vector-icons'

import { colors, fonts, gradients, palette, styling } from '../theme'
import { Btn } from './Btn'

export interface CardOnSaleProps {
  style?: StyleProp<ViewStyle>
  deadline: string
  picture: any
  title: string
  price: number
  tokenPrice: number
  onPress: () => void
}

export const CardOnSale = observer(function CardOnSale(props: CardOnSaleProps) {
  const { style, deadline, picture, title, price, tokenPrice, onPress } = props
  const styles = [CONTAINER, style]

  return (
    <View style={styles}>
      {deadline ? (
        <View style={CAPTION_CONTAINER}>
          <AntDesign name="clockcircleo" size={24} color="white" />
          <Text style={CAPTION}>{deadline}</Text>
        </View>
      ) : null}

      <View style={IMG_CONTAINER}>
        <Image style={IMG} source={{ uri: picture }} />
        <Btn
          style={BTN_INFO}
          text="En savoir +"
          textStyle={BTN_TEXT}
          gradient={gradients.default}
          gradientStyle={BTN_GRADIENT}
          onPress={onPress}
        />
      </View>

      <Text style={TITLE}>{title}</Text>
      <Text style={[SUBTITLE, { color: "#179cff" }]}>Total price {price}</Text>
      <Text style={[SUBTITLE, { color: "#ff1a92" }]}>Token start price {tokenPrice}</Text>
    </View>
  )
})

const CONTAINER: ViewStyle = {
  position: "relative",
  zIndex: 1,
  ...styling.POS_END,
  alignSelf: "flex-end",
  minWidth: 310,
  margin: 10,
}

const CAPTION_CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  position: "absolute",
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  padding: 10,
  backgroundColor: colors.cardOverlay,
}

const CAPTION: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 13,
  paddingHorizontal: 5,
  color: "white",
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
  resizeMode: "cover",
}

const BTN_INFO: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  height: 30,
}

const BTN_GRADIENT: ViewStyle = {
  ...styling.CENTER_Y,
  height: 30,
  paddingHorizontal: 20,
  borderRadius: 25,
}

const BTN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 14,
  paddingLeft: 5,
  color: "black",
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
  color: palette.orange,
}
