import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons'; // adjust path as needed
import { moderateScale } from '../../utils/deviceConfig';
import { Image } from 'react-native';

interface RadioOption {
  label: string;
  value: string;
}

interface Props {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
}

const CustomRadioButton: React.FC<Props> = ({
  options,
  selectedValue,
  onChange,
  direction = 'vertical',
}) => {
  return (
    <View style={[styles.container, direction === 'horizontal' && styles.row]}>
      {options.map((option, index) => {
        const isSelected = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(option.value)}
            style={[styles.radioItem, direction === 'horizontal' && styles.radioItemHorizontal]}
          >
            <View style={[styles.circle]}>
              {isSelected && (
                <View style={[, isSelected && styles.selectedCircle,styles.checkIcon]}/>
              )}
            </View>
            <Text style={styles.label}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  radioItemHorizontal: {
    marginRight: moderateScale(20),
  },
  circle: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  selectedCircle: {
    borderColor: '#041C45',
    backgroundColor: '#041C45',
  },
  checkIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
    resizeMode: 'contain',
    tintColor: '#fff',
    borderRadius:12
  },
  label: {
    fontSize: moderateScale(14),
    color: '#041C45',
  },
});
