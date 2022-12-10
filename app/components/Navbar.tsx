// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values'
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims'

// Import the ethers library
import { ethers } from 'ethers'
import { observer } from 'mobx-react-lite'
import { Alert, Spinner, useToast } from 'native-base'
import React, { useState } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { EvilIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { RouteProp, useNavigation } from '@react-navigation/native'

import useEthersProvider from '../hooks/useEthersProvider'
import { AppStackParamList } from '../navigators'
import { colors, fonts, palette, styling } from '../theme'
import { hasMetamask } from '../utils/hasMetamask'
import { Btn } from './Btn'

// Menu items
const MENU = [
  {
    title: "Catalogue",
    hasSubmenu: true,
    link: "Horses",
  },

  // TODO: remove this menu item
  {
    title: "Admin",
    hasSubmenu: false,
    link: "AdminCreate",
  },

  // {
  //   title: "Revente",
  //   hasSubmenu: true,
  //   link: "Resale",
  // },
  // {
  //   title: "Concept",
  //   hasSubmenu: true,
  //   link: "Concept",
  // },
  // {
  //   title: "News",
  //   hasSubmenu: false,
  //   link: "News",
  // }
]

export interface NavbarProps {
  route: RouteProp<AppStackParamList, keyof AppStackParamList>
}

export const Navbar = observer(function Navbar(props: NavbarProps) {
  const { route } = props
  const routeName = route.name
  const submenuIconSize = 18

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goToHome = () => navigation.navigate("Home")
  const goToOwnerHome = () => navigation.navigate("OwnerHome")

  // Connect
  const [isLoading, setIsLoading] = useState(false)
  const { account, provider, setAccount } = useEthersProvider()
  const toast = useToast()

  const connectWallet = async () => {
    if (hasMetamask()) {
      setIsLoading(true)
      if (provider) {
        const network = await provider.getNetwork()
        if (network.chainId === 80001) {
          const resultAccount = await provider.send("eth_requestAccounts", [])
          setAccount(ethers.utils.getAddress(resultAccount[0]))
          setIsLoading(false)
          toast.show({
            title: "Congratulations",
            description: "Your wallet has been successfully connected",
            placement: "bottom",
          })
        } else {
          toast.show({
            title: "An error occured",
            description: "Please switch to Mumbai(Testnet)",
            placement: "bottom",
          })
        }
      }
    } else {
      toast.show({
        title: "An error occured",
        description: "Please install Metamask extension on your browser",
        placement: "bottom",
      })
    }
  }

  return (
    <View style={NAVBAR}>
      <View style={[styling.ROW, styling.ROW_CENTER_Y]}>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={24} color="white" style={ICON_MENU} />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={goToHome}>
          <Text style={LOGO_LABEL}>Ambassad'horse</Text>
        </TouchableOpacity>

        {MENU.map((item) => {
          return (
            <TouchableOpacity
              style={MENU_ITEM}
              key={item.title}
              onPress={() => {
                navigation.navigate(item.link)
              }}
            >
              {item.hasSubmenu ? (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={submenuIconSize}
                  color={routeName === item.link ? palette.orange : "white"}
                />
              ) : (
                <View
                  style={{
                    width: submenuIconSize,
                    height: submenuIconSize,
                    backgroundColor: "transparent",
                  }}
                ></View>
              )}
              <Text style={[MENU_TEXT, routeName === item.link ? MENU_ACTIVE : null]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={[styling.ROW, styling.ROW_CENTER_Y]}>
        {/* <TouchableOpacity>
          <EvilIcons name="search" size={24} color="white" style={NAVBAR_ICON} />
        </TouchableOpacity> */}

        {/* <TouchableOpacity>
          <SimpleLineIcons name="basket" size={18} color="white" style={NAVBAR_ICON} />
        </TouchableOpacity> */}

        {isLoading ? (
          <Spinner />
        ) : account ? (
          <Text style={{ color: "white" }}>{`Wallet: ${account.substring(
            0,
            5,
          )} ... ${account.substring(account.length - 5)}`}</Text>
        ) : (
          <Btn
            style={BTN_LOGIN}
            text="Connect Wallet"
            textStyle={BTN_LOGIN_TEXT}
            onPress={connectWallet}
          >
            <MaterialCommunityIcons name="account-outline" size={15} color="black" />
          </Btn>
        )}
      </View>
    </View>
  )
})

const NAVBAR: ViewStyle = {
  ...styling.ROW_CENTER_Y,
  justifyContent: "space-between",
  paddingHorizontal: 50,
  paddingVertical: 17,
  borderBottomColor: "rgba(255,255,255, 0.1)",
  borderBottomWidth: 1,
  backgroundColor: colors.screenBackground,
}

const ICON_MENU: ViewStyle = {
  paddingRight: 20,
}

const LOGO_LABEL: TextStyle = {
  fontSize: 15,
  fontFamily: fonts.nunito.bold,
  paddingRight: 50,
  color: "white",
}

const MENU_ITEM: ViewStyle = {
  ...styling.ROW,
  paddingHorizontal: 10,
}

const MENU_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  color: "white",
}

const MENU_ACTIVE: TextStyle = {
  color: palette.orange,
}

const NAVBAR_ICON: ViewStyle = {
  paddingHorizontal: 10,
}

const BTN_LOGIN: ViewStyle = {
  height: 30,
  marginHorizontal: 10,
  paddingHorizontal: 20,
  backgroundColor: "white",
}

const BTN_LOGIN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.light,
  fontSize: 12,
  paddingLeft: 5,
  color: "black",
}
