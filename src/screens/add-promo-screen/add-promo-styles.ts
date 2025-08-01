import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const addPromoScreenStyles = StyleSheet.create({
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
  searchButton: {
    padding: moderateScale(8),
  },
  searchIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#202020',
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  promoOptionCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  promoOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  promoIconContainer: {
    position: 'relative',
    marginRight: moderateScale(12),
  },
  promoIconInner: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode:'contain'
  },
  promoIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  decorativeDots: {
    position: 'absolute',
    top: -moderateScale(4),
    right: -moderateScale(4),
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: moderateScale(20),
    height: moderateScale(20),
  },
  dot: {
    width: moderateScale(4),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: '#3B82F6',
    margin: moderateScale(1),
  },
  promoDetails: {
    flex: 1,
  },
  promoTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#09090A',
    marginBottom: moderateScale(8),
  },
  promoDescription: {
    fontSize: moderateScale(12),
    color: '#8C949D',
    lineHeight: moderateScale(16),
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