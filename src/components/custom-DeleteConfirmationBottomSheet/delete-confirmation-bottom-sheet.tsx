import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomButton from '../custom-Button/button';
import CartItemCard from '../custom-CartItemCard/cartItem-card';
import { getDeviceWidth } from '../../utils/helper';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface DeleteConfirmationBottomSheetProps {
  item: CartItem | null;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const DeleteConfirmationBottomSheet: React.FC<DeleteConfirmationBottomSheetProps> = ({
  item,
  onConfirm,
  onCancel,
  visible,
}) => {
  if (!visible || !item) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.headerTitle}>Remove From Cart?</Text>
        <View style={styles.dividerLine} />
        <View style={styles.productCard}>
          <View style={styles.productImageContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
          </View>

          <View style={styles.productDetails}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.productPrice} numberOfLines={1}>₹{item.price.toLocaleString('en-IN')}</Text>
          </View>
        </View>
        <View style={styles.dividerLine} />

        <View style={styles.buttonContainer}>
          <CustomButton title='Cancel' textStyle={styles.cancelButtonText} containerStyle={styles.cancelButton} onPress={onCancel} />
          <CustomButton title='Yes, Remove' textStyle={styles.confirmButtonText} containerStyle={styles.confirmButton} onPress={onConfirm} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    margin: moderateScale(20),
    width: '90%',
    maxWidth: moderateScale(400),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: moderateScale(20),
    color: '#202020',
  },
  dividerLine: {
    marginLeft: -moderateScale(16),
    height: 2,
    backgroundColor: '#EEEEEE',
    width: getDeviceWidth() * 0.9
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(16),
    padding: moderateScale(15),
    marginBottom: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
    marginTop:moderateScale(16)
  },
  productImageContainer: {
    position: 'relative',
    marginRight: moderateScale(15),
  },
  productImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    backgroundColor: '#F6F6F6',
  },
  newBadge: {
    position: 'absolute',
    top: -moderateScale(5),
    left: -moderateScale(5),
    backgroundColor: '#3B82F6',
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  newBadgeText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#202020',
    marginBottom: moderateScale(5),
  },
  productPrice: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#202020',
    marginBottom: moderateScale(8),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f6ff',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    alignSelf: 'flex-start',
  },
  quantityButton: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
  },
  quantityButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#003D68',
  },
  quantityText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#003D68',
    marginHorizontal: moderateScale(8),
    minWidth: moderateScale(20),
    textAlign: 'center',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    padding: moderateScale(4),
  },
  deleteIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    tintColor: '#ef4444',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginTop:moderateScale(8)
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F6FB',
    borderRadius: moderateScale(30),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#003D68',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  confirmButton: {
    borderRadius: moderateScale(30),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
    width: '45%'

  },
  confirmButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});

export default DeleteConfirmationBottomSheet; 