import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Text, TextStyle, TextInput } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Btn, Screen, Sidebar } from "../components"
import { styling, spacing, colors, fonts, palette } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AdminCreateScreen: FC<StackScreenProps<AppStackScreenProps, "AdminCreate">> = observer(
  function AdminCreateScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    // FORM
    const [name, onChangeName] = useState("")
    const [price, onChangePrice] = useState("")
    const [tokens, onChangeTokens] = useState("")
    const [description, onChangeDescription] = useState("")

    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar admin />

        <View style={MAIN_WRAPPER}>
          <View style={FORM_CONTAINER}>
            <View style={HEADER}>
              <Text style={TITLE}>Créer un nouveau cheval</Text>
            </View>

            <View style={BODY}>
              <Text style={SUBTITLE}>Image, Video, Audio, or 3D Model</Text>
              <Text style={TEXT_INFO}>
                Fichiers acceptés: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                size: 100 MB
              </Text>

              <Text style={INPUT_LABEL}>Nom</Text>
              <TextInput
                editable
                placeholder="Nom du cheval"
                placeholderTextColor={colors.placeholder}
                maxLength={150}
                onChangeText={(text) => onChangeName(text)}
                value={name}
                style={INPUT}
              />

              <Text style={INPUT_LABEL}>Prix du token</Text>
              <TextInput
                editable
                placeholder="Prix du token"
                placeholderTextColor={colors.placeholder}
                maxLength={150}
                onChangeText={(text) => onChangePrice(text)}
                value={price}
                style={INPUT}
              />

              <Text style={INPUT_LABEL}>Nombre de tokens</Text>
              <TextInput
                editable
                placeholder="Nombre de tokens"
                placeholderTextColor={colors.placeholder}
                maxLength={150}
                onChangeText={(text) => onChangeTokens(text)}
                value={tokens}
                style={INPUT}
              />

              <Text style={INPUT_LABEL}>Description</Text>
              <TextInput
                editable
                multiline
                numberOfLines={5}
                maxLength={150}
                onChangeText={(text) => onChangeDescription(text)}
                value={description}
                style={INPUT_TEXTAREA}
              />

              <Btn style={BTN} text="create" textStyle={BTN_TEXT} onPress={() => {}} />
            </View>
          </View>
        </View>
      </Screen>
    )
  },
)

const INPUT: ViewStyle = {
  height: 30,
  borderBottomWidth: 2,
  borderBottomColor: "black",
  marginBottom: 15,
}

const INPUT_LABEL: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  textTransform: "uppercase",
}

const INPUT_TEXTAREA: ViewStyle = {
  padding: 15,
  borderWidth: 2,
  borderColor: "black",
}

const BTN: ViewStyle = {
  ...styling.CENTER_X,
  marginTop: 16,
  borderRadius: 5,
  backgroundColor: "#131724",
}

const BTN_TEXT: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  textTransform: "uppercase",
  color: "white",
}

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

const FORM_CONTAINER: ViewStyle = {
  alignSelf: "center",
  width: 450,
  maxWidth: "75%",
}

const HEADER: ViewStyle = {
  ...styling.CENTER_X,
  paddingVertical: 15,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  backgroundColor: palette.greyLight,
}

const TITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 26,
  color: "#131724",
}

const BODY: ViewStyle = {
  paddingHorizontal: 30,
  paddingTop: 10,
  paddingBottom: 30,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  backgroundColor: "white",
}

const SUBTITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  paddingTop: 10,
  textTransform: "uppercase",
  color: "#131724",
}

const TEXT_INFO: TextStyle = {
  paddingVertical: 8,
}
