// import { IMAGES } from '@/assets/images';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width;

const CustomCarousel = ({ data }: any) => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % data.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 4000); // 4s interval

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.title}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {item.title.split('\n')[0]}
                    </Text>
                    {'\n'}
                    {item.title.split('\n')[1]}
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Now</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.right}>
                <Image source={item.image} style={styles.circle} resizeMode="contain" />
                {/* <Image source={IMG['QC-mart-logo']} style={styles.circle} resizeMode="contain" /> */}
            </View>
        </View>
    );

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                scrollEnabled={!false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / ITEM_WIDTH);
                    setCurrentIndex(index);
                }}
            />
            <View style={styles.dots}>
                {data.map((_, idx) => (
                    <View
                        key={idx}
                        style={[
                            styles.dot,
                            currentIndex === idx ? styles.activeDot : {},
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default CustomCarousel;


const styles = StyleSheet.create({
    card: {
        width: ITEM_WIDTH * 0.865,
        flexDirection: 'row',
        backgroundColor: '#00214d',
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        marginHorizontal: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: moderateScale(16)
    },
    left: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(22),
        marginBottom: moderateScale(15),
    },
    button: {
        backgroundColor: '#97d700',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(30),
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#00214d',
        fontWeight: '600',
    },
    right: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: moderateScale(140)
    },
    image: {
        width: moderateScale(136),
        height: moderateScale(140),
        position: 'absolute'
    },
    circle: {
        width: moderateScale(140),
        height: moderateScale(140),
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: moderateScale(10),
        position: 'absolute',
        bottom: moderateScale(10),
        right: 0,
        left: 0
    },
    dot: {
        width: moderateScale(5),
        height: moderateScale(5),
        backgroundColor: '#ccc',
        borderRadius: moderateScale(4),
        margin: moderateScale(2),
    },
    activeDot: {
        backgroundColor: '#97d700',
        width: moderateScale(16),
    },
});

