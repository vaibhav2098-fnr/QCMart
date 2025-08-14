import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils/deviceConfig';
import { statusBarHeight } from '../../../utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: statusBarHeight,
    marginBottom: moderateScale(30),
    justifyContent:'space-between'
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: moderateScale(16),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#001f4d',
  },
  logo: {
    height: moderateScale(104),
    width: moderateScale(176),
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: moderateScale(100),
  },
  contentContainer: {
    justifyContent: 'center',
  },
  heading: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#001f4d',
    textAlign: 'center',
    marginBottom: moderateScale(12),
  },
  subHeading: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: moderateScale(40),
    lineHeight: moderateScale(24),
  },
  iconImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#666',
  },
  footer: {
    marginTop: moderateScale(30),
    alignItems: 'center',
  },
  footerText: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
  },
  signInText: {
    color: '#001f4d',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

