import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { getDeviceWidth, statusBarHeight } from '../../utils/helper';

export const checkoutScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop:statusBarHeight,
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
  section: {
    marginBottom: moderateScale(25),
    marginTop: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#09090A',
    marginBottom: moderateScale(15),
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
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
  addressLabel: {
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
  editButton: {
    padding: moderateScale(8),
  },
  editIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
    tintColor: '#666',
  },
  orderList: {
    marginVertical:moderateScale(16),
    paddingBottom:moderateScale(200)
  },
  orderItemCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,
    marginBottom:moderateScale(16),
    marginHorizontal:moderateScale(2),
  },
  productImageContainer: {
    position: 'relative',
    marginRight: moderateScale(12),
    width: moderateScale(120),
    height: moderateScale(120),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F6F6F6',
    borderRadius: moderateScale(25),
  },
  productImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    resizeMode:'contain'
  },
  newBadge: {
    position: 'absolute',
    top: -moderateScale(4),
    left: -moderateScale(4),
    backgroundColor: '#3B82F6',
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  newBadgeText: {
    color: '#fff',
    fontSize: moderateScale(8),
    fontWeight: 'bold',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#09090A',
    marginBottom: moderateScale(4),
    lineHeight: moderateScale(18),
  },
  productPrice: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#202020',
  },
  quantityBadge: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#f1f6ff',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right:moderateScale(16),
    bottom:moderateScale(14),
  },
  quantityText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#003D68',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: moderateScale(4),
  },
  totalAmount: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#202020',
  },
  checkoutButton: {
    backgroundColor: '#001f4d',
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(220),
  },
  checkoutText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  checkoutIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  dividerLine: {
    marginLeft: -moderateScale(16),
    height: 2,
    backgroundColor: '#EEEEEE',
    width: getDeviceWidth() * 0.9
  }
}); 