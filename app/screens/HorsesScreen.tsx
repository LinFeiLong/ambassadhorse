import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { FlatList, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import { CardOnSale, Screen } from '../components'
import { AppStackScreenProps } from '../navigators'
import { colors, fonts, spacing, styling } from '../theme'

// import { useStores } from "../models"

const DATA = [
  {
    id: 1,
    title: "Lucky Crypto",
    price: "30 000€",
    tokenPrice: "30€",
    picture: require("../../assets/images/horse1.png"),
    deadline: "Finit dans 30 jours",
  },
  {
    id: 2,
    title: "Millenium",
    price: "40 000€",
    tokenPrice: "40€",
    picture: require("../../assets/images/horse2.png"),
    deadline: "Finit dans 4 jours",
  },
  {
    id: 3,
    title: "Alyra du web",
    price: "20 000€",
    tokenPrice: "20€",
    picture: require("../../assets/images/horse3.jpg"),
    deadline: "Finit dans 15 jours",
  },
  {
    id: 4,
    title: "Klodette de Massa",
    price: "35 000€",
    tokenPrice: "35€",
    picture: require("../../assets/images/horse4.png"),
    deadline: "Finit dans 1 heure",
  },
  {
    id: 5,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require("../../assets/images/horse3.jpg"),
    deadline: "",
  },
  {
    id: 6,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require("../../assets/images/horse3.jpg"),
    deadline: "",
  },
  {
    id: 7,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require("../../assets/images/horse3.jpg"),
    deadline: "",
  },
  {
    id: 8,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require("../../assets/images/horse3.jpg"),
    deadline: "",
  },
]

export const HorsesScreen: FC<StackScreenProps<AppStackScreenProps, "Horses">> = observer(
  function HorsesScreen() {
    const navigation = useNavigation()
    const goToHorseDetails = () => navigation.navigate("HorseDetails")

    // Tabs
    const tab = ["Nos 2 ans", "Nos 3 ans", "Nos 4 ans"]
    const [active, setActive] = useState("Nos 2 ans")
    const handlePress = (tab) => setActive(tab)

    // Flatlist items
    const renderItem = ({ item }) => (
      <CardOnSale
        picture={item.picture}
        title={item.title}
        price={item.price}
        tokenPrice={item.tokenPrice}
        deadline={item.deadline}
        onPress={goToHorseDetails}
      />
    )

    return (
      <Screen style={$root} preset="scroll">
        <View style={SUBNAV}>
          {tab.map((i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handlePress(i)}
              style={active === i ? SUBNAV_MENU_ACTIVE : null}
            >
              <Text
                style={[
                  SUBNAV_MENU_ITEM,
                  { color: active === i ? colors.palette.orange : "white" },
                ]}
              >
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TODO: https://devfabi.com/react-native-dynamic-flatlist */}
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={FLATLIST}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground,
}

// SUBNAV
const SUBNAV: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal: spacing.screen,
  paddingTop: 30,
  paddingBottom: 24,
}
const SUBNAV_MENU_ITEM: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.nunito.light,
  paddingBottom: 10,
  marginHorizontal: 10,
  color: "white",
}
const SUBNAV_MENU_ACTIVE: TextStyle = {
  borderBottomColor: "#424242",
  borderBottomWidth: 3,
}

const FLATLIST: ViewStyle = {
  ...styling.ROW_CENTER_X,
  flexWrap: "wrap",
  marginBottom: 70,
}
