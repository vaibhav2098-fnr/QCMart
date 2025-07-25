import { moderateScale } from '@/src/utils/deviceConfig';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({ data }: any) => {
    const {
        title,
        price,
        oldPrice,
        offer,
        image,
        isFavorite,
    } = data;

    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.productImage} resizeMode="contain" />

                <TouchableOpacity style={styles.heartIcon}>
                    <FontAwesome
                        name="heart"
                        size={18}
                        color={isFavorite ? 'red' : '#ccc'}
                    />
                </TouchableOpacity>
            </View>

            {title ? <Text style={styles.title}>{title}</Text> : null}

            <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{price}</Text>
                {oldPrice ? <Text style={styles.oldPrice}>₹{oldPrice}</Text> : null}
                {offer ? <Text style={styles.offer}>{offer}</Text> : null}
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;



const styles = StyleSheet.create({
    card: {
        width: moderateScale(178),
        height: moderateScale(228),
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        margin: moderateScale(8),
        padding: moderateScale(10),
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    productImage: {
        width: moderateScale(116),
        height: moderateScale(132),
    },
    badge: {
        position: 'absolute',
        top: moderateScale(5),
        left: moderateScale(5),
        backgroundColor: '#1e90ff',
        color: '#fff',
        fontSize: moderateScale(10),
        paddingHorizontal: moderateScale(6),
        paddingVertical: moderateScale(2),
        borderRadius: moderateScale(4),
    },
    heartIcon: {
        position: 'absolute',
        top: moderateScale(6),
        right: moderateScale(6),
    },
    title: {
        fontSize: moderateScale(12),
        marginTop: moderateScale(10),
        fontWeight: '600',
        color: '#09090A',
        lineHeight:20
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(6),
    },
    price: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#09090A',
    },
    oldPrice: {
        fontSize: moderateScale(12),
        color: '#9CA3AF',
        marginLeft: moderateScale(8),
        textDecorationLine: 'line-through',
    },
    offer: {
        fontSize: moderateScale(8),
        color: '#041C45',
        marginLeft: moderateScale(8),
        fontWeight: '600',
    },
});
