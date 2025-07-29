import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../utils/deviceConfig';
import { Icons } from '../../assets/qcIcons/qcIcons';

const ProductCard = (props: any) => {
    const navigation = useNavigation();
    const {
        title,
        price,
        oldPrice,
        offer,
        image,
        isFavorite,
        product,
    } = props;

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => (navigation as any).navigate('productDetail', { product: product || { title, price, oldPrice, offer, image, isFavorite } })}
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
                {offer ? <Text style={styles.offer}>{offer}</Text> : null}
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;



const styles = StyleSheet.create({
    card: {
        width: moderateScale(170),
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
        flexWrap:'wrap'
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
