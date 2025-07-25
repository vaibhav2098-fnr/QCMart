import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utils/deviceConfig";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: moderateScale(16),
    },
    logo: {
      height: moderateScale(104),
      width: moderateScale(176),
      resizeMode: "contain",
    },
    heading: {
      marginTop: moderateScale(38),
      marginBottom: moderateScale(24),
      color: "#041C45",
      fontSize: moderateScale(24),
      fontWeight: "600",
      textAlign: "center",
    },
    iconImage: {
      height: moderateScale(24),
      width: moderateScale(24),
      resizeMode: "contain",
    },
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      marginVertical: moderateScale(20),
    },
    checkboxWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      height: moderateScale(24),
      width: moderateScale(24),
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#D9D9D9",
      justifyContent: "center",
      alignItems: "center",
    },
    checkIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
      resizeMode: "contain",
    },
    rememberMeText: {
      color: "#041C45",
      fontSize: moderateScale(14),
      fontWeight: "400",
      marginLeft: moderateScale(8),
    },
    forgotText: {
      color: "#041C45",
      fontSize: moderateScale(14),
      fontWeight: "400",
    },
    footer: {
      position: "absolute",
      bottom: moderateScale(40),
    },
    footerText: {
      color: "#041C45",
      fontSize: moderateScale(16),
      fontWeight: "400",
      textAlign: "center",
    },
    signUpText: {
      color: "#041C45",
      fontSize: moderateScale(16),
      fontWeight: "500",
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        marginBottom: 8,
        alignSelf: 'flex-start',
      },
  });
  