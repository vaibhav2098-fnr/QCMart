import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';

interface AccordionItem {
  id: string;
  title: string;
  onPress?: () => void;
}

interface CustomAccordionProps {
  title: string;
  items: AccordionItem[];
  isExpanded: boolean;
  onToggle: () => void;
  icon?: string;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  items,
  isExpanded,
  onToggle,
  icon,
}) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isExpanded]);

  const maxHeight = items.length * moderateScale(50) + moderateScale(20);

  return (
    <View style={styles.accordionContainer}>
      {/* Header */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          {icon && (
            <Image
              source={Icons[icon as keyof typeof Icons]}
              style={styles.headerIcon}
            />
          )}
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <Animated.View
          style={[
            styles.arrowContainer,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '90deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={Icons['fi-rr-angle-small-right']} style={styles.arrowIcon} />
        </Animated.View>
      </TouchableOpacity>

      {/* Content */}
      <Animated.View
        style={[
          styles.accordionContent,
          {
            maxHeight: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, maxHeight],
            }),
            opacity: heightAnim,
          },
        ]}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.accordionItem,
              index === items.length - 1 && styles.lastItem,
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: '#fff',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#6B7280',
    marginRight: moderateScale(12),
  },
  headerTitle: {
    fontSize: moderateScale(14),
    color: '#374151',
    fontWeight: '500',
  },
  arrowContainer: {
    padding: moderateScale(4),
  },
  arrowIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    tintColor: '#9CA3AF',
  },
  accordionContent: {
    overflow: 'hidden',
  },
  accordionItem: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(12),
    paddingLeft: moderateScale(52), // Indent for submenu items
    backgroundColor: '#F8FAFC',
  },
  lastItem: {
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  itemText: {
    fontSize: moderateScale(13),
    color: '#6B7280',
    fontWeight: '400',
  },
});

export default CustomAccordion; 