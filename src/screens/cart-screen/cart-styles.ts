import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const cartScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:statusBarHeight
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
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
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#000',
  },
  searchButton: {
    padding: moderateScale(8),
  },
  searchIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
  cartList: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    borderWidth:1,
    borderColor:'lightgray'
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: moderateScale(12),
    color: '#8C949D',
    marginBottom: moderateScale(4),
  },
  totalAmount: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#202020',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#041C45',
    paddingHorizontal: moderateScale(60),
    paddingVertical: moderateScale(12),
    marginBottom: moderateScale(12),
    borderRadius: moderateScale(30),
    height:moderateScale(57),
    width:moderateScale(220)
  },
  checkoutIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(8),
    tintColor: '#fff',
  },
  checkoutText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#fff',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(32),
  },
  emptyCartIcon: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode: 'contain',
    tintColor: '#9ca3af',
    marginBottom: moderateScale(16),
  },
  emptyCartText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#374151',
    marginBottom: moderateScale(8),
  },
  emptyCartSubtext: {
    fontSize: moderateScale(14),
    color: '#9ca3af',
    textAlign: 'center',
  },
  bottomSheetStyle: {
    borderWidth: 1,
    paddingHorizontal: moderateScale(16),
    borderColor: '#EEEEEE',
    height: 'auto',
    alignSelf: 'center',
    paddingVertical: moderateScale(16),
    bottom:-moderateScale(26)
}
}); 