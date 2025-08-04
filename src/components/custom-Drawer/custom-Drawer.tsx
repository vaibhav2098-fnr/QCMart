import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { CustomAccordion } from '../custom-Accordion';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.8;

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  hasSubmenu?: boolean;
  isSelected?: boolean;
}

const CustomDrawer: React.FC<DrawerProps> = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isVisible]);

  const pagesItems = [
    { id: '1', title: 'About Us', onPress: () => console.log('About Us pressed') },
    { id: '2', title: 'Terms Of Use', onPress: () => console.log('Terms Of Use pressed') },
    { id: '3', title: 'Terms & Conditions', onPress: () => console.log('Terms & Conditions pressed') },
    { id: '4', title: 'Refund Policy', onPress: () => console.log('Refund Policy pressed') },
    { id: '5', title: 'Coming Soon', onPress: () => console.log('Coming Soon pressed') },
  ];

  const productsItems = [
    { id: '1', title: 'All Products', onPress: () => console.log('All Products pressed') },
    { id: '2', title: 'Products of Category', onPress: () => console.log('Products of Category pressed') },
    { id: '3', title: 'Product Single', onPress: () => console.log('Product Single pressed') },
  ];

  const currencyItems = [
    { id: '1', title: 'USD', onPress: () => console.log('USD pressed') },
    { id: '2', title: 'EUR', onPress: () => console.log('EUR pressed') },
    { id: '3', title: 'GBP', onPress: () => console.log('GBP pressed') },
  ];

  const menuItems: MenuItem[] = [
    { id: '1', title: 'Home', icon: 'fi-rr-home' },
    { id: '2', title: 'Pages', hasSubmenu: true },
    { id: '3', title: 'Products', hasSubmenu: true },
    { id: '4', title: 'Stores', icon: 'fi-rr-building' },
    { id: '5', title: 'Blog', icon: 'fi-rr-book' },
    { id: '6', title: 'FAQs', icon: 'fi-rr-comment-alt' },
    { id: '7', title: 'Contact', icon: 'fi-rr-smartphone' },
    { id: '8', title: 'Track your order', icon: 'fi-rr-checkbox', isSelected: true },
    { id: '9', title: 'Compare', icon: 'fi-rr-chart-histogram' },
    { id: '10', title: 'Wishlist', icon: 'fi-rr-heart' },
    { id: '11', title: 'INR', hasSubmenu: true },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    console.log('Menu item pressed:', item.title);
    // Handle menu item navigation here
    if (item.hasSubmenu) {
      // Toggle accordion for submenu items
      if (item.title === 'Pages') {
        setExpandedAccordion(expandedAccordion === 'pages' ? null : 'pages');
      } else if (item.title === 'Products') {
        setExpandedAccordion(expandedAccordion === 'products' ? null : 'products');
      } else if (item.title === 'INR') {
        setExpandedAccordion(expandedAccordion === 'currency' ? null : 'currency');
      }
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, item.isSelected && styles.selectedMenuItem]}
      onPress={() => handleMenuItemPress(item)}
    >
      <View style={styles.menuItemContent}>
        {item.icon && (
          <Image
            source={Icons[item.icon as keyof typeof Icons]}
            style={[styles.menuIcon, item.isSelected && styles.selectedMenuIcon]}
          />
        )}
        <Text style={[styles.menuText, item.isSelected && styles.selectedMenuText]}>
          {item.title}
        </Text>
      </View>
      {item.hasSubmenu && (
        <Image source={Icons['fi-rr-angle-small-right']} style={styles.submenuIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      {/* Overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayAnim,
          },
        ]}
        pointerEvents={isVisible ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.headerContent}>
            <Image source={Icons['fi-rr-user']} style={styles.userIcon} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Welcome Guest</Text>
              <Text style={styles.userSubtitle}>Role: Customer</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={Icons['fi-rr-cross']} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              {item.hasSubmenu ? (
                <CustomAccordion
                  title={item.title}
                  items={
                    item.title === 'Pages' ? pagesItems :
                    item.title === 'Products' ? productsItems :
                    item.title === 'INR' ? currencyItems : []
                  }
                  isExpanded={expandedAccordion === 
                    (item.title === 'Pages' ? 'pages' :
                     item.title === 'Products' ? 'products' :
                     item.title === 'INR' ? 'currency' : '')
                  }
                  onToggle={() => handleMenuItemPress(item)}
                />
              ) : (
                renderMenuItem(item)
              )}
              {index < menuItems.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        {/* <View style={styles.drawerFooter}>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View> */}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(24),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#F8FAFC',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    tintColor: '#6B7280',
    marginRight: moderateScale(12),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111827',
    marginBottom: moderateScale(2),
  },
  userSubtitle: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  closeButton: {
    padding: moderateScale(8),
  },
  closeIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#6B7280',
  },
  menuContainer: {
    flex: 1,
    paddingTop: moderateScale(16),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
  },
  selectedMenuItem: {
    backgroundColor: '#F0F9FF',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#6B7280',
    marginRight: moderateScale(12),
  },
  selectedMenuIcon: {
    tintColor: '#3B82F6',
  },
  menuText: {
    fontSize: moderateScale(14),
    color: '#374151',
    fontWeight: '500',
  },
  selectedMenuText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  submenuIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#9CA3AF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: moderateScale(20),
  },
  drawerFooter: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(24),
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  signInButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});

export default CustomDrawer; 