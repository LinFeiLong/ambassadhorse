import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { OwnerHeader, Screen, Sidebar } from "../components"
import { colors, fonts, spacing, styling } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const OwnerHomeScreen: FC<StackScreenProps<AppStackScreenProps, "OwnerHome">> = observer(function OwnerHomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
      <Sidebar />

      <View style={MAIN_WRAPPER}>
        <OwnerHeader horseImgVisible={false} />
        <Text style={TITLE}>Mon écurie</Text>

      </View>
    </Screen>
  )
})

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground,
}

const CONTAINER_INNER: ViewStyle = {
  flexGrow: 1,
  ...styling.ROW_SPACE_BETWEEN,
}


// MAIN CONTENT
const MAIN_WRAPPER: ViewStyle = {
  flex: 1,
  paddingTop: 30,
  paddingHorizontal: spacing.screen,
}

const TITLE: TextStyle = {
  fontFamily: fonts.poppins.medium,
  fontSize: 26,
  paddingBottom: 24,
  color: "white"
}


