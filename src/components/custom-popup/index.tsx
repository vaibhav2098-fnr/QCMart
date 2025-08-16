import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';

type PopupType = 'success' | 'error' | 'info';
type PopupPosition = 'top' | 'bottom';

interface Props {
  visible?: boolean;
  type?: PopupType;
  message?: string;
  position?: PopupPosition;
}

const iconMap = {
  success: { name: 'check-circle', color: '#2ECC71' },
  error: { name: 'error', color: '#E74C3C' },
  info: { name: 'info', color: '#3498DB' },
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomPopup: React.FC<Props> = ({
  visible = false,
  type = 'info',
  message = '',
  position = 'top',
}) => {
  const [show, setShow] = useState(visible);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { color } = iconMap[type];

  useEffect(() => {
    if (visible) {
      setShow(true);
      slideAnim.setValue(0);

      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 2,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShow(false)); // Auto-close after 2 seconds
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
  });

  const topStyle = position === 'top' ? { top: moderateScale(60) } : { bottom: moderateScale(60) };

  return (
    <Modal transparent visible={show} animationType="none">
      <View style={[styles.overlay, topStyle]}>
        <Animated.View
          style={[
            styles.popup,
            { borderLeftColor: color, transform: [{ translateX }] },
          ]}
        >
          <View style={{ marginLeft: moderateScale(10) }}>
            <Text style={[styles.title, { color }]}>{type.toUpperCase()}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  popup: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    borderLeftWidth: moderateScale(5),
    width: '90%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: moderateScale(2), height: moderateScale(2) },
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  message: {
    fontSize: moderateScale(14),
    color: '#333',
    marginTop: moderateScale(4),
  },
});

export default CustomPopup;
