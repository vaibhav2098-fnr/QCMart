// CustomBottomTabs.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { moderateScale } from '../utils/deviceConfig';
import { Icons } from '../assets/qcIcons/qcIcons';
import { HomeScreen, CartScreen, CategoryScreen } from '../screens';
import ComingSoonScreen from '../screens/comingsoon-screen/comingsoon-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  // If you mount this inside a react-navigation stack and want to forward navigation to children,
  // pass `navigation` here (optional).
  navigation?: any;
}

interface TabItem {
  key: string;
  name: string;
  component: React.ComponentType<any>;
  label: string;
  iconKey: string;
}

/* ---------- TabBarButton (animated press/selected pulse) ---------- */
interface TabBarButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  selected: boolean;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ children, onPress, selected }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, { toValue: 1.1, duration: 160, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 1, duration: 160, useNativeDriver: true }),
        ]),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  }, [selected, scaleAnim, opacityAnim]);

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

/* ---------- Icon components (use tintColor via style) ---------- */
const IconImage: React.FC<{ src: any; isActive: boolean }> = ({ src, isActive }) => (
  <Image
    source={src}
    resizeMode="contain"
    style={{
      height: moderateScale(24),
      width: moderateScale(24),
      tintColor: isActive ? '#fff' : '#8C949D',
    }}
  />
);

/* ---------- Main Custom Bottom Tabs Component ---------- */
const CustomBottomTabs: React.FC<Props> = ({ navigation }) => {
  const tabs: TabItem[] = [
    { key: 'home', name: 'Home', component: HomeScreen, label: 'Home', iconKey: 'fi-rr-home' },
    { key: 'cart', name: 'Cart', component: CartScreen, label: 'Cart', iconKey: 'fi-rr-shopping-bag' },
    { key: 'order', name: 'Order', component: ComingSoonScreen, label: 'Order', iconKey: 'fi-rr-shopping-cart' },
    { key: 'profile', name: 'Profile', component: ComingSoonScreen, label: 'Profile', iconKey: 'fi-rr-user' },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const translate = useRef(new Animated.Value(0)).current;
  const animDuration = 300;

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    // set active tab immediately so tab UI updates while animation runs
    setActiveIndex(index);
    Animated.timing(translate, {
      toValue: -index * SCREEN_WIDTH,
      duration: animDuration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.outerContainer}>
      {/* Screens wrapper — horizontally arranged */}
      <Animated.View
        style={[
          styles.screensRow,
          {
            width: SCREEN_WIDTH * tabs.length,
            transform: [{ translateX: translate }],
          },
        ]}
      >
        {tabs.map((t, i) => {
          const ScreenComponent = t.component;
          return (
            <View key={t.key} style={[styles.screenPane, { width: SCREEN_WIDTH }]}>
              {/* forward navigation prop if given */}
              <ScreenComponent navigation={navigation} />
            </View>
          );
        })}
      </Animated.View>

      {/* Floating tab bar */}
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {tabs.map((t, i):any => {
            const isFocused = i === activeIndex;
            return (
              <TabBarButton key={t.key} onPress={() => goTo(i)} selected={isFocused}>
                <View style={styles.tabItem}>
                  <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
                    <IconImage src={Icons[t.iconKey]} isActive={isFocused} />
                    {isFocused && (
                      <Text style={[styles.tabLabel, styles.activeTabLabel]}>{t.label}</Text>
                    )}
                  </View>
                </View>
              </TabBarButton>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CustomBottomTabs;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screensRow: {
    flexDirection: 'row',
    height: '100%',
  },
  screenPane: {
    height: '100%',
    // remove padding bottom so content doesn't hide behind tabbar; if needed, add marginBottom
    paddingBottom: moderateScale(90),
  },

  /* Tab bar styles */
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 50,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(18),
    paddingTop: moderateScale(10),
    paddingBottom: Platform.OS === 'ios' ? moderateScale(28) : moderateScale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(8),
  },
  activeIconContainer: {
    backgroundColor: '#041C45',
    width: moderateScale(110),
    height: moderateScale(56),
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
    color: '#fff',
    fontWeight: '400',
    marginLeft: moderateScale(8),
  },
});
