// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from 'react-native'

import {
  NunitoSans_300Light as nunitoLight,
  NunitoSans_700Bold as nunitoBold,
  NunitoSans_900Black as nunitoBlack
} from '@expo-google-fonts/nunito-sans'
import {
    SpaceGrotesk_300Light as spaceGroteskLight, SpaceGrotesk_400Regular as spaceGroteskRegular,
    SpaceGrotesk_500Medium as spaceGroteskMedium, SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
    SpaceGrotesk_700Bold as spaceGroteskBold
} from '@expo-google-fonts/space-grotesk'
import {
  Anton_400Regular as anton
} from '@expo-google-fonts/anton'
import {
  Poppins_500Medium as poppinsMedium
} from '@expo-google-fonts/poppins'

import {
  Tomorrow_700Bold as tomorrowBold
} from '@expo-google-fonts/tomorrow'

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,

  nunitoLight,
  nunitoBold,
  nunitoBlack,
  anton,
  poppinsMedium,
  tomorrowBold
}

export const fonts = {
  nunito: {
    light: "nunitoLight",
    bold: "nunitoBold",
    black: "nunitoBlack"
  },

  anton: {
    regular: "anton"
  },

  poppins: {
    medium: "poppinsMedium"
  },

  tomorrow: {
    bold: "tomorrowBold"
  },

  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
