// TODO: write documentation for colors and palette in own markdown file and add links from here

export const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  // ---------- AMBASSAD'HORSE PALETTE ----------
  orange: "#ef9e24",
  yellow: "#ffbd59",
  greyBlue: "#353A50",
  greenBright: "#34ca3f",
  pinkBright: "#ff1a92",
  purple: "#bb6ce6",
  blue: "#38b6ff",
  blueBright: "#41edda",
  blueDodger: "#3a8dcc",
  greyLight: "#dbe0e5",
  grey: "#595959",
  greyTransparent: "rgba(166, 166, 166, 0.62)",
}

export const colors = {
  // ---------- AMBASSAD'HORSE PALETTE ----------
  screenBackground: "black",
  admin: palette.blueDodger,
  placeholder: palette.grey,
  cardOverlay: palette.greyTransparent,

  palette,
  // --------------------------------------------
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}

export const gradients = {
  default: {
    colors: ["#ff1a92", "#179cff", "#0c3cdb"],
    start: { x: 0.9, y: 0 },
  },
  grey: {
    colors: ["rgb(67, 67, 67)", "rgba(143,152,157,0.60)", "#3F3F3F"],
    start: { x: 0, y: 0 },
  },
  bullet: {
    colors: ["#38b6ff", "#ff1a92"],
    start: { x: 0, y: 0 },
  },
}
