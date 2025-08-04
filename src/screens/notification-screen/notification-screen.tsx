import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promo' | 'system';
  isRead: boolean;
}

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Order Delivered',
      message: 'Your order #12345 has been successfully delivered to your address.',
      time: '2 hours ago',
      type: 'order',
      isRead: false,
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'Get 20% off on all electronics! Limited time offer.',
      time: '5 hours ago',
      type: 'promo',
      isRead: false,
    },
    {
      id: '3',
      title: 'Order Shipped',
      message: 'Your order #12344 has been shipped and is on its way.',
      time: '1 day ago',
      type: 'order',
      isRead: true,
    },
    {
      id: '4',
      title: 'Welcome to QCMart',
      message: 'Thank you for joining QCMart! Enjoy your shopping experience.',
      time: '2 days ago',
      type: 'system',
      isRead: true,
    },
    {
      id: '5',
      title: 'Flash Sale',
      message: 'Flash sale starting in 30 minutes! Don\'t miss out on amazing deals.',
      time: '3 days ago',
      type: 'promo',
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return Icons['fi-rr-shopping-cart'];
      case 'promo':
        return Icons['fi-rr-gift'];
      case 'system':
        return Icons['fi-rr-info'];
      default:
        return Icons['fi-rr-bell'];
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return '#10B981';
      case 'promo':
        return '#F59E0B';
      case 'system':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) + '20' }]}>
        <Image
          source={getNotificationIcon(item.type)}
          style={[styles.notificationIcon, { tintColor: getNotificationColor(item.type) }]}
        />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>

      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={Icons['fi-rr-angle-left']} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {/* {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )} */}
        <View style={styles.placeholder} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Empty State */}
      {notifications.length === 0 && (
        <View style={styles.emptyContainer}>
          <Image source={Icons['fi-rr-bell']} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No notifications yet</Text>
          <Text style={styles.emptyMessage}>
            We'll notify you when there are updates about your orders or new offers.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:statusBarHeight + moderateScale(16)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: moderateScale(8),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: '#374151',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#111827',
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: moderateScale(10),
    minWidth: moderateScale(20),
    height: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(6),
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  placeholder: {
    width: moderateScale(40),
  },
  listContainer: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(16),
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(12),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(8),
  },
  unreadItem: {
    backgroundColor: '#F8FAFC',
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  notificationIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(4),
  },
  notificationTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#374151',
    flex: 1,
    marginRight: moderateScale(8),
  },
  unreadTitle: {
    fontWeight: '600',
    color: '#111827',
  },
  notificationTime: {
    fontSize: moderateScale(12),
    color: '#9CA3AF',
  },
  notificationMessage: {
    fontSize: moderateScale(13),
    color: '#6B7280',
    lineHeight: moderateScale(18),
  },
  unreadDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#EF4444',
    marginLeft: moderateScale(8),
    marginTop: moderateScale(4),
  },
  separator: {
    height: moderateScale(1),
    backgroundColor: '#F3F4F6',
    marginVertical: moderateScale(8),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(32),
  },
  emptyIcon: {
    width: moderateScale(64),
    height: moderateScale(64),
    tintColor: '#D1D5DB',
    marginBottom: moderateScale(16),
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#374151',
    marginBottom: moderateScale(8),
  },
  emptyMessage: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});

export default NotificationScreen; 