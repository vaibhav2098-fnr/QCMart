import { IMAGES } from '@/assets/images';
import { moderateScale } from '@/src/utils/deviceConfig';
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

const { width } = Dimensions.get('window');

const DATA = [
    {
        id: '1',
        title: '20% OFF DURING\nTHE WEEKEND',
        image: IMAGES['carousal-img'],
    },
    {
        id: '2',
        title: 'Thinking Differently\nwith VR',
        image: IMAGES['carousal-img'],
    },
    {
        id: '3',
        title: 'Upgrade Your\nExperience Now',
        image: IMAGES['carousal-img'],
    },
    {
        id: '4',
        title: 'Upgrade Your\nExperience Now',
        image: IMAGES['carousal-img'],
    },
    {
        id: '5',
        title: 'Upgrade Your\nExperience Now',
        image: IMAGES['carousal-img'],
    },
];

const ITEM_WIDTH = width;

const CustomCarousel = () => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % DATA.length;
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
                <Image source={IMAGES['shadow-img']} style={styles.circle} resizeMode="contain" />
                <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
        </View>
    );

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={DATA}
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
                {DATA.map((_, idx) => (
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
        width: ITEM_WIDTH * 0.92,
        flexDirection: 'row',
        backgroundColor: '#00214d',
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        marginHorizontal: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'space-between',
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
        borderWidth:2,
        borderColor:'#000',
        borderRadius:moderateScale(140)
    },
    image: {
        width: moderateScale(136),
        height: moderateScale(140),
        position:'absolute'
    },
    circle: {
        width: moderateScale(140),
        height: moderateScale(140),
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: moderateScale(10),
    },
    dot: {
        width: moderateScale(8),
        height: moderateScale(8),
        backgroundColor: '#ccc',
        borderRadius: moderateScale(4),
        margin: moderateScale(4),
    },
    activeDot: {
        backgroundColor: '#97d700',
        width: moderateScale(16),
    },
});

