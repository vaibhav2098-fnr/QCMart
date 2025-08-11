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
    width:moderateScale(80)
  },
  statusText: {
    color: '#041C45',
    fontSize: moderateScale(10),
    fontWeight: '500',
    textAlign:'center'
  },
  trackButton: {
    width: moderateScale(120),
    height: moderateScale(34),
    borderRadius: moderateScale(24),
    backgroundColor: '#041C45',
  },
  trackButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
});



