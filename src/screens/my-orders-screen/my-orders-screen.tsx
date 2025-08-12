import React, { useMemo, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import CustomHeader from '../../components/custom-header/custom-header';
import CustomButton from '../../components/custom-Button/button';
import CustomTabs, { TabOption } from '../../components/custom-Tabs';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { styles } from './my-orders-styles';
import { useNavigation } from '@react-navigation/native';

type OrderStatus = 'ongoing' | 'completed';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  status: OrderStatus;
  image?: any;
}

const mockOrders: OrderItem[] = [
  {
    id: '1',
    title: 'Acer Aspire Lite,13th Gen, Intel Core i3-1305U',
    price: 33700,
    qty: 1,
    status: 'ongoing',
  },
  {
    id: '2',
    title: 'Xiaomi Mi Smart Router 4C, 300 Mbps',
    price: 879,
    qty: 1,
    status: 'ongoing',
  },
  {
    id: '3',
    title: 'Acer Aspire Lite,13th Gen, Intel Core i3-1305U',
    price: 33700,
    qty: 1,
    status: 'completed',
  },
];

const tabOptions: TabOption[] = [
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
];

const MyOrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<OrderStatus>('ongoing');

  const data = useMemo(() => mockOrders.filter(o => o.status === activeTab), [activeTab]);

  const renderOrder = ({ item }: { item: OrderItem }) => {
    return (
      <View style={styles.card}>
        <View style={styles.productThumbWrapper}>
          <Image source={Icons['fi-rr-picture']} style={styles.productThumb} />
        </View>
        <View style={styles.infoBlock}>
          <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.dot} />
            <Text style={styles.metaText}>Color  |  Qty = {item.qty}</Text>
          </View>
          <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
          <View style={styles.rightCol}>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{activeTab === 'ongoing' ? 'In Delivery' : 'Delivered'}</Text>
            </View>
            <CustomButton
              title={activeTab === 'ongoing' ? 'Track Order' : 'Leave Review'}
              onPress={() => {
                if (activeTab === 'ongoing') {
                  (navigation as any).navigate('trackOrder');
                }
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
        rightIcon={Icons['fi-rr-search']}
      />

      <CustomTabs
        options={tabOptions}
        activeTab={activeTab}
        onTabChange={(tabKey: string) => setActiveTab(tabKey as OrderStatus)}
      />

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyOrdersScreen;



