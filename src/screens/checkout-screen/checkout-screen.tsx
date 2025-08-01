import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { checkoutScreenStyles } from './checkout-styles';
import { RootState } from '../../redux/reducers';
import CustomButton from '../../components/custom-Button/button';
import { isObject } from 'formik';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShippingAddress {
  id: number;
  type: string;
  address: string;
  isSelected: boolean;
}

interface ShippingOption {
  id: string;
  name: string;
  estimatedArrival: string;
  cost: number;
  isSelected: boolean;
}

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems, totalAmount } = useSelector((state: RootState) => state.cartReducer);
  const { selectedShippingAddress, selectedShippingOption } = useSelector((state: RootState) => state.commonReducer);

  // Get selected address from route params or use Redux state
  const selectedAddress = (route.params as any)?.selectedAddress || selectedShippingAddress;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditAddress = () => {
    navigation.navigate('ShippingAddress' as never);
  };

  const handleChooseShipping = () => {
    navigation.navigate('ChooseShipping' as never);
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

      <ScrollView style={{ flexGrow: 1 }}>
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
                <Text style={checkoutScreenStyles.addressLabel}>{selectedAddress.type}</Text>
                <Text style={checkoutScreenStyles.addressText}>
                  {selectedAddress.address}
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
              scrollEnabled={false}
            />
          </View>
          {/* Shipping Section */}
          <View style={checkoutScreenStyles.section}>
            <Text style={checkoutScreenStyles.sectionTitle}>Choose Shipping</Text>

            <TouchableOpacity
              style={checkoutScreenStyles.shippingCard}
              onPress={handleChooseShipping}
            >
              {isObject(selectedShippingOption) ?
                <>
                  <View style={[checkoutScreenStyles.shippingIconContainer, { backgroundColor: '#041C45' }]}>
                    <Image
                      source={Icons['fi-rr-location-alt']}
                      style={checkoutScreenStyles.shippingIcon}
                      tintColor={'#fff'}
                    />
                  </View>

                  <View style={checkoutScreenStyles.shippingDetails}>
                    <Text style={checkoutScreenStyles.shippingSelectedLabel}>{selectedShippingOption?.name}</Text>
                    <Text style={checkoutScreenStyles.shippingSelectedLabel}>Estimated: {selectedShippingOption?.estimatedArrival}</Text>
                  </View>
                  <Text style={[checkoutScreenStyles.shippingSelectedLabel, checkoutScreenStyles.marginLeft]}>{selectedShippingOption?.cost}</Text>
                  <Image
                    source={Icons['fi-rr-edit']}
                    style={checkoutScreenStyles.arrowIcon}
                  />
                </>
                :
                <>
                  <View style={checkoutScreenStyles.shippingIconContainer}>
                    <Image
                      source={Icons['fi-rr-truck-side']}
                      style={checkoutScreenStyles.shippingIcon}
                    />
                  </View>

                  <View style={checkoutScreenStyles.shippingDetails}>
                    <Text style={checkoutScreenStyles.shippingLabel}>Choose Shipping Type</Text>
                  </View>

                  <Image
                    source={Icons['fi-rr-angle-right']}
                    style={checkoutScreenStyles.arrowIcon}
                  />
                </>
              }
            </TouchableOpacity>
          </View>

          <View style={checkoutScreenStyles.dividerLine} />
        </View>


      </ScrollView>
      {/* Footer - Total and Checkout */}
      <View style={checkoutScreenStyles.footer}>
        <View style={checkoutScreenStyles.totalSection}>
          <Text style={checkoutScreenStyles.totalLabel}>Total Price</Text>
          <Text style={checkoutScreenStyles.totalAmount}>
            ₹{(totalAmount).toLocaleString('en-IN')}
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