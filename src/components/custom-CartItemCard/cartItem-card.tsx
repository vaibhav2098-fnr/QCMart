import { moderateScale } from '@/src/utils/deviceConfig';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartItemCardProps {
  image: string;
  title: string;
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  image,
  title,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.bgProductImage}>
        <Image source={image} style={styles.productImage} />
      </View>


      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.price}>₹{price.toLocaleString()}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>

        <View style={styles.counter}>
          <TouchableOpacity onPress={onDecrement}>
            <Text style={styles.counterBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity onPress={onIncrement}>
            <Text style={styles.counterBtn}>+</Text>
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
  actions: {
    alignItems: 'flex-end',
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
    fontSize: moderateScale(18),
    paddingHorizontal: moderateScale(10),
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
