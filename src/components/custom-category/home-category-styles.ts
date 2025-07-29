import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/deviceConfig";

export const styles = StyleSheet.create({
  item: {
    width: '22%', // fits 4 per row with spacing
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  iconWrapper: {
    backgroundColor: '#EAF5FE',
    borderRadius: 100,
    padding: moderateScale(15),
    marginBottom: moderateScale(6),
  },
  icon: {
    height: moderateScale(24),
    width: moderateScale(24),
    resizeMode: 'contain',
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    textAlign: 'center',
    color:'#09090A'
  },
});
