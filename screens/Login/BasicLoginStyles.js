import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  buttonDefaultStyle: {
    padding: 10,
    backgroundColor: "#1D1F24",
    borderRadius: 100,
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  },
  textBox: {
    borderWidth: 1,
    borderColor: "#8F9BB3",
    padding: 13,
    borderRadius: 10,
    placeholderTextColor: "#8F9BB3"
  },
  titleSpaceGrotesk: {
    fontFamily: "SpaceGroteskMedium",
    fontSize: 30
  },
  formView: {
    minWidth: "90%",
    padding: 10,
    gap: 10,
  }
})

export default styles;