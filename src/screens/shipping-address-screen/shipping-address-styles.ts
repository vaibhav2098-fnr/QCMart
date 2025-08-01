import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const shippingAddressScreenStyles = StyleSheet.create({
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
  addressList: {
    paddingBottom: moderateScale(20),
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addressIconContainer: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(40),
    backgroundColor: '#F0F6FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  addressIconSubContainer: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(20),
    backgroundColor: '#93BF06',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#202020',
    marginBottom: moderateScale(4),
  },
  addressText: {
    fontSize: moderateScale(12),
    color: '#666',
    lineHeight: moderateScale(16),
  },
  addNewAddressButton: {
    backgroundColor: '#f1f6ff',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  addNewAddressText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#003D68',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    backgroundColor: '#001f4d',
    borderRadius: moderateScale(12),
  },
  applyButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(24),
    margin: moderateScale(20),
    width: '90%',
    maxWidth: moderateScale(400),
  },
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#202020',
    textAlign: 'center',
    marginBottom: moderateScale(24),
  },
  inputContainer: {
    marginBottom: moderateScale(20),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#202020',
    marginBottom: moderateScale(8),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    fontSize: moderateScale(16),
    color: '#202020',
    backgroundColor: '#f8f9fa',
  },
  multilineInput: {
    height: moderateScale(80),
    textAlignVertical: 'top',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginTop: moderateScale(8),
  },
  cancelModalButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(12),
  },
  cancelModalButtonText: {
    color: '#666',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  saveModalButton: {
    flex: 1,
    backgroundColor: '#001f4d',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(12),
  },
  saveModalButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
}); 