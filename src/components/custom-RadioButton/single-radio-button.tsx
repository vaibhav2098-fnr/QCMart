import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';

interface Props {
  selected: boolean;
  onPress: () => void;
  size?: number;
}

const SingleRadioButton: React.FC<Props> = ({
  selected,
  onPress,
  size = 20,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.circle, { width: moderateScale(size), height: moderateScale(size) }]}>
        {selected && (
          <View style={[styles.selectedCircle, { width: moderateScale(size - 8), height: moderateScale(size - 8) }]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SingleRadioButton;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(4),
  },
  circle: {
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: '#041C45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderRadius: moderateScale(6),
    backgroundColor: '#041C45',
  },
}); 