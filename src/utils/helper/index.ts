import {Dimensions, Platform, StatusBar} from 'react-native';

export const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight;

export const getDeviceWidth = () => {
  return Dimensions.get('window').width;
};

export const getDeviceHeight = () => {
  return Dimensions.get('window').height;
};

export const isIOS = () => {
  return Platform.OS === 'ios';
};

// debounce.ts
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export function throttle(func: (...args: any[]) => void, limit: number) {
  let inThrottle = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export const isEmptyObj = (obj = {}) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object &&
    Object.keys(obj).length === 0
  );
};


export const transformIconName = (backendIcon: string): string => {
  if (!backendIcon) return '';

  // Trim, split, and extract the actual icon name
  const parts = backendIcon.trim().split(' ');
  const baseIcon = parts.pop()?.replace(/^ti-/, '') || '';

  // Return new prefix with icon
  return `fi-rr-${baseIcon}`;
};