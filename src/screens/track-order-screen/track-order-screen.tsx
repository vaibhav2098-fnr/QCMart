import { getDeviceWidth } from '@/src/utils/helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomHeader from '../../components/custom-header/custom-header';
import { RootState } from '../../redux/reducers';
import { OrderItem } from '../../types/orders';
import { moderateScale } from '../../utils/deviceConfig';
import { styles } from './track-order-styles';

interface RouteParams {
  orderId: number;
}

const TrackOrderScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { orderId } = route.params as RouteParams;
  const { ordersData } = useSelector((state: RootState) => state.myOrdersDataReducer);

  const [currentOrder, setCurrentOrder] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      const order = ordersData.find(order => order.id === orderId);
      if (order) {
        setCurrentOrder(order);
      }
      setLoading(false);
    }
  }, [ordersData, orderId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader
          onBack={() => (navigation as any).goBack()}
          title="Track Order"
          rightIcon={Icons['fi-rr-search']}
        />
        <View style={styles.headerSpacer} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      </View>
    );
  }

  if (!currentOrder) {
    return (
      <View style={styles.container}>
        <CustomHeader
          onBack={() => (navigation as any).goBack()}
          title="Track Order"
          rightIcon={Icons['fi-rr-search']}
        />
        <View style={styles.headerSpacer} />
        <View style={styles.errorContainer}>
          <Image source={Icons['fi-rr-package']} style={styles.errorIcon} />
          <Text style={styles.errorTitle}>Order Not Found</Text>
          <Text style={styles.errorSubtitle}>The requested order could not be found.</Text>
        </View>
      </View>
    );
  }

  const renderProductCard = () => (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        <Image source={Icons['fi-rr-package']} style={{ width: moderateScale(32), height: moderateScale(32), tintColor: '#9CA3AF' }} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>Order #{currentOrder.id}</Text>
        <View style={styles.metaRow}>
          {/* <View style={styles.dot} /> */}
          {/* <Text style={styles.productMeta}>Order placed on {moment(currentOrder.created_at).format("DD MMM YYYY")}</Text> */}
        </View>
      </View>
      <View style={styles.productPriceInfo}>
        <Text style={styles.productPrice}>{currentOrder.amount_formatted}</Text>
        <Text style={styles.productQty}>Status: {currentOrder.status.label}</Text>
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
          <View style={{ flexDirection: 'row', width: getDeviceWidth() * 0.88 }}>
            <View style={{ alignItems: 'flex-start', width: '40%' }}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order ID:-</Text>
                <Text style={styles.infoValue}>#{currentOrder.id}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order Status:-</Text>
                <Text style={styles.infoValue}>{currentOrder.status.label}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment Status:-</Text>
                <Text style={styles.infoValue}>{currentOrder.payment_status.label}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', width: '40%' }}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order Date:-</Text>
                <Text style={styles.infoValue}>{moment(currentOrder.created_at).format("DD MMM YYYY")}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment Method:-</Text>
                <Text style={styles.infoValue}>{currentOrder.payment_method.label}</Text>
              </View>
            </View>
          </View>

          {/* Order Summary */}
          {renderProductCard()}
        </View>

        {/* Customer Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Information</Text>

          <Text style={styles.customerName}>{currentOrder.customer.name}</Text>

          <View style={styles.phoneContainer}>
            <Image source={Icons['fi-rr-phone-call']} style={styles.phoneIcon} />
            <Text style={styles.phoneText}>{currentOrder.customer.phone}</Text>
          </View>

          <View style={styles.emailContainer}>
            <Image source={Icons['fi-rr-at']} style={styles.emailIcon} />
            <Text style={styles.emailText}>{currentOrder.customer.email}</Text>
          </View>
        </View>

        {/* Order Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{currentOrder.amount_formatted}</Text>
          </View>

          {currentOrder.tax_amount !== '0.00' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.taxValue}>+ {currentOrder.tax_amount_formatted}</Text>
            </View>
          )}

          {currentOrder.shipping_amount !== '0.00' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>+ {currentOrder.shipping_amount_formatted}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{currentOrder.amount_formatted}</Text>
          </View>
        </View>

        {/* Shipping Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shipping Information</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Method</Text>
            <Text style={styles.summaryValue}>{currentOrder.shipping_method.label}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Status</Text>
            <Text style={styles.summaryValue}>{currentOrder.shipping_status.label}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackOrderScreen;
