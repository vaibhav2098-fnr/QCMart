import CustomInput from '@/src/components/custom-Input/input-field';
import { moderateScale } from '@/src/utils/deviceConfig';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomButton from '../../components/custom-Button/button';
import CustomTabs, { TabOption } from '../../components/custom-Tabs';
import CustomHeader from '../../components/custom-header/custom-header';
import { RootState } from '../../redux/reducers';
import { loadMoreOrdersRequest, myOrdersDataRequest, resetOrdersData } from '../../redux/reducers/my-orders';
import { OrderItem } from '../../types/orders';
import { styles } from './my-orders-styles';

type OrderStatus = 'ongoing' | 'completed';

const tabOptions: TabOption[] = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
];

const MyOrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<OrderStatus>('ongoing');
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [searchVisible, setSearchVisible] = useState(false); // 👈 toggle state
  const searchAnim = useRef(new Animated.Value(0)).current;

  const { ordersData, loading, pagination, hasMoreData } = useSelector((state: RootState) => state.myOrdersDataReducer);
  const { token } = useSelector((state: RootState) => state?.signInDataReducer);

  // 📦 Animate search bar
  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: searchVisible ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [searchVisible]);

  const data = useMemo(() => {
    if (activeTab === 'ongoing') {
      return ordersData?.filter(order =>
        order?.status?.value === 'pending' ||
        order?.status?.value === 'processing' ||
        order?.status?.value === 'shipped'
      );
    } else {
      return ordersData?.filter(order =>
        order?.status?.value === 'completed' ||
        order?.status?.value === 'delivered' ||
        order?.status?.value === 'cancelled'
      );
    }
  }, [ordersData, activeTab]);

  // 🔍 Filtered categories (case-insensitive match)
  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return data;
    return data.filter((item) =>
      item.shipping_status?.label?.toLowerCase().includes(keyword) || item.amount?.toLowerCase().includes(keyword)
    );
  }, [search, ordersData]);

  useEffect(() => {
    if (token) {
      dispatch(myOrdersDataRequest({ token, page: 1 }));
    }
    return () => {
      dispatch(resetOrdersData());
    };
  }, [dispatch, token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (token) {
      dispatch(myOrdersDataRequest({ token, page: 1 }));
    }
    setRefreshing(false);
  }, [dispatch, token]);

  const loadMoreData = useCallback(() => {
    if (hasMoreData && !loading && token) {
      const nextPage = pagination.currentPage + 1;
      dispatch(loadMoreOrdersRequest({ token, page: nextPage }));
    }
  }, [hasMoreData, loading, pagination.currentPage, dispatch, token]);

  const renderOrder = ({ item }: { item: OrderItem }) => {
    const orderDate = moment(item.created_at).format("DD MMM YYYY HH:mm:ss")
    return (
      <View style={styles.card}>
        <View style={styles.productThumbWrapper}>
          <Image source={Icons['fi-rr-picture']} style={styles.productThumb} />
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          {/* <Text style={styles.customerName}>{item.customer.name}</Text> */}
          <View style={styles.metaRow}>
            {/* <View style={styles.dot} /> */}
            <Text style={styles.metaText}>{orderDate}</Text>
          </View>
          <Text style={styles.price}>{item.amount_formatted} <Text style={styles.shippingText}>({item.payment_method?.label})</Text></Text>
          <View style={styles.rightCol}>
            <View style={[styles.statusPill, {
              backgroundColor: item.status.value === 'pending' ? '#FFF3CD' :
                item.status.value === 'completed' ? '#D1E7DD' : '#F8D7DA'
            }]}>
              <Text style={[styles.statusText, {
                color: item.status.value === 'pending' ? '#856404' :
                  item.status.value === 'completed' ? '#0F5132' : '#721C24'
              }]}>{item.status.label}</Text>
            </View>
            <CustomButton
              title={activeTab === 'ongoing' ? 'Track Order' : 'View Details'}
              onPress={() => {
                (navigation as any).navigate('trackOrder', { orderId: item.id });
              }}
              containerStyle={styles.trackButton}
              textStyle={styles.trackButtonText}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        onBack={() => (navigation as any).goBack()}
        title="My Orders"
        isShowSearch={true}
        onSearch={() => {
          if (searchVisible) setSearch(''); // optional: clear input
          setSearchVisible(!searchVisible);
        }}
        rightIcon={Icons[searchVisible ? 'fi-rr-cross' : 'fi-rr-search']}
      />
      {/* 🔍 Animated Search Input */}
      <Animated.View
        style={{
          height: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, moderateScale(60)],
          }),
          overflow: 'hidden',
          marginBottom: moderateScale(8),
        }}
      >
        <CustomInput
          customPlaceholder="Search..."
          value={search}
          secureTextEntry={false}
          onChangeText={(txt) => setSearch(txt)}
          leftIcon={<></>}
          rightIcon={<></>}
        />
      </Animated.View>

      <CustomTabs
        options={tabOptions}
        activeTab={activeTab}
        onTabChange={(tabKey: string) => setActiveTab(tabKey as OrderStatus)}
      />

      {loading && ordersData.length === 0 && (
        <View style={styles.initialLoading}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      )}

      <FlatList
        data={data || filteredCategories}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          loading && hasMoreData ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingText}>Loading more orders...</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={() =>
          !loading ? (
            <View style={styles.emptyContainer}>
              <Image source={Icons['fi-rr-package']} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptySubtitle}>
                {activeTab === 'ongoing'
                  ? 'You don\'t have any ongoing orders'
                  : 'You don\'t have any completed orders'
                }
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default MyOrdersScreen;



