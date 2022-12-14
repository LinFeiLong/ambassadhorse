import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, Text, TextStyle, View, ViewStyle } from "react-native"

import { StackScreenProps } from "@react-navigation/stack"

import { CardStable, OwnerHeader, Screen, Sidebar } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, fonts, spacing, styling } from "../theme"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const DATA = [
  {
    id: 1,
    name: "Lucky Crypto",
    tokens: 1,
    initPrice: "30 000",
    currentPrice: "60 000",
    ownerSince: "01/04/22",
    picture: require("../../assets/images/horse1.png"),
  },
  {
    id: 2,
    name: "Millenium",
    tokens: 2,
    initPrice: "30 000",
    currentPrice: "60 000",
    ownerSince: "01/04/22",
    picture: require("../../assets/images/horse2.png"),
  },
  {
    id: 3,
    name: "Alyra du web",
    tokens: 1,
    initPrice: "30 000",
    currentPrice: "60 000",
    ownerSince: "01/04/22",
    picture: require("../../assets/images/horse3.jpg"),
  },
]

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const OwnerHomeScreen: FC<StackScreenProps<AppStackScreenProps, "OwnerHome">> = observer(
  function OwnerHomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    // Flatlist items
    const renderItem = ({ item }) => (
      <CardStable
        picture={item.picture}
        name={item.name}
        tokens={item.tokens}
        initPrice={item.initPrice}
        currentPrice={item.currentPrice}
        ownerSince={item.ownerSince}
        onPress={() => {}}
        onSalePress={() => {}}
      />
    )

    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar />

        <View style={MAIN_WRAPPER}>
          <OwnerHeader horseImgVisible={false} />
          <Text style={TITLE}>Mon écurie</Text>

          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={FLATLIST}
          />
        </View>
      </Screen>
    )
  },
)

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
  paddingVertical: 30,
  color: "white",
}

const FLATLIST: ViewStyle = {
  ...styling.ROW_CENTER_X,
  flexWrap: "wrap",
}
