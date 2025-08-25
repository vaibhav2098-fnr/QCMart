import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';

interface Props {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    containerStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle;
    icons?: React.ReactElement
}

const CustomButton: React.FC<Props> = ({
    title,
    onPress,
    disabled = false,
    containerStyle,
    textStyle,
    icons = null,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
            style={[
                styles.button,
                disabled ? styles.disabledButton : styles.enabledButton,
                containerStyle,
            ]}
        >
            {icons}
            <Text
                style={[
                    styles.buttonText,
                    disabled ? styles.disabledText : styles.enabledText,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;


const styles = StyleSheet.create({
    button: {
        height: moderateScale(48),
        width: '100%',
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        marginVertical: moderateScale(12),
    },
    enabledButton: {
        backgroundColor: '#001f4d', // navy blue
    },
    disabledButton: {
        backgroundColor: '#f0f6fd', // light blueish
    },
    buttonText: {
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
    enabledText: {
        color: '#fff',
    },
    disabledText: {
        color: '#001f4d',
    },
    checkoutIcon: {
        width: moderateScale(20),
        height: moderateScale(20),
        resizeMode: 'contain',
        marginRight: moderateScale(8),
        tintColor: '#fff',
    }
});
