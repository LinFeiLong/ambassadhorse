import { observer } from 'mobx-react-lite'
import React from 'react'
import { useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'

import { Navbar } from '../components'
import Config from '../config'
import {
    AdminCreateScreen, AdminFormDaoScreen, ConceptScreen, DaoScreen, HomeScreen, HorseDetailsScreen,
    HorsesScreen, NewsScreen, OwnerHomeScreen, ResaleScreen
} from '../screens'
import { navigationRef, useBackButtonHandler } from './navigationUtilities'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  // Welcome: undefined
  // Login: undefined // @demo remove-current-line
  // Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line

  // 🔥 Your screens go here
  Home: undefined
  Horses: undefined
  Resale: undefined
  Concept: undefined
  News: undefined
  Dao: undefined
  OwnerHome: undefined
  AdminCreate: undefined
  AdminFormDao: undefined
  HorseDetails: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            header: () => <Navbar route={route} />,
          })}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Horses" component={HorsesScreen} />
          <Stack.Screen name="Resale" component={ResaleScreen} />
          <Stack.Screen name="Concept" component={ConceptScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
          <Stack.Screen name="Dao" component={DaoScreen} />
          <Stack.Screen name="OwnerHome" component={OwnerHomeScreen} />
          <Stack.Screen name="AdminCreate" component={AdminCreateScreen} />
          <Stack.Screen name="AdminFormDao" component={AdminFormDaoScreen} />
          <Stack.Screen name="HorseDetails" component={HorseDetailsScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </View>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
