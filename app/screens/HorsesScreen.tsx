import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { styling, fonts, spacing, colors, palette } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const DATA = [
  {
    id: 1,
    title: "Lucky Crypto",
    subtitle: "1000 parts de 1% à 30€",
    picture: require('../../assets/images/horse1.png')
  },
  {
    id: 2,
    title: "Millenium",
    subtitle: "1000 parts de 1% à 40€",
    picture: require('../../assets/images/horse2.png')
  },
  {
    id: 3,
    title: "Alyra du web",
    subtitle: "1000 parts de 1% à 25€",
    picture: require('../../assets/images/horse3.jpg')
  },
  {
    id: 4,
    title: "Klodette de Massa",
    subtitle: "1000 parts de 1% à 60€",
    picture: require('../../assets/images/horse4.png')
  },
  {
    id: 5,
    title: "Klodette de Massa",
    subtitle: "1000 parts de 1% à 60€",
    picture: require('../../assets/images/horse3.jpg')
  },
  {
    id: 6,
    title: "Klodette de Massa",
    subtitle: "1000 parts de 1% à 60€",
    picture: require('../../assets/images/horse3.jpg')
  },
  {
    id: 7,
    title: "Klodette de Massa",
    subtitle: "1000 parts de 1% à 60€",
    picture: require('../../assets/images/horse3.jpg')
  },
  {
    id: 8,
    title: "Klodette de Massa",
    subtitle: "1000 parts de 1% à 60€",
    picture: require('../../assets/images/horse3.jpg')
  }


]

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HorsesScreen: FC<StackScreenProps<AppStackScreenProps, "Horses">> = observer(function HorsesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

const Item = ({ title, subtitle, picture }) => {
  return (
    <View style={LIST_ITEM_CONTAINER}>
      <Image style={LIST_IMG} source={picture} />
      <Text style={LIST_TITLE}>{title}</Text>
      <Text style={LIST_SUBTITLE}>{subtitle}</Text>
    </View>
  )
}

  const renderItem = ({ item }) => (
    <Item title={item.title} subtitle={item.subtitle} picture={item.picture} />
  )


  return (
    <Screen style={$root} preset="scroll">
      <View style={SUBNAV}>
        <TouchableOpacity>
          <Text style={[SUBNAV_MENU_ITEM, SUBNAV_MENU_ACTIVE]}>Nos 2 ans</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={SUBNAV_MENU_ITEM}>Nos 3 ans</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={SUBNAV_MENU_ITEM}>Nos 4 ans</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={4}
          columnWrapperStyle={[styling.ROW_CENTER_X,  { alignSelf: "center", width: "99%"   } ]}
        />
      </View>

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBackground
}

// SUBNAV
const SUBNAV: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal : spacing.screen,
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
  borderBottomWidth: 3
}

// LIST
const LIST_TITLE: TextStyle = {
  // TODO : Open Sauce
  fontSize: 12,
  paddingTop: 10,
  color: "white",
}

const LIST_SUBTITLE: TextStyle = {
  // TODO : Open Sauce
  fontFamily: fonts.nunito.bold,
  fontSize: 14,
  paddingTop: 9,
  color: palette.orange
}

const LIST_ITEM_CONTAINER: ViewStyle = {
  width: 310,
  maxWidth: "22%",
  ...styling.POS_END,
  alignSelf: "flex-end",
  margin: 10,
}

const LIST_IMG: ImageStyle = {
  width: 310,
  height: 330,
  maxWidth: "100%",
  maxHeight: "100%",
  resizeMode: "cover",
}


