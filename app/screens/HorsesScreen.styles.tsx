import { TextStyle, ViewStyle } from 'react-native'

import { colors, fonts, spacing, styling } from '../theme'

export const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground,
}

// SUBNAV
export const SUBNAV: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal: spacing.screen,
  paddingTop: 30,
  paddingBottom: 24,
}
export const SUBNAV_MENU_ITEM: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.nunito.light,
  paddingBottom: 10,
  marginHorizontal: 10,
  color: "white",
}
export const SUBNAV_MENU_ACTIVE: TextStyle = {
  borderBottomColor: "#424242",
  borderBottomWidth: 3,
}

export const FLATLIST: ViewStyle = {
  ...styling.ROW_CENTER_X,
  flexWrap: "wrap",
  marginBottom: 70,
}
