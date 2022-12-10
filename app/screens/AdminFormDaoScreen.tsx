import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Btn, Screen, Sidebar, Text } from "../components"
import { colors, fonts, palette, styling } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { Button } from "react-native-paper"
import { DatePickerModal } from "react-native-paper-dates"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AdminFormDaoScreen: FC<StackScreenProps<AppStackScreenProps, "AdminFormDao">> =
  observer(function AdminFormDaoScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    // FORM
    const [subject, onChangeSubject] = useState("")

    // PICKER
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [open, setOpen] = React.useState(false)

    const onDismissSingle = React.useCallback(() => {
      setOpen(false)
    }, [setOpen])

    const onConfirmSingle = React.useCallback(
      (params) => {
        setOpen(false)
        setDate(params.date)
      },
      [setOpen, setDate],
    )

    return (
      <Screen style={CONTAINER} contentContainerStyle={CONTAINER_INNER} preset="scroll">
        <Sidebar admin />

        <View style={MAIN_WRAPPER}>
          <View style={FORM_CONTAINER}>
            <View style={HEADER}>
              <Text style={TITLE}>Créer un vote</Text>
            </View>

            <View style={BODY}>
              <Text style={INPUT_LABEL}>Sujet</Text>
              <TextInput
                editable
                placeholder="Sujet du vote"
                placeholderTextColor={colors.placeholder}
                maxLength={150}
                onChangeText={(text) => onChangeSubject(text)}
                value={subject}
                style={INPUT}
              />

              <Text style={INPUT_LABEL}>Date butoire</Text>
              <>
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                  Pick single date
                </Button>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                />
              </>

              <Btn style={BTN} text="publication" textStyle={BTN_TEXT} onPress={() => {}} />
            </View>
          </View>

          <Text style={TEXT_INFO}>Vote créé le </Text>
        </View>
      </Screen>
    )
  })

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
  ...styling.CENTER,
}

const FORM_CONTAINER: ViewStyle = {
  alignSelf: "center",
  width: 450,
  maxWidth: "95%",
}

const HEADER: ViewStyle = {
  ...styling.CENTER_X,
  padding: 15,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  backgroundColor: palette.greyLight,
}

const TITLE: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 26,
  textAlign: "center",
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

const TEXT_INFO: TextStyle = {
  paddingVertical: 8,
}

// INPUT
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

// BUTTON
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
