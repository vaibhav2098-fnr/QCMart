import { RootState } from '@/src/redux/reducers';
import { getDeviceHeight } from '@/src/utils/helper';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { signInDataReset } from '../../redux/reducers/auth-module/sign-in-screen';
import { signUpDataReset } from '../../redux/reducers/auth-module/sign-up-screen';
import { moderateScale } from '../../utils/deviceConfig';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.85;

interface MenuItem {
  id: string;
  title: string;
  icon?: string;
}

const DrawerScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state: RootState) => state.profileDataReducer);
  const { profile } = profileData

  const menuItems: MenuItem[] = [
    { id: '1', title: 'My Profile', icon: 'fi-rr-user' },
    { id: '2', title: 'My Order', icon: 'fi-rr-shopping-cart' },
    { id: '3', title: 'My Wishlist', icon: 'fi-rr-heart' },
    { id: '4', title: 'About Us', icon: 'fi-rr-info' },
    { id: '5', title: 'Privacy Policy', icon: 'fi-rr-document' },
    { id: '6', title: 'Help Center', icon: 'fi-rr-headset' },
    { id: '7', title: 'Invite Friends', icon: 'fi-rr-smartphone' },
    { id: '8', title: 'Change Password', icon: 'fi-rr-lock' },
    { id: '9', title: 'Notification', icon: 'fi-rr-bell' },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    navigation.goBack()
    if (item.title === 'My Profile') {
      (navigation as any).navigate('profile');
      return;
    }
    if (item.title === 'My Order') {
      (navigation as any).navigate('myOrders');
      return;
    }
    if (item.title === 'Change Password') {
      (navigation as any).navigate('changePassword');
      return;
    }
    if (item.title === 'About Us') {
      (navigation as any).navigate('webView', {
        url: 'https://quickconnectsoft.in/ecom/public/about-us',
        title: 'About Us',
      });
      return;
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.headerContent}>
            <View style={styles.iconStyle}>
              <Image source={Icons['fi-rr-user']} style={styles.userIcon} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{profile?.name}</Text>
              <Text style={styles.userSubtitle}>{profile?.email}</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
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
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              dispatch(signInDataReset());
              dispatch(signUpDataReset());
            }}
          >
            <Image
              source={Icons['fi-rr-sign-out']}
              style={{ height: moderateScale(24), width: moderateScale(24) }}
            />
            <Text style={styles.signInText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pressable style={styles.pressableOverlay} onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  pressableOverlay: {
    height: '100%',
    width: moderateScale(200),
    backgroundColor: 'rgba(0,0,0,0.6)',
    right: moderateScale(90),
    zIndex:0
  },

  container: {
    width: DRAWER_WIDTH,
    height: getDeviceHeight() * 1,
    backgroundColor: '#fff',
    borderTopRightRadius: moderateScale(32),
    borderBottomRightRadius: moderateScale(32), 
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    zIndex:1
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(24),
    backgroundColor: '#041C45',
    borderTopRightRadius: moderateScale(32),
    height: moderateScale(110),
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconStyle: {
    borderColor: 'white',
    borderWidth: 1,
    height: moderateScale(68),
    width: moderateScale(68),
    borderRadius: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(18),
  },
  userIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    tintColor: '#6B7280',
  },
  userInfo: { flex: 1 },
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
  menuContainer: { flex: 1, paddingTop: moderateScale(16) },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
  },
  menuItemContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  menuIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#6B7280',
    marginRight: moderateScale(12),
  },
  menuText: { fontSize: moderateScale(12), color: '#374151', fontWeight: '400' },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: moderateScale(20),
  },
  drawerFooter: {
    borderBottomEndRadius: moderateScale(32),
    backgroundColor: '#041C45',
    paddingBottom: moderateScale(6),
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    backgroundColor: '#D3D3D3',
    borderBottomEndRadius: moderateScale(32),
  },
  signInText: {
    color: '#171717',
    fontSize: moderateScale(14),
    fontWeight: '500',
    paddingHorizontal: moderateScale(16),
  },
});

export default DrawerScreen;
