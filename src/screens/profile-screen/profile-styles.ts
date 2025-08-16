import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(16),
    marginTop: statusBarHeight,
  },
  headerSpacer: {
    height: moderateScale(4),
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(120),
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    height: moderateScale(64),
    width: moderateScale(64),
    resizeMode: 'contain',
  },
  editBadge: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScale(6),
    height: moderateScale(28),
    width: moderateScale(28),
    borderRadius: moderateScale(28),
    backgroundColor: '#041C45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: moderateScale(14),
    color: '#09090A',
    marginTop: moderateScale(6),
    fontWeight:'400'
  },
  sectionSpacer: {
    height: moderateScale(8),
  },
  updateButton: {
    marginTop: moderateScale(12),
    marginBottom: moderateScale(20),
    backgroundColor: '#041C45',
  },
  errorText: {
    fontSize: moderateScale(12),
    color: '#ff4d4f',
    textAlign: 'left',
},
});


