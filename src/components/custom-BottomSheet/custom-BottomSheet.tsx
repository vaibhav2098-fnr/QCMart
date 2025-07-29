/**
 * RBBottom Sheet (TypeScript version)
 */
import React, { forwardRef, ReactNode } from 'react';
import style from './styles';
import { getDeviceHeight } from '../../utils/helper';
import RBSheet from 'react-native-raw-bottom-sheet';
import type { ViewStyle } from 'react-native';

interface RBBottomSheetProps {
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  openDuration?: number;
  closeDuration?: number;
  height?: number;
  dragFromTopOnly?: boolean;
  child?: ReactNode;
  containerStyle?: ViewStyle;
  draggableIconStyle?: ViewStyle;
  onClose?: () => void;
  wrapperStyle?: ViewStyle;
  showTransparent?: boolean;
  onOpen?: () => void;
  withCloseButton?: boolean;
  autoHeight?: boolean;
  customHeight?: number | string;
}

const RBBottomSheet = forwardRef<RBSheet, RBBottomSheetProps>((props, ref) => {
  const {
    closeOnDragDown = true,
    closeOnPressMask = true,
    openDuration = 100,
    closeDuration = 100,
    height = getDeviceHeight() * 0.9,
    dragFromTopOnly = true,
    child,
    containerStyle = {},
    draggableIconStyle = {},
    onClose,
    wrapperStyle = {},
    showTransparent = false,
    onOpen,
    withCloseButton,
    autoHeight,
    customHeight,
  } = props;

  const handleRBSheetHeight = (): number | string | undefined => {
    if (autoHeight) {
      return undefined;
    } else if (customHeight) {
      return customHeight;
    } else {
      return '35%';
    }
  };

  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={withCloseButton ? false : closeOnDragDown}
      closeOnPressMask={closeOnPressMask}
      dragFromTopOnly={dragFromTopOnly}
      height={height}
      onClose={onClose}
      onOpen={onOpen}
      openDuration={openDuration}
      keyboardAvoidingViewEnabled={false}
      closeDuration={closeDuration}
      customStyles={{
        wrapper: {
          ...style.backgroundcolorStyle(showTransparent),
          ...wrapperStyle,
        },
        draggableIcon: {
          ...style.draggableIcon,
          ...draggableIconStyle,
        },
        container: {
          ...style.container,
          height: handleRBSheetHeight(),
          ...containerStyle,
        },
      }}>
      {child}
    </RBSheet>
  );
});

export default RBBottomSheet;
