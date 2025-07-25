import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 850;

export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.25) =>
  size + (scale(size) - size) * factor;
export const getDimensions = () => {
  return {height, width};
};
export const isIOS = () => Platform.OS === 'ios';
export const isAndroid = () => Platform.OS === 'android';
