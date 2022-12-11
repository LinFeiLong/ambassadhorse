import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { FlatList, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import { CardOnSale, Screen } from '../components'
import { AppStackScreenProps } from '../navigators'
import { colors } from '../theme'
import { DATA } from './HorsesScreen.data'
import {
    $root, FLATLIST, SUBNAV, SUBNAV_MENU_ACTIVE, SUBNAV_MENU_ITEM
} from './HorsesScreen.styles'

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
          {tab.map((i) => {
            const subnavMenuItemStyles: TextStyle = {
              color: active === i ? colors.palette.orange : "white",
            }
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handlePress(i)}
                style={active === i ? SUBNAV_MENU_ACTIVE : null}
              >
                <Text style={[SUBNAV_MENU_ITEM, subnavMenuItemStyles]}>{i}</Text>
              </TouchableOpacity>
            )
          })}
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
