import { getDeviceWidth } from '@/src/utils/helper';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';

const ProductCard = (props: any) => {
    const navigation = useNavigation();
    const {
        title,
        price,
        oldPrice,
        reviews_count,
        image,
        isFavorite,
        product,
        // onAddToCart,
    } = props;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => (navigation as any).navigate('productDetail', { product: product || { title, price, oldPrice, reviews_count, image, isFavorite } })}
        >
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.productImage} resizeMode="contain" />

                <TouchableOpacity
                    style={styles.heartIcon}
                    onPress={(e) => {
                        e.stopPropagation();
                        // Handle favorite toggle
                    }}
                >
                    <Image tintColor={isFavorite ? 'red' : '#ccc'} source={isFavorite ? Icons['fi-sr-heart'] : Icons['fi-rr-heart']} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>

            {title ? <Text numberOfLines={2} style={styles.title}>{title}</Text> : null}

            <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{price}</Text>
                {oldPrice ? <Text style={styles.oldPrice}>₹{oldPrice}</Text> : null}
                {reviews_count ?
                    <Text style={styles.reviews_count}> <Image source={Icons['fi-rr-star']} style={styles.starIcon} /> ({reviews_count})</Text>
                    : null}
            </View>

            {/* <TouchableOpacity 
                style={styles.addToCartButton}
                onPress={(e) => {
                    e.stopPropagation();
                    if (onAddToCart) {
                        onAddToCart(product || { title, price, oldPrice, reviews_count, image, isFavorite });
                    }
                }}
            >
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity> */}
        </TouchableOpacity>
    );
};

export default ProductCard;



const styles = StyleSheet.create({
    card: {
        width: getDeviceWidth() * 0.42,
        height: moderateScale(230),
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        margin: moderateScale(8),
        padding: moderateScale(10),

        // iOS shadow
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },

        // Android shadow
        elevation: 6,
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
        lineHeight: 20
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(6),
        flexWrap: 'wrap',
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
    reviews_count: {
        fontSize: moderateScale(16),
        color: '#041C45',
        marginLeft: moderateScale(8),
        fontWeight: '600',
    },
    starIcon: {
        width: moderateScale(14),
        height: moderateScale(14),
        tintColor: '#1e90ff',
        marginRight: moderateScale(4),
    }
    // addToCartButton: {
    //     backgroundColor: '#25D366',
    //     borderRadius: moderateScale(6),
    //     paddingVertical: moderateScale(6),
    //     paddingHorizontal: moderateScale(8),
    //     marginTop: moderateScale(8),
    //     alignItems: 'center',
    // },
    // addToCartText: {
    //     color: '#fff',
    //     fontSize: moderateScale(10),
    //     fontWeight: '600',
    // },
});
