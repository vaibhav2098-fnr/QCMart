import { moderateScale } from '@/src/utils/deviceConfig';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const categories = ['All', 'Computer', 'Laptop', 'Accessories'];

const CategoryChips = () => {
  const [selected, setSelected] = useState('All');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((item) => {
        const isActive = selected === item;

        return (
          <TouchableOpacity
            key={item}
            style={[styles.chip, isActive ? styles.activeChip : styles.inactiveChip]}
            onPress={() => setSelected(item)}
          >
            <Text style={[styles.chipText, isActive ? styles.activeText : styles.inactiveText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryChips;

const styles = StyleSheet.create({
    container: {
      marginVertical: moderateScale(10),
      paddingHorizontal: moderateScale(10),
    },
    chip: {
      paddingHorizontal: moderateScale(16),
      alignItems:'center',
      justifyContent:'center',
      borderRadius: moderateScale(24),
      marginRight: moderateScale(10),
      borderWidth: moderateScale(1.5),
      height:moderateScale(38)
    },
    activeChip: {
      backgroundColor: '#002B5B', // navy blue
      borderColor: '#002B5B',
    },
    inactiveChip: {
      backgroundColor: '#fff',
      borderColor: '#002B5B',
    },
    chipText: {
      fontSize: moderateScale(14),
      fontWeight: '600',
    },
    activeText: {
      color: '#fff',
    },
    inactiveText: {
      color: '#002B5B',
    },
  });
  