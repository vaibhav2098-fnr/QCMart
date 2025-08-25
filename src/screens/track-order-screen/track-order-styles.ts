import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: statusBarHeight,
    paddingBottom:moderateScale(18),
    paddingHorizontal: moderateScale(16),
  },
  headerSpacer: {
    height: moderateScale(4),
  },
  content: {
    paddingHorizontal: moderateScale(2),
    paddingVertical: moderateScale(12),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    color: '#000000',
    marginBottom: moderateScale(16),
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(6),
    width:'50%'
  },
  infoLabel: {
    fontSize: moderateScale(10),
    color: '#8C949D',
    fontWeight: '300',
  },
  infoValue: {
    fontSize: moderateScale(10),
    color: '#344054',
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  productInfo: {
    flex: 0.7,
    alignItems:'flex-start'
  },
  productPriceInfo:{
    flex: 0.3,
    alignItems:'flex-end'
  },
  productName: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#111827',
    marginBottom: moderateScale(4),
    lineHeight: moderateScale(18),
  },
  dot: {
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: moderateScale(10),
    backgroundColor: '#6B6E73',
    marginRight: moderateScale(8),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(6),
  },
  productMeta: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  productPrice: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#09090A',
  },
  productQty: {
    fontSize: moderateScale(10),
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: moderateScale(4),
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  customerIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(8),
    tintColor: '#6B7280',
  },
  customerText: {
    fontSize: moderateScale(14),
    color: '#111827',
    fontWeight: '500',
  },
  customerName: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#09090A',
    marginBottom: moderateScale(12),
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: moderateScale(12),
  },
  addressIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    marginRight: moderateScale(8),
    marginTop: moderateScale(2),
    tintColor: '#6B7280',
  },
  addressText: {
    fontSize: moderateScale(10),
    color: '#8C949D',
    lineHeight: moderateScale(18),
    fontWeight:'400',
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    marginRight: moderateScale(8),
    tintColor: '#6B7280',
  },
  phoneText: {
    fontSize: moderateScale(10),
    color: '#8C949D',
    fontWeight:'400',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  summaryLabel: {
    fontSize: moderateScale(12),
    color: '#475467',
    fontWeight:'500',
  },
  summaryValue: {
    fontSize: moderateScale(14),
    color: '#111827',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: moderateScale(14),
    color: '#059669',
    fontWeight: '600',
  },
  taxValue: {
    fontSize: moderateScale(14),
    color: '#DC2626',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: moderateScale(12),
    borderStyle: 'dashed',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111827',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(40),
  },
  loadingText: {
    fontSize: moderateScale(14),
    color: '#6B6E73',
    fontWeight: '400',
    marginTop: moderateScale(16),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(40),
  },
  errorIcon: {
    height: moderateScale(60),
    width: moderateScale(60),
    resizeMode: 'contain',
    marginBottom: moderateScale(16),
    opacity: 0.5,
  },
  errorTitle: {
    fontSize: moderateScale(16),
    color: '#09090A',
    fontWeight: '600',
    marginBottom: moderateScale(8),
  },
  errorSubtitle: {
    fontSize: moderateScale(14),
    color: '#6B6E73',
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  emailIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    marginRight: moderateScale(8),
    tintColor: '#6B6E73',
  },
  emailText: {
    fontSize: moderateScale(10),
    color: '#8C949D',
    fontWeight: '400',
  },
});
