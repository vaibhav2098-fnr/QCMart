import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { moderateScale } from '../../../utils/deviceConfig';
import { IMG } from '../../../assets/qcImages/qxImages';

const PromoBanner = ({ itemImg }) => {
    return (
        <ImageBackground source={IMG['QC-mart-promo-banner']} style={styles.container} >
            <View style={styles.textSection}>
                <Text style={styles.subHeading}>Winter Sale</Text>
                <Text style={styles.discount}>15% OFF</Text>
            </View>

            <View style={styles.imageSection}>
                <Text style={styles.newLabel}>NEW!</Text>
                <Image
                    source={{ uri: itemImg }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        </ImageBackground>
    );
};

export default PromoBanner;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: moderateScale(16),
        paddingHorizontal: moderateScale(30),
        marginVertical: moderateScale(10),
        alignItems: 'center',
        borderRadius: moderateScale(16),
    },
    textSection: {
        flex: 1,
    },
    subHeading: {
        fontSize: moderateScale(14),
        color: '#9CA3AF',
        fontStyle: 'italic',
        fontWeight: '400',
    },
    discount: {
        fontSize: moderateScale(32),
        fontWeight: '800',
        color: '#041C45',
        marginTop: moderateScale(4),
    },
    imageSection: {
        flex: 1,
        alignItems: 'flex-end',
        position: 'relative',
    },
    newLabel: {
        position: 'absolute',
        top: moderateScale(10),
        left: moderateScale(32),
        fontSize: moderateScale(14),
        fontWeight: '700',
        transform: [{ rotate: '-10deg' }],
        color: '#3B3B3B',
    },
    image: {
        width: moderateScale(120),
        height: moderateScale(80),
    },
});
