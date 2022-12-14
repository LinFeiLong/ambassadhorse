import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"

import { AntDesign } from "@expo/vector-icons"

import { colors, fonts, gradients, palette, styling } from "../theme"
import { Btn } from "./Btn"

export enum EAttribute {
  total_price,
  token_price_at_start,
  end_date,
  investment_horizon,
  origin,
  type,
  gender,
  color,
  birthdate,
  birthplace,
  height,
}

type TAttribute = {
  display_type: string
  trait_type: string
  value: string
}

export type Metadata = {
  name: string
  description: string
  image: string
  external_url: string
  attributes: TAttribute[]
}

export interface CardOnSaleProps {
  style?: StyleProp<ViewStyle>
  metadata: Metadata
  onPress: () => void
}

export const CardOnSale = observer(function CardOnSale(props: CardOnSaleProps) {
  const { style, metadata, onPress } = props
  const { name, image: uri, attributes: a } = metadata
  const styles = [CONTAINER, style]

  return (
    <View style={styles}>
      {a?.[EAttribute.end_date]?.value ? (
        <View style={CAPTION_CONTAINER}>
          <AntDesign name="clockcircleo" size={24} color="white" />
          <Text style={CAPTION}>{a[EAttribute.end_date].value}</Text>
        </View>
      ) : null}

      <View style={IMG_CONTAINER}>
        <Image style={IMG} source={{ uri }} />
        <Btn
          style={BTN_INFO}
          text="En savoir +"
          textStyle={BTN_TEXT}
          gradient={gradients.default}
          gradientStyle={BTN_GRADIENT}
          onPress={onPress}
        />
      </View>

      <Text style={NAME}>{name}</Text>
      <Text style={[SUBTITLE, { color: "#179cff" }]}>
        {`Prix total: ${a[EAttribute.total_price].value} €`}
      </Text>
      <Text style={[SUBTITLE, { color: "#ff1a92" }]}>
        {`Prix initial du token: ${a[EAttribute.token_price_at_start].value} €`}
      </Text>
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

const NAME: TextStyle = {
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
