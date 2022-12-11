import React, { FC, useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, Text, TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Btn, Screen, Sidebar } from "../components"
import { colors, fonts, palette, styling } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { DatePickerModal } from "react-native-paper-dates"
import DropDownPicker from "react-native-dropdown-picker"
import { AntDesign } from "@expo/vector-icons"

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

    // DROPDOWN
    const [openDropdown, setOpenDropdown] = useState(false)
    const [value, setValue] = useState(null)
    // TODO: add data
    const [items, setItems] = useState([
      { label: "Lucky", value: "lucky" },
      { label: "Millenium", value: "millenium" },
      { label: "Liberty", value: "liberty" },
      { label: "Meteorite", value: "meteorite" },
    ])

    // DATE PICKER
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [open, setOpen] = useState(false)

    const onDismissSingle = useCallback(() => {
      setOpen(false)
    }, [setOpen])

    const onConfirmSingle = useCallback(
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
              <Text style={INPUT_LABEL}>Cheval</Text>
              <View style={DROPDOWN_CONTAINER}>
                <DropDownPicker
                  open={openDropdown}
                  value={value}
                  items={items}
                  setOpen={setOpenDropdown}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Sélectionner un cheval"
                  searchable={true}
                  searchPlaceholder="Chercher un cheval..."
                />
              </View>

              <Text style={[INPUT_LABEL, { marginTop: 25 }]}>Sujet</Text>
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
                <TouchableOpacity style={BTN} onPress={() => setOpen(true)}>
                  <Text style={BTN_TEXT}>Choisir une date</Text>
                  <AntDesign name="calendar" size={18} color="black" />
                </TouchableOpacity>

                <DatePickerModal
                  locale="fr"
                  mode="single"
                  label="Sélectionner une date"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                />
              </>

              <Btn
                style={BTN_SUBMIT}
                text="publication"
                textStyle={BTN_SUBMIT_TEXT}
                onPress={() => {}}
              />
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

const DROPDOWN_CONTAINER: ViewStyle = {
  position: "relative",
  zIndex: 2,
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
  marginVertical: 10,
}

// BUTTON
const BTN: ViewStyle = {
  ...styling.SPACE_BETWEEN,
  ...styling.ROW_CENTER_Y,
  minHeight: 50,
  paddingHorizontal: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "black",
  backgroundColor: "transparent",
}

const BTN_TEXT: TextStyle = {
  flex: 1,
}

const BTN_SUBMIT: ViewStyle = {
  ...styling.CENTER_X,
  marginTop: 16,
  borderRadius: 5,
  backgroundColor: "#131724",
}

const BTN_SUBMIT_TEXT: TextStyle = {
  fontFamily: fonts.nunito.bold,
  fontSize: 17,
  textTransform: "uppercase",
  color: "white",
}
