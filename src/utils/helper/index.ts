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

  return function (this: any, ...args: any[]) {
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

/**
 * Formats validation errors for display
 * @param validationErrors - Object containing validation errors
 * @returns Formatted error message string
 */
export const formatValidationErrors = (validationErrors: Record<string, string[]>): string => {
  if (!validationErrors || Object.keys(validationErrors).length === 0) {
    return '';
  }

  let errorMessage = "Please fix the following errors:\n";
  Object.keys(validationErrors).forEach(field => {
    if (validationErrors[field] && validationErrors[field].length > 0) {
      // Capitalize field name for better display
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
      errorMessage += `• ${fieldName}: ${validationErrors[field][0]}\n`;
    }
  });
  
  return errorMessage;
};

/**
 * Gets the first validation error for a specific field
 * @param validationErrors - Object containing validation errors
 * @param fieldName - Name of the field to get error for
 * @returns First error message for the field or undefined
 */
export const getFieldValidationError = (
  validationErrors: Record<string, string[]> | null, 
  fieldName: string
): string | undefined => {
  if (!validationErrors || !validationErrors[fieldName] || validationErrors[fieldName].length === 0) {
    return undefined;
  }
  return validationErrors[fieldName][0];
};

// Export search utilities
export * from './searchUtils';