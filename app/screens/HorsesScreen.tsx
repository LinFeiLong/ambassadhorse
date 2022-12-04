import React, { FC, useState } from "react"
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
    price: "30 000€",
    tokenPrice: "30€",
    picture: require('../../assets/images/horse1.png'),
    end: "Ends in 30 days"
  },
  {
    id: 2,
    title: "Millenium",
    price: "40 000€",
    tokenPrice: "40€",
    picture: require('../../assets/images/horse2.png'),
    end: "Ends in 4 days"
  },
  {
    id: 3,
    title: "Alyra du web",
    price: "20 000€",
    tokenPrice: "20€",
    picture: require('../../assets/images/horse3.jpg'),
    end: "Ends in 15 days"
  },
  {
    id: 4,
    title: "Klodette de Massa",
    price: "35 000€",
    tokenPrice: "35€",
    picture: require('../../assets/images/horse4.png'),
    end: "Ends in 1 hour"
  },
  {
    id: 5,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require('../../assets/images/horse3.jpg'),
    end: ""
  },
  {
    id: 6,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require('../../assets/images/horse3.jpg'),
    end: ""
  },
  {
    id: 7,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require('../../assets/images/horse3.jpg'),
    end: ""
  },
  {
    id: 8,
    title: "Klodette de Massa",
    price: "27 000€",
    tokenPrice: "27€",
    picture: require('../../assets/images/horse3.jpg'),
    end: ""
  }
]


// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HorsesScreen: FC<StackScreenProps<AppStackScreenProps, "Horses">> = observer(function HorsesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  // Tabs
  const tab = ["Nos 2 ans", "Nos 3 ans", "Nos 4 ans"]
  const [active, setActive] = useState("Nos 2 ans")
  const handlePress = (tab) => setActive(tab)

  const Item = ({ picture, title, price, tokenPrice, end  }) => {
    return (
      <View style={LIST_ITEM_CONTAINER}>
        <Text style={LIST_CAPTION}>{end}</Text>
        <Image style={LIST_IMG} source={picture} />
        <Text style={LIST_TITLE}>{title}</Text>
        <Text style={LIST_SUBTITLE}>Total price {price}</Text>
        <Text style={LIST_SUBTITLE}>Token start price {tokenPrice}</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <Item picture={item.picture} title={item.title} price={item.price} tokenPrice={item.tokenPrice} end={item.end}  />
  )

  return (
    <Screen style={$root} preset="scroll">
      <View style={SUBNAV}>
        {
          tab.map(i =>
            <TouchableOpacity key={i} onPress={() => handlePress(i)} style={(active === i) ? SUBNAV_MENU_ACTIVE : null }>
              <Text style={SUBNAV_MENU_ITEM}>{i}</Text>
            </TouchableOpacity>
          )
        }
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={4}
        columnWrapperStyle={FLATLIST}
      />
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
const LIST_ITEM_CONTAINER: ViewStyle = {
  position: "relative",
  zIndex: 1,
  width: 310,
  maxWidth: "22%",
  ...styling.POS_END,
  alignSelf: "flex-end",
  margin: 10,
}

const LIST_CAPTION: TextStyle = {
  position: "absolute",
  zIndex: 10,
  top: 5,
  left: 5,
  fontFamily: fonts.nunito.bold,
  fontSize: 13,
  color: "black",
}

const LIST_IMG: ImageStyle = {
  width: 310,
  height: 330,
  maxWidth: "100%",
  maxHeight: "100%",
  resizeMode: "cover",
}

const LIST_TITLE: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  paddingVertical: 10,
  color: "white",
}

const LIST_SUBTITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 14,
  color: palette.orange
}

const FLATLIST: ViewStyle = {
  ...styling.ROW_CENTER_X,
  alignSelf: "center",
  width: "99%"
}

