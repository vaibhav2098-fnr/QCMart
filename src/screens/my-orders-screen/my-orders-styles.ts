import { statusBarHeight } from '@/src/utils/helper';
import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(16),
    marginTop: statusBarHeight,
  },
  listContent: {
    paddingVertical: moderateScale(8),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(2),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginVertical: moderateScale(8),
  },
  productThumbWrapper: {
    backgroundColor: '#F8FAFC',
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  productThumb: {
    height: moderateScale(80),
    width: moderateScale(80),
    resizeMode: 'contain',
  },
  infoBlock: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(12),
    color: '#09090A',
    fontWeight: '600',
    lineHeight:moderateScale(20)
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(6),
  },
  dot: {
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: moderateScale(10),
    backgroundColor: '#6B6E73',
    marginRight: moderateScale(8),
  },
  metaText: {
    color: '#202020',
    fontSize: moderateScale(12),
    fontWeight: '400',
  },
  price: {
    marginTop: moderateScale(8),
    fontWeight: '600',
    color: '#09090A',
    fontSize: moderateScale(14),
  },
  rightCol: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
  },
  statusPill: {
    backgroundColor: '#E8F1FF',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
    width:moderateScale(70)
  },
  statusText: {
    color: '#041C45',
    fontSize: moderateScale(10),
    fontWeight: '500',
    textAlign:'center'
  },
  trackButton: {
    width: moderateScale(100),
    height: moderateScale(34),
    borderRadius: moderateScale(24),
    backgroundColor: '#041C45',
  },
  trackButtonText: {
    fontSize: moderateScale(10),
    fontWeight: '600',
  },
  orderId: {
    fontSize: moderateScale(14),
    color: '#041C45',
    fontWeight: '700',
    marginBottom: moderateScale(4),
  },
  customerName: {
    fontSize: moderateScale(13),
    color: '#09090A',
    fontWeight: '600',
    marginBottom: moderateScale(4),
  },
  shippingText: {
    fontSize: moderateScale(11),
    color: '#6B6E73',
    fontWeight: '400',
    marginTop: moderateScale(2),
  },
  initialLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(40),
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(20),
  },
  loadingText: {
    fontSize: moderateScale(14),
    color: '#6B6E73',
    fontWeight: '400',
    marginLeft: moderateScale(8),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(60),
  },
  emptyIcon: {
    height: moderateScale(60),
    width: moderateScale(60),
    resizeMode: 'contain',
    marginBottom: moderateScale(16),
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: moderateScale(16),
    color: '#09090A',
    fontWeight: '600',
    marginBottom: moderateScale(8),
  },
  emptySubtitle: {
    fontSize: moderateScale(14),
    color: '#6B6E73',
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
});



