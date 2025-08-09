import { moderateScale } from '../../utils/deviceConfig';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  selectedColor?: string;
  totalPrice?: number;
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: (item: CartItem) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const { name, price, image_url, quantity, selectedColor, totalPrice } = item;
  return (
    <View style={styles.card}>
      <View style={styles.bgProductImage}>
        <Image source={{uri:image_url}} style={styles.productImage} />
      </View>


      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{name}</Text>
        <Text style={styles.price}>₹{price.toLocaleString()}</Text>
        {selectedColor && (
          <Text style={styles.colorText}>Color: {selectedColor}</Text>
        )}
        {totalPrice && (
          <Text style={styles.totalPriceText}>Total: ₹{totalPrice.toLocaleString()}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onRemove(item)} style={styles.removeButton}>
          <Image source={Icons['fi-rr-trash']} style={styles.removeIcon} />
        </TouchableOpacity>

        <View style={styles.counter}>
          <TouchableOpacity 
            onPress={() => onQuantityChange(quantity - 1)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity 
            onPress={() => onQuantityChange(quantity + 1)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    marginVertical: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  productImage: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(12),
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginHorizontal: moderateScale(15),
  },
  title: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 5,
    color: '#202020'
  },
  price: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  colorText: {
    fontSize: moderateScale(12),
    color: '#666',
    marginTop: moderateScale(2),
  },
  totalPriceText: {
    fontSize: moderateScale(12),
    color: '#25D366',
    fontWeight: '600',
    marginTop: moderateScale(2),
  },
  actions: {
    alignItems: 'flex-end',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: moderateScale(8),
  },
  removeIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#ef4444',
  },
  counter: {
    marginTop: moderateScale(40),
    flexDirection: 'row',
    backgroundColor: '#f1f6ff',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    alignItems: 'center',
  },
  counterBtn: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
  },
  counterBtnText: {
    fontSize: moderateScale(18),
    fontWeight: '400',
    color: '#003D68'
  },
  counterText: {
    fontSize: moderateScale(12),
    marginHorizontal: moderateScale(6),
    fontWeight: '400',
    color: '#003D68'
  },
  bgProductImage: {
    height: moderateScale(120),
    width: moderateScale(120),
    backgroundColor: "#F6F6F6",
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
