import React from 'react';
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
import { useSelector } from 'react-redux';
import { checkoutScreenStyles } from './checkout-styles';
import { RootState } from '../../redux/reducers';
import CustomButton from '../../components/custom-Button/button';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cartItems, totalAmount } = useSelector((state: RootState) => state.cartReducer);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditAddress = () => {
    // TODO: Navigate to address selection/editing screen
    console.log('Edit address pressed');
  };

  const handleCheckout = () => {
    // TODO: Implement payment/order confirmation
    console.log('Proceeding to payment...');
  };

  const renderOrderItem = ({ item }: { item: CartItem }) => (
    <View style={checkoutScreenStyles.orderItemCard}>
      <View style={checkoutScreenStyles.productImageContainer}>
        <Image source={{ uri: item.image }} style={checkoutScreenStyles.productImage} />
      </View>

      <View style={checkoutScreenStyles.productDetails}>
        <Text style={checkoutScreenStyles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={checkoutScreenStyles.productPrice}>
          ₹{item.price.toLocaleString('en-IN')}
        </Text>
      </View>

      <View style={checkoutScreenStyles.quantityBadge}>
        <Text style={checkoutScreenStyles.quantityText}>{item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={checkoutScreenStyles.container}>
      <StatusBar backgroundColor="#25D366" barStyle="light-content" />

      {/* Header */}
      <View style={checkoutScreenStyles.header}>
        <TouchableOpacity
          style={checkoutScreenStyles.backButton}
          onPress={handleBackPress}
        >
          <Image
            source={Icons['fi-rr-angle-left']}
            style={checkoutScreenStyles.backIcon}
          />
        </TouchableOpacity>

        <Text style={checkoutScreenStyles.headerTitle}>Checkout</Text>

        <View style={checkoutScreenStyles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={checkoutScreenStyles.content}>
        {/* Shipping Address Section */}
        <View style={checkoutScreenStyles.section}>
          <Text style={checkoutScreenStyles.sectionTitle}>Shipping Address</Text>

          <View style={checkoutScreenStyles.addressCard}>
            <View style={checkoutScreenStyles.addressIconContainer}>
              <View style={checkoutScreenStyles.addressIconSubContainer}>
                <Image
                  source={Icons['fi-rr-location-alt']}
                  style={checkoutScreenStyles.addressIcon}
                />
              </View>
            </View>

            <View style={checkoutScreenStyles.addressDetails}>
              <Text style={checkoutScreenStyles.addressLabel}>Home</Text>
              <Text style={checkoutScreenStyles.addressText}>
                61480 Sunbrook park, PC 5679
              </Text>
            </View>

            <TouchableOpacity
              style={checkoutScreenStyles.editButton}
              onPress={handleEditAddress}
            >
              <Image
                source={Icons['fi-rr-edit']}
                style={checkoutScreenStyles.editIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={checkoutScreenStyles.dividerLine} />

        {/* Order List Section */}
        <View style={checkoutScreenStyles.section}>
          <Text style={checkoutScreenStyles.sectionTitle}>Order List</Text>

          <FlatList
            data={cartItems}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={checkoutScreenStyles.orderList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Footer - Total and Checkout */}
      <View style={checkoutScreenStyles.footer}>
        <View style={checkoutScreenStyles.totalSection}>
          <Text style={checkoutScreenStyles.totalLabel}>Total Price</Text>
          <Text style={checkoutScreenStyles.totalAmount}>
            ₹{totalAmount.toLocaleString('en-IN')}
          </Text>
        </View>

        <CustomButton
          title="Checkout"
          onPress={handleCheckout}
          containerStyle={checkoutScreenStyles.checkoutButton}
          textStyle={checkoutScreenStyles.checkoutText}
          icons={
            <Image
              source={Icons['fi-rr-shopping-bag']}
              style={checkoutScreenStyles.checkoutIcon}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen; 