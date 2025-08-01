import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const chooseShippingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: moderateScale(8),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    tintColor: '#202020',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#202020',
  },
  headerSpacer: {
    width: moderateScale(40),
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  shippingOptionCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  shippingOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  locationIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#041C45',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  locationIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  shippingDetails: {
    flex: 1,
  },
  shippingName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#09090A',
    marginBottom: moderateScale(4),
  },
  estimatedArrival: {
    fontSize: moderateScale(12),
    color: '#8C949D',
    lineHeight: moderateScale(16),
  },
  costContainer: {
    marginRight: moderateScale(16),
  },
  costText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#09090A',
  },
  radioButtonContainer: {
    marginLeft: moderateScale(8),
  },
  radioButton: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#003D68',
    backgroundColor: '#003D68',
  },
  radioButtonInner: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    backgroundColor: '#041C45',
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
}); 