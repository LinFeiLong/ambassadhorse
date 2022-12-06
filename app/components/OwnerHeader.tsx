import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { styling, fonts, palette } from "../theme"
import { Text } from "./Text"

export interface OwnerHeaderProps {
  style?: StyleProp<ViewStyle>
  horseImgVisible?: boolean
}

const avatar = require('../../assets/images/avatar.png')
const horse = require('../../assets/images/horse-owned.png')

export const OwnerHeader = observer(function OwnerHeader(props: OwnerHeaderProps) {
  const { style, horseImgVisible = true } = props
  const styles = [CONTAINER, style]

  return (
    <View style={styles}>
      <View style={styling.ROW_CENTER_Y}>
        <Image source={avatar} style={AVATAR_IMG} />

        <View style={AVATAR_CAPTION}>
          <Text style={AVATAR_CAPTION_TITLE}>Hello Olivia Wilson !</Text>
          <Text style={AVATAR_CAPTION_SUBTITLE}>Espace propriétaire</Text>
        </View>
      </View>

      {
        horseImgVisible
          ? (<View style={[styling.COL, styling.CENTER_X]}>
            <Image source={horse} style={HORSE_IMG} />
            <Text style={HORSE_CAPTION}>Liberty</Text>
          </View>
          ) : null
      }
    </View>
  )
})

const CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  ...styling.SPACE_BETWEEN
}

const AVATAR_CAPTION: ViewStyle = {
  paddingLeft: 38
}

const AVATAR_CAPTION_TITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 22,
  color: "white"
}

const AVATAR_CAPTION_SUBTITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 18,
  color: "white"
}

const AVATAR_IMG: ImageStyle = {
  width: 313 / 3,
  height: 318 / 3,
  resizeMode: "contain"
}

const HORSE_IMG: ImageStyle = {
  width: 328 / 3,
  height: 338 / 3,
  resizeMode: "contain"
}

const HORSE_CAPTION: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 15,
  color: palette.orange
}