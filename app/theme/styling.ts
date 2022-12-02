import { StyleSheet } from "react-native"

export const styling = StyleSheet.create({
    CENTER: {
        alignItems: "center",
        justifyContent: "center"
    },
    CENTER_X: {
        alignItems: "center"
    },
    POS_END: {
        justifyContent: "flex-end"
    },
    POS_START: {
        justifyContent: "flex-start"
    },
    ROW: { flexDirection: "row" },
    ROW_CENTER_X: {
        flexDirection: "row",
        justifyContent: "center",
    },
    ROW_CENTER_Y: {
        alignItems: "center",
        flexDirection: "row"
    },
    ROW_WRAP: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    SPACE_BETWEEN: {
        justifyContent: "space-between"
    }
})

