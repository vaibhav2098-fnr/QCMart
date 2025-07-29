import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../../utils/deviceConfig';

const SummerSaleBanner = () => {
    return (
        <View style={styles.cardWrapper}>
            {/* Sale Banner */}
            <View style={styles.banner}>
                {/* Discount Badge */}
                <View style={styles.discountBadge}>
                    <Text style={styles.discountTitle}>UP TO</Text>
                    <Text style={styles.discountPercent}>60%</Text>
                    <Text style={styles.discountSub}>Free Delivery{'\n'}above ₹999</Text>
                </View>

                {/* Sale Content */}
                <View style={styles.content}>
                    <Text style={styles.subtitle}>— End of Summer —</Text>
                    <Text style={styles.saleText}>Sale</Text>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>30ᵗʰ May - 1ˢᵗ Jun</Text>
                    </View>
                    <Text style={styles.message}>Grab Your Limited{'\n'}Time Offer Today!</Text>

                    <TouchableOpacity style={styles.ctaButton}>
                        <Text style={styles.ctaText}>SHOP NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottom}>
                <View>
                    <Text style={styles.bottomTitle}>New Arrivals</Text>
                    <Text style={styles.bottomSubtitle}>Summer’ 25 Collections</Text>
                </View>

                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View all →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SummerSaleBanner;


const styles = StyleSheet.create({
    cardWrapper: {
        marginHorizontal: moderateScale(12),
        marginVertical: moderateScale(14),
        borderRadius: moderateScale(16),
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    banner: {
        backgroundColor: '#1636C6',
        padding: moderateScale(16),
        borderTopLeftRadius: moderateScale(16),
        borderTopRightRadius: moderateScale(16),
        position: 'relative',
    },
    discountBadge: {
        position: 'absolute',
        top: moderateScale(16),
        left: moderateScale(16),
        backgroundColor: '#FFD600',
        padding: moderateScale(6),
        borderTopLeftRadius: moderateScale(8),
        borderBottomRightRadius: moderateScale(8),
        width: moderateScale(70),
        zIndex: 10,
    },
    discountTitle: {
        fontSize: moderateScale(8),
        fontWeight: '600',
        color: '#000',
    },
    discountPercent: {
        fontSize: moderateScale(16),
        fontWeight: '900',
        color: '#000',
        lineHeight: 18,
    },
    discountSub: {
        fontSize: moderateScale(6),
        color: '#000',
        textAlign: 'center',
        marginTop: 2,
    },
    content: {
        alignItems: 'center',
        paddingTop: moderateScale(20),
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: '#fff',
        fontWeight: '500',
    },
    saleText: {
        fontSize: moderateScale(52),
        fontWeight: '900',
        color: '#fff',
    },
    dateBox: {
        backgroundColor: '#FFD600',
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(4),
        borderRadius: moderateScale(4),
    },
    dateText: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: '#041C45',
    },
    message: {
        color: '#fff',
        fontSize: moderateScale(14),
        fontWeight: '500',
        textAlign: 'center',
        marginTop: moderateScale(6),
    },
    ctaButton: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: moderateScale(20),
        marginTop: moderateScale(12),
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(20),
    },
    ctaText: {
        color: '#fff',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: moderateScale(16),
        backgroundColor: '#fff',
    },
    bottomTitle: {
        fontSize: moderateScale(18),
        fontWeight: '500',
        color: '#171717',
    },
    bottomSubtitle: {
        fontSize: moderateScale(16),
        color: '#9CA3AF',
        fontWeight: '300',
        marginTop: moderateScale(2),
    },
    viewAllButton: {
        backgroundColor: '#041C45',
        borderRadius: moderateScale(6),
        height: moderateScale(30),
        width: moderateScale(98),
        justifyContent:'center',
        alignItems:'center'
    },
    viewAllText: {
        color: '#fff',
        fontSize: moderateScale(12),
        fontWeight: '500',
    },
});
