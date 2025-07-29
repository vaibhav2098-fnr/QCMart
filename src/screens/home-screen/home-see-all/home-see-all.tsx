import React from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icons } from '../../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../../utils/deviceConfig';

const HomeSeeAll = ({ title = 'Category', onPress }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onPress} style={styles.seeAllContainer}>
                <Text style={styles.seeAllText}>See All{' '}</Text>
                <Image source={Icons['fi-rr-arrow-right']} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default HomeSeeAll;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(16),
        paddingHorizontal: moderateScale(12),
    },
    title: {
        color: '#09090A',
        fontSize: moderateScale(18),
        fontWeight: '500',
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        color: '#041C45',
        fontSize: moderateScale(18),
        fontWeight: '400',
    },
    icon: {
        height: moderateScale(24),
        width: moderateScale(24),
        resizeMode: 'contain',
    },
});
