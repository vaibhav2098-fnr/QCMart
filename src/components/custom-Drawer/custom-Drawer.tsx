import React, { useRef, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { useDispatch } from 'react-redux';
import { signInDataReset } from '../../redux/reducers/auth-module/sign-in-screen';
import { signUpDataReset } from '../../redux/reducers/auth-module/sign-up-screen';

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
}

const CustomDrawer: React.FC<DrawerProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

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

  const menuItems: MenuItem[] = [
    { id: '1', title: 'My Profile', icon: 'fi-rr-user' },
    { id: '2', title: 'My Order', icon: 'fi-rr-shopping-cart' },
    { id: '3', title: 'My Wishlist', icon: 'fi-rr-heart' },
    { id: '4', title: 'About Us', icon: 'fi-rr-info' },
    { id: '5', title: 'Privacy Policy', icon: 'fi-rr-document' },
    { id: '6', title: 'Help Center', icon: 'fi-rr-headset' },
    { id: '7', title: 'Invite Friends', icon: 'fi-rr-smartphone' },
    { id: '8', title: 'Change Password', icon: 'fi-rr-lock' },
    { id: '9', title: 'notification', icon: 'fi-rr-bell' },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    console.log('Menu item pressed:', item.title);
    if (item.title === 'My Profile') {
      onClose();
      (navigation as any).navigate('profile');
      return;
    }
    if (item.title === 'My Order') {
      onClose();
      (navigation as any).navigate('myOrders');
      return;
    }
    if (item.title === 'About Us') {
      onClose();
      (navigation as any).navigate('webView', {
        url: 'https://quickconnectsoft.in/ecom/public/about-us',
        title: 'About Us'
      });
      return;
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(item)}
    >
      <View style={styles.menuItemContent}>
        {item.icon && (
          <Image
            source={Icons[item.icon as keyof typeof Icons]}
            style={styles.menuIcon}
          />
        )}
        <Text style={styles.menuText}>
          {item.title}
        </Text>
      </View>
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
            <View style={styles.iconStyle}>
              <Image source={Icons['fi-rr-user']} style={styles.userIcon} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Deepak Rathore</Text>
              <Text style={styles.userSubtitle}>deepak.rathore31@gmail.com</Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={Icons['fi-rr-cross']} style={styles.closeIcon} />
          </TouchableOpacity> */}
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              {renderMenuItem(item)}
              {index < menuItems.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <TouchableOpacity style={styles.signInButton} onPress={() => {
            dispatch(signInDataReset())
            dispatch(signUpDataReset())
          }}>
            <Image source={Icons['fi-rr-sign-out']} style={{ height: moderateScale(24), width: moderateScale(24) }} />
            <Text style={styles.signInText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    borderTopRightRadius: moderateScale(32),
    borderBottomEndRadius: moderateScale(32)
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(24),
    backgroundColor: '#041C45',
    borderTopRightRadius: moderateScale(32),
    height: moderateScale(110)
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconStyle: {
    borderColor: 'white',
    borderWidth: 1,
    height: moderateScale(68),
    width: moderateScale(68),
    borderRadius: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(18)
  }
  , userIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    tintColor: '#6B7280',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: moderateScale(2),
  },
  userSubtitle: {
    fontSize: moderateScale(10),
    color: '#6B7280',
    fontWeight: '400',
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
    fontSize: moderateScale(12),
    color: '#374151',
    fontWeight: '400',
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
    borderBottomEndRadius: moderateScale(32),
    paddingBottom: moderateScale(4),
    backgroundColor: '#041C45',
  },
  signInButton: {
    paddingVertical: moderateScale(12),
    borderBottomEndRadius: moderateScale(32),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#D3D3D3',
  },
  signInText: {
    color: '#171717',
    fontSize: moderateScale(14),
    fontWeight: '500',
    paddingHorizontal: moderateScale(16),
  },
});

export default CustomDrawer; 