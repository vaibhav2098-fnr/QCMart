import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Easing,
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
import CustomInput from '../../components/custom-Input/input-field';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const inputAnim = useRef(new Animated.Value(0)).current;

  const { cartItems, totalAmount } = useSelector((state: RootState) => state.cartReducer);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState('');

  const handleToggleSearch = () => {
    const toValue = searchVisible ? 0 : 1;
    setSearchVisible(!searchVisible);
    Animated.timing(inputAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (item) => {
    setItemToDelete(item);
    bottomSheetRef.current?.open();
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      bottomSheetRef.current?.close();
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    bottomSheetRef.current?.close();
    setItemToDelete(null);
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const filteredCartItems = cartItems.filter(item =>
    item.name?.toLowerCase().includes(search.trim().toLowerCase())
  );

  const renderCartItem = ({ item }) => (
    <CartItemCard
      item={item}
      onQuantityChange={(newQty) => handleUpdateQuantity(item.id, newQty)}
      onRemove={() => handleRemoveItem(item)}
    />
  );

  const inputHeight = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, moderateScale(60)],
  });

  const inputOpacity = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={cartScreenStyles.container}>
      <StatusBar backgroundColor="#25D366" barStyle="light-content" />

      {/* Header */}
      <View style={cartScreenStyles.header}>
        <TouchableOpacity
          style={cartScreenStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={Icons['fi-rr-angle-left']} style={cartScreenStyles.backIcon} />
        </TouchableOpacity>

        <Text style={cartScreenStyles.headerTitle}>My Cart</Text>

        <TouchableOpacity style={cartScreenStyles.searchButton} onPress={handleToggleSearch}>
          <Image source={Icons[searchVisible ? 'fi-rr-cross' : 'fi-rr-search']}
            style={cartScreenStyles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* 🔍 Animated Search Input */}
      <Animated.View style={{ height: inputHeight, opacity: inputOpacity, overflow: 'hidden', marginHorizontal: moderateScale(16) }}>
        <CustomInput
          customPlaceholder="Search in cart..."
          value={search}
          secureTextEntry={false}
          onChangeText={(txt) => setSearch(txt)}
          leftIcon={<></>}
          rightIcon={<></>}
        />
      </Animated.View>

      {/* Cart Items */}
      {filteredCartItems.length === 0 ? (
        <View style={cartScreenStyles.emptyCartContainer}>
          <Image source={Icons['fi-rr-shopping-bag']} style={cartScreenStyles.emptyCartIcon} />
          <Text style={cartScreenStyles.emptyCartText}>Your cart is empty</Text>
          <Text style={cartScreenStyles.emptyCartSubtext}>Add some products to get started</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={cartScreenStyles.cartList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Footer */}
      {cartItems.length > 0 && (
        <View style={cartScreenStyles.footer}>
          <View style={cartScreenStyles.totalSection}>
            <Text style={cartScreenStyles.totalLabel}>Total Price</Text>
            <Text style={cartScreenStyles.totalAmount}>
              ₹{totalAmount.toLocaleString('en-IN')}
            </Text>
          </View>
          <CustomButton
            icons={
              <Image source={Icons['fi-rr-shopping-bag']} style={cartScreenStyles.checkoutIcon} />
            }
            onPress={handleCheckout}
            title="Checkout"
            textStyle={cartScreenStyles.checkoutText}
            containerStyle={cartScreenStyles.checkoutButton}
          />
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
