import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { colors, fonts, palette, spacing, styling } from "../theme"

export const $root: ViewStyle = {
  flex: 1,
  position: "relative",
  zIndex: 1,
  backgroundColor: colors.screenBackground,
}

export const LAYER: ViewStyle = {
  position: "absolute",
  zIndex: -1,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflow: "hidden",
}

export const WRAPPER: ViewStyle = {
  ...styling.ROW_SPACE_BETWEEN,
  ...styling.CENTER_Y,
  padding: spacing.screen,
}

export const BG_DECORATION: ImageStyle = {
  position: "absolute",
  right: -(845 / 3) / 2,
  width: 845 / 3,
  height: 853 / 3,
  transform: [{ rotate: "90deg" }],
}

export const COL_LEFT: ViewStyle = {
  flex: 1.3,
  paddingHorizontal: 15,
}

export const COL_RIGHT: ViewStyle = {
  flex: 2,
  paddingHorizontal: 15,
}

export const DEADLINE_CONTAINER: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginBottom: 10,
  borderRadius: 15,
  backgroundColor: "#3848F1",
}

export const DEADLINE_TEXT: TextStyle = {
  paddingLeft: 5,
  color: "white",
}

export const IMG: ImageStyle = {
  width: 310,
  height: 400,
  maxWidth: "100%",
  maxHeight: "100%",
  resizeMode: "cover",
}

export const BTN: ViewStyle = {
  alignSelf: "flex-start",
  height: 50,
  marginTop: 13,
  paddingHorizontal: 0,
  borderRadius: 0,
}

export const BTN_GRADIENT: ViewStyle = {
  ...styling.COL,
  height: 50,
  paddingHorizontal: 30,
  borderRadius: 5,
}

export const BTN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 25,
  paddingLeft: 5,
  color: "white",
}

export const BTN_TEXT_BOTTOM: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 11,
  textTransform: "uppercase",
  color: palette.orange,
}

export const MENTION: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 11,
  color: palette.orange,
}

export const MENTION_UNDERLINE: TextStyle = {
  ...MENTION,
  textDecorationLine: "underline",
}

export const TEXT_INFO_BOLD: TextStyle = {
  fontFamily: fonts.tomorrow.bold,
  fontSize: 12.5,
  paddingVertical: 15,
  textTransform: "uppercase",
  color: "white",
}

export const TEXT_INFO: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 11,
  textTransform: "uppercase",
  color: "white",
}

export const TITLE: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 42,
  textTransform: "uppercase",
  color: "white",
}

export const SUBTITLE: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 22,
  paddingBottom: 55,
  textTransform: "uppercase",
  color: "white",
}

export const SECTION: ViewStyle = {
  paddingVertical: 25,
}

export const TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 16,
  color: "white",
}

export const INVEST_TEXT: TextStyle = {
  fontFamily: fonts.nunito.black,
  fontSize: 13,
  textTransform: "uppercase",
  paddingLeft: 10,
  color: palette.purple,
}

// DISCLAIMER MODAL
export const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "50%",
  maxWidth: "50%",
}

export const MODAL_CONTENT: ViewStyle = {
  padding: 27,
  borderWidth: 3,
  borderColor: "white",
  backgroundColor: "#06367d",
}

// close icon container
export const MODAL_ICON_CONTAINER: ViewStyle = {
  ...styling.CENTER,
  width: 30,
  height: 30,
  borderRadius: 50,
  backgroundColor: "grey",
}

export const MODAL_TITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 15,
  letterSpacing: 2,
  color: "white",
}

export const MODAL_DESCRIPTION: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 15,
  paddingVertical: 15,
  color: "white",
}

export const MODAL_BTN: ViewStyle = {
  alignSelf: "center",
  paddingHorizontal: 25,
  borderRadius: 0,
  backgroundColor: "white",
}
