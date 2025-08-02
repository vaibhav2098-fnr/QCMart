import { moderateScale } from "../../utils/deviceConfig";
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons'; // Assuming you have back & search icons

const CustomHeader = ({ onBack, title, onSearch, isShowSearch,rightIcon }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.iconWrapper}>
                <Image source={Icons['fi-rr-arrow-small-left']} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            {isShowSearch ? <TouchableOpacity onPress={onSearch} style={styles.iconWrapper}>
                <Image source={rightIcon || Icons['fi-rr-search']} style={styles.icon} />
            </TouchableOpacity> : <View />}
        </View>
    );
};

export default CustomHeader;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: moderateScale(12),
        backgroundColor: '#fff',
    },
    iconWrapper: {
        padding: moderateScale(4),
    },
    icon: {
        height: moderateScale(24),
        width: moderateScale(24),
        resizeMode: 'contain',
        tintColor: '#000',
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: '#2B2B2B',
    },
});
