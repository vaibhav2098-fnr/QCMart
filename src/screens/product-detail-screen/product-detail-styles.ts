import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:statusBarHeight
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    backgroundColor: '#F6F6F6',
  },
  backButton: {
    padding: moderateScale(8),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: '#333',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    backgroundColor: '#F6F6F6',
    // backgroundColor: '#fff',
  },
  productImage: {
    width: moderateScale(300),
    height: moderateScale(250),
    marginBottom: moderateScale(20),
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#ddd',
    marginHorizontal: moderateScale(4),
  },
  activeDot: {
    backgroundColor: '#97d700',
    width: moderateScale(20),
  },
  detailsSection: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(20),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(16),
  },
  productTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#202020',
    flex: 1,
    marginRight: moderateScale(12),
    lineHeight: moderateScale(24),
  },
  favoriteButton: {
    padding: moderateScale(4),
  },
  favoriteIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  divider:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(6),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  soldBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(16),
  },
  soldText: {
    fontSize: moderateScale(12),
    color: '#93BF06',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#1e90ff',
    marginRight: moderateScale(4),
  },
  ratingText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#202020',
    marginRight: moderateScale(4),
  },
  reviewText: {
    fontSize: moderateScale(12),
    color: '#202020',
  },
  descriptionSection: {
    marginBottom: moderateScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#202020',
    marginBottom: moderateScale(12),
  },
  descriptionText: {
    fontSize: moderateScale(12),
    color: '#202020',
    lineHeight: moderateScale(20),
    fontWeight:'300'
  },
  colorSection: {
    marginBottom: moderateScale(24),
  },
  colorOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorOption: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#97d700',
    borderWidth: 3,
  },
  checkIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#fff',
  },
  quantitySection: {
    marginBottom: moderateScale(24),
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: moderateScale(25),
    paddingHorizontal: moderateScale(4),
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#333',
  },
  quantityText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: moderateScale(20),
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceContainer: {
    flex: 1,
  },
  totalPriceLabel: {
    fontSize: moderateScale(12),
    color: '#8C949D',
    marginBottom: moderateScale(4),
    fontWeight:'600'
  },
  totalPrice: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#202020',
  },
  addToCartButton: {
    flex: 1,
    marginLeft: moderateScale(16),
    backgroundColor: '#001f4d',
    borderRadius:moderateScale(30),
    flexDirection:'row'
  },
  checkoutIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(8),
    tintColor: '#fff',
  }
}); 