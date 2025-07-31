import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemCard from '../../components/custom-CartItemCard/cartItem-card';
import DeleteConfirmationBottomSheet from '../../components/custom-DeleteConfirmationBottomSheet';
import { cartScreenStyles } from './cart-styles';
import { removeFromCart, updateQuantity } from '../../redux/reducers/cart';
import { RootState } from '../../redux/reducers';
import RBBottomSheet from '../../components/custom-BottomSheet/custom-BottomSheet';
import CustomButton from '../../components/custom-Button/button';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const { cartItems, totalAmount } = useSelector((state: RootState) => state.cartReducer);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (item: CartItem) => {
    setItemToDelete(item);
    bottomSheetRef.current?.open()
    // setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      // setDeleteModalVisible(false);
      bottomSheetRef.current?.close()
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    // setDeleteModalVisible(false);
    bottomSheetRef.current?.close()
    setItemToDelete(null);
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout' as never);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartItemCard
      item={item}
      onQuantityChange={(newQuantity) => handleUpdateQuantity(item.id, newQuantity)}
      onRemove={() => handleRemoveItem(item)}
    />
  );

  return (
    <SafeAreaView style={cartScreenStyles.container}>
      <StatusBar backgroundColor="#25D366" barStyle="light-content" />

      {/* Header */}
      <View style={cartScreenStyles.header}>
        <TouchableOpacity
          style={cartScreenStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={Icons['fi-rr-angle-left']}
            style={cartScreenStyles.backIcon}
          />
        </TouchableOpacity>
        
        <Text style={cartScreenStyles.headerTitle}>My Cart</Text>

        <TouchableOpacity style={cartScreenStyles.searchButton}>
          <Image
            source={Icons['fi-rr-search']}
            style={cartScreenStyles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <View style={cartScreenStyles.emptyCartContainer}>
          <Image source={Icons['fi-rr-shopping-bag']} style={cartScreenStyles.emptyCartIcon} />
          <Text style={cartScreenStyles.emptyCartText}>Your cart is empty</Text>
          <Text style={cartScreenStyles.emptyCartSubtext}>Add some products to get started</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={cartScreenStyles.cartList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Footer - Total and Checkout */}
      {cartItems.length > 0 && (
        <View style={cartScreenStyles.footer}>
          <View style={cartScreenStyles.totalSection}>
            <Text style={cartScreenStyles.totalLabel}>Total Price</Text>
            <Text style={cartScreenStyles.totalAmount}>
              ₹{totalAmount.toLocaleString('en-IN')}
            </Text>
          </View>
          <CustomButton icons={<Image
            source={Icons['fi-rr-shopping-bag']}
            style={cartScreenStyles.checkoutIcon}
          />
          }
            onPress={handleCheckout} title='Checkout' textStyle={cartScreenStyles.checkoutText} containerStyle={cartScreenStyles.checkoutButton} />
        </View>
      )}
      <RBBottomSheet
        ref={bottomSheetRef}
        child={
          <DeleteConfirmationBottomSheet
            item={itemToDelete}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            visible={true}
          />
        }
        customHeight={moderateScale(480)}
        closeOnDragDown
        withCloseButton={false}
        containerStyle={cartScreenStyles.bottomSheetStyle}
      />
    </SafeAreaView>
  );
};

export default CartScreen; 