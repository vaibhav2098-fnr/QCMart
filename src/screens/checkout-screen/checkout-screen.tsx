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
import { IMG } from '../../assets/qcImages/qxImages';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems, totalAmount } = useSelector((state: RootState) => state.cartReducer);
  const { selectedShippingAddress, selectedShippingOption, selectedPromo } = useSelector((state: RootState) => state.commonReducer);

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

  const handlePromoCode = () => {
    navigation.navigate('AddPromo' as never);
  };

  const handlePayment = () => {
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
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
          <View style={checkoutScreenStyles.dividerLine} />

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

          {/* Promo Code Section */}
          <View style={checkoutScreenStyles.section}>
            <Text style={checkoutScreenStyles.sectionTitle}>Promo Code</Text>

            <TouchableOpacity
              style={checkoutScreenStyles.promoCard}
              onPress={handlePromoCode}
            >
              {selectedPromo ? (
                <>
                  <View style={checkoutScreenStyles.promoIconContainer}>
                    <Image
                      source={IMG['QC-mart-promo-card']}
                      style={checkoutScreenStyles.promoIcon}
                    />
                  </View>

                  <View style={checkoutScreenStyles.promoDetails}>
                    <Text style={checkoutScreenStyles.promoSelectedLabel}>{selectedPromo?.title}</Text>
                    <Text style={checkoutScreenStyles.promoSelectedDescription}>{selectedPromo?.description}</Text>
                  </View>
                  <Text style={checkoutScreenStyles.promoDiscountText}>{selectedPromo?.discount}% OFF</Text>
                  <Image
                    source={Icons['fi-rr-edit']}
                    style={checkoutScreenStyles.arrowIcon}
                  />
                </>
              ) : (
                <>
                  <View style={checkoutScreenStyles.promoIconContainer}>
                    <Image
                      source={Icons['fi-rr-ticket']}
                      style={checkoutScreenStyles.promoIcon}
                    />
                  </View>

                  <View style={checkoutScreenStyles.promoDetails}>
                    <Text style={checkoutScreenStyles.promoLabel}>Add Promo Code</Text>
                  </View>

                  <Image
                    source={Icons['fi-rr-plus']}
                    style={checkoutScreenStyles.arrowIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={checkoutScreenStyles.dividerLine} />

          {/* Price Breakdown Section */}
          <View style={checkoutScreenStyles.section}>
            <Text style={checkoutScreenStyles.sectionTitle}>Price Breakdown</Text>

            <View style={checkoutScreenStyles.priceBreakdownCard}>
              <View style={checkoutScreenStyles.priceRow}>
                <Text style={checkoutScreenStyles.priceLabel}>Amount</Text>
                <Text style={checkoutScreenStyles.priceValue}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </Text>
              </View>

              <View style={checkoutScreenStyles.priceRow}>
                <Text style={checkoutScreenStyles.priceLabel}>Shipping</Text>
                <Text style={checkoutScreenStyles.priceValue}>
                  ₹{selectedShippingOption?.cost || 0}
                </Text>
              </View>

              {selectedPromo && (
                <View style={checkoutScreenStyles.priceRow}>
                  <Text style={checkoutScreenStyles.priceLabel}>Promo</Text>
                  <Text style={checkoutScreenStyles.promoDiscountValue}>
                    -₹{((totalAmount + (selectedShippingOption?.cost || 0)) * (selectedPromo.discount / 100)).toFixed(2)}
                  </Text>
                </View>
              )}

              <View style={checkoutScreenStyles.dividerLine} />

              <View style={checkoutScreenStyles.priceRow}>
                <Text style={checkoutScreenStyles.totalLabel}>Total</Text>
                <Text style={checkoutScreenStyles.totalValue}>
                  ₹{(() => {
                    const subtotal = totalAmount + (selectedShippingOption?.cost || 0);
                    const discount = selectedPromo ? (subtotal * (selectedPromo?.discount / 100)) : 0;
                    return (subtotal - discount).toFixed(2);
                  })().toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>
        </View>


      </ScrollView>
      {/* Footer - Total and Checkout */}
      <View style={checkoutScreenStyles.footer}>
        <CustomButton
          title="Continue To Payment"
          onPress={handlePayment}
          containerStyle={checkoutScreenStyles.checkoutButton}
          textStyle={checkoutScreenStyles.checkoutText}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen; 