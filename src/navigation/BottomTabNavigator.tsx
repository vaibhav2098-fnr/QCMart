import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, CartScreen, CategoryScreen } from '../screens';
import { Icons } from '../assets/qcIcons/qcIcons';
import { moderateScale } from '../utils/deviceConfig';
import ComingSoonScreen from '../screens/comingsoon-screen/comingsoon-screen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

interface TabBarButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityState: { selected: boolean };
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ children, onPress, accessibilityState }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (accessibilityState.selected) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [accessibilityState.selected]);

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.tabContent,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Custom Icon Components
const HomeIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <Image source={Icons['fi-rr-home']}
    resizeMode='contain'
    style={{ height: moderateScale(24), width: moderateScale(24) }}
    tintColor={isActive ? "#fff" : '#8C949D'} />
);

const CartIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <Image source={Icons['fi-rr-shopping-bag']}
    resizeMode='contain'
    style={{ height: moderateScale(24), width: moderateScale(24) }}
    tintColor={isActive ? "#fff" : '#8C949D'} />
);

const OrderIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <Image source={Icons['fi-rr-shopping-cart']}
    resizeMode='contain'
    style={{ height: moderateScale(24), width: moderateScale(24) }}
    tintColor={isActive ? "#fff" : '#8C949D'} />
);

const ProfileIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <Image source={Icons['fi-rr-user']}
    resizeMode='contain'
    style={{ height: moderateScale(24), width: moderateScale(24) }}
    tintColor={isActive ? "#fff" : '#8C949D'} />
);

const CustomTabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = () => {
            switch (route.name) {
              case 'Home':
                return <HomeIcon isActive={isFocused} />;
              case 'Cart':
                return <CartIcon isActive={isFocused} />;
              case 'Order':
                return <OrderIcon isActive={isFocused} />;
              case 'Profile':
                return <ProfileIcon isActive={isFocused} />;
              default:
                return null;
            }
          };

          return (
            <TabBarButton
              key={route.key}
              onPress={onPress}
              accessibilityState={{ selected: isFocused }}
            >
              <View style={styles.tabItem}>
                <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
                  {getIcon()}
                </View>
                <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
                  {label}
                </Text>
              </View>
            </TabBarButton>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name="Order"
        component={ComingSoonScreen}
        options={{
          tabBarLabel: 'Order',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ComingSoonScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#041C45',
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: moderateScale(12),
    color: '#8C949D',
    fontWeight: '400',
  },
  activeTabLabel: {
    color: '#1e3a8a',
    fontWeight: '600',
  },
});

export default BottomTabNavigator; 