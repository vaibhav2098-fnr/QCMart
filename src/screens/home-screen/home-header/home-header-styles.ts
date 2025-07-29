import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utils/deviceConfig";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: moderateScale(44),
      alignItems: 'center',
      marginTop: moderateScale(6),
    },
    icon: {
      height: moderateScale(24),
      width: moderateScale(24),
      resizeMode: 'center',
    },
    logo: {
      height: moderateScale(44),
      width: moderateScale(109),
      resizeMode: 'center',
    },
    rightIcons: {
      flexDirection: 'row',
    },
    marginRight: {
      marginRight: moderateScale(6),
    },
  });