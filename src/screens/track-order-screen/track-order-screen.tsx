import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import CustomHeader from '../../components/custom-header/custom-header';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { styles } from './track-order-styles';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../utils/deviceConfig';

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  qty: number;
  color: string;
}

interface TrackOrderData {
  orderId: string;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  customerName: string;
  address: string;
  phone: string;
  products: OrderProduct[];
  amount: number;
  discount: number;
  delivery: number;
  tax: number;
  total: number;
}

const mockTrackOrderData: TrackOrderData = {
  orderId: '3354654654526',
  orderDate: 'AUG 6, 2025',
  orderStatus: 'Pending',
  paymentMethod: 'COD',
  paymentStatus: 'Pending',
  customerName: 'Deepak Rathore',
  address: '578/11, LINK ROAD, Taraori, Haryana 132116 (India)',
  phone: '9893981505',
  products: [
    {
      id: '1',
      name: 'Acer Aspire Lite,13th Gen, Intel Core i3-1305U',
      price: 2999.60,
      qty: 1,
      color: 'Silver',
    },
    {
      id: '2',
      name: 'Acer Aspire Lite,13th Gen, Intel Core i3-1305U',
      price: 2999.60,
      qty: 1,
      color: 'Silver',
    },
  ],
  amount: 6200.60,
  discount: 1109.40,
  delivery: 0.00,
  tax: 221.88,
  total: 6999.60,
};

const TrackOrderScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderProductCard = (product: OrderProduct) => (
    <View key={product.id} style={styles.productCard}>
      <View style={styles.productImage}>
        <Image source={Icons['fi-rr-laptop']} style={{ width: moderateScale(32), height: moderateScale(32), tintColor: '#9CA3AF' }} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <View style={styles.metaRow}>
        <View style={styles.dot} />
        <Text style={styles.productMeta}>Color | Qty = {product.qty}</Text>
        </View>
      </View>
      <View style={styles.productPriceInfo}>
        <Text style={styles.productPrice}>Rs. {product.price.toLocaleString('en-IN')}</Text>
        <Text style={styles.productQty}>Qty: {product.qty}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        onBack={() => (navigation as any).goBack()}
        title="Track Order"
        // isShowSearch={true}
        rightIcon={Icons['fi-rr-search']}
      />
      <View style={styles.headerSpacer} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Details Card */}
        <View style={styles.card}>
          {/* <Text style={styles.cardTitle}>Order Details</Text> */}
          <View style={{flexDirection:'row',width:'90%'}}>
            <View style={{alignItems:'flex-start'}}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order ID:-</Text>
                <Text style={styles.infoValue}>{mockTrackOrderData.orderId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order Status:-</Text>
                <Text style={styles.infoValue}>{mockTrackOrderData.orderStatus}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment Status:-</Text>
                <Text style={styles.infoValue}>{mockTrackOrderData.paymentStatus}</Text>
              </View>
            </View>
            <View style={{alignItems:'flex-end'}}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order Date:-</Text>
                <Text style={styles.infoValue}>{mockTrackOrderData.orderDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment Method:-</Text>
                <Text style={styles.infoValue}>{mockTrackOrderData.paymentMethod}</Text>
              </View>
            </View>
          </View>

          {/* Products */}
          {mockTrackOrderData.products.map(renderProductCard)}
        </View>

        {/* Customer Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Information</Text>

          <Text style={styles.customerName}>{mockTrackOrderData.customerName}</Text>

          <View style={styles.addressContainer}>
            <Image source={Icons['fi-rr-map-marker']} style={styles.addressIcon} />
            <Text style={styles.addressText}>{mockTrackOrderData.address}</Text>
          </View>

          <View style={styles.phoneContainer}>
            <Image source={Icons['fi-rr-phone-call']} style={styles.phoneIcon} />
            <Text style={styles.phoneText}>{mockTrackOrderData.phone}</Text>
          </View>
        </View>

        {/* Order Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>Rs. {mockTrackOrderData.amount.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount (20%)</Text>
            <Text style={styles.discountValue}>- {mockTrackOrderData.discount.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>{mockTrackOrderData.delivery.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.taxValue}>+ {mockTrackOrderData.tax.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs. {mockTrackOrderData.total.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackOrderScreen;
