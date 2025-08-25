import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';

interface Props extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    showLockIcon?: boolean;
    enableToggleVisibility?: boolean;
    roundedBorder?: boolean;
    disabled?: boolean;
    customPlaceholder?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    errorMessage?: string;
    isShowError?: string | false | undefined
}

const CustomInput: React.FC<Props> = ({
    value,
    onChangeText,
    showLockIcon = true,
    enableToggleVisibility = true,
    roundedBorder = true,
    disabled = false,
    customPlaceholder = 'Password',
    leftIcon,
    rightIcon,
    errorMessage,
    isShowError,
    ...rest
}) => {
    const [secureText, setSecureText] = useState(true);

    const toggleSecureEntry = () => {
        if (enableToggleVisibility) setSecureText(prev => !prev);
    };

    return (
        <View style={{ width: '100%', marginVertical: moderateScale(8) }}>
            <View
                style={[
                    styles.container,
                    roundedBorder && styles.roundedBorder,
                    disabled && styles.disabledContainer,
                    isShowError && styles.errorBorder,
                ]}
            >
                {showLockIcon && (
                    <View style={styles.leftIcon}>
                        {leftIcon ? (
                            leftIcon
                        ) : (
                            <Image
                                style={{ resizeMode: 'contain' }}
                                height={moderateScale(24)}
                                width={moderateScale(24)}
                                source={Icons['fi-rr-lock']}
                            />
                        )}
                    </View>
                )}

                <TextInput
                    style={[styles.input, disabled && styles.disabledInput]}
                    placeholder={customPlaceholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureText}
                    editable={!disabled}
                    placeholderTextColor="#666"
                    {...rest}
                />

                {enableToggleVisibility && (
                    <TouchableOpacity
                        onPress={toggleSecureEntry}
                        disabled={disabled}
                        style={styles.rightIcon}
                    >
                        {rightIcon ? (
                            rightIcon
                        ) : (
                            <Image
                                style={{
                                    resizeMode: 'contain',
                                    tintColor: disabled ? '#aaa' : '#333',
                                }}
                                height={moderateScale(24)}
                                width={moderateScale(24)}
                                source={secureText ? Icons['fi-rr-eye-crossed'] : Icons['fi-rr-eye']}
                            />
                        )}
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
        </View>

    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: moderateScale(12),
        height: moderateScale(50),
        backgroundColor: '#fff',
    },
    roundedBorder: {
        borderRadius: moderateScale(12),
    },
    input: {
        flex: 1,
        paddingHorizontal: moderateScale(10),
        fontSize: moderateScale(16),
        color: '#000',
    },
    disabledContainer: {
        backgroundColor: '#f2f2f2',
        borderColor: '#e0e0e0',
    },
    disabledInput: {
        color: '#aaa',
    },
    leftIcon: {
        marginRight: moderateScale(8),
    },
    rightIcon: {
        marginLeft: moderateScale(8),
    },
    errorBorder: {
        borderColor: '#ff4d4f',
    },
    errorText: {
        fontSize: moderateScale(12),
        color: '#ff4d4f',
        textAlign: 'left',
        marginTop: moderateScale(6)
    },
});
