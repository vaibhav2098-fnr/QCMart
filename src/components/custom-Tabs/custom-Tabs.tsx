import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';

export interface TabOption {
  key: string;
  label: string;
}

interface CustomTabsProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  containerStyle?: any;
  activeColor?: string;
  inactiveColor?: string;
  underlineColor?: string;
  activeUnderlineColor?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  options,
  activeTab,
  onTabChange,
  containerStyle,
  activeColor = '#041C45',
  inactiveColor = '#6B7280',
  underlineColor = '#E5E7EB',
  activeUnderlineColor = '#041C45',
}) => {
  const activeIndex = options.findIndex(option => option.key === activeTab);
  const underlineWidth = 100 / options.length;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabsRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={styles.tabButton}
            onPress={() => onTabChange(option.key)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === option.key ? activeColor : inactiveColor }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.underline, { backgroundColor: underlineColor }]} />
      <View
        style={[
          styles.underlineActive,
          {
            backgroundColor: activeUnderlineColor,
            width: `${underlineWidth}%`,
            left: `${activeIndex * underlineWidth}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(6),
    marginBottom: moderateScale(8),
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
  },
  tabText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  underline: {
    height: 2,
    marginTop: moderateScale(8),
  },
  underlineActive: {
    position: 'absolute',
    height: 2,
    bottom: 0,
  },
});

export default CustomTabs;
