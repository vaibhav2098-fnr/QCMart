import React from 'react';
import CustomHeader from '../../components/custom-header/custom-header';
import { FlatList, SafeAreaView } from 'react-native';
import { statusBarHeight } from '../../utils/helper';
import { moderateScale } from '../../utils/deviceConfig';
import { categoryData } from '../home-screen/dummy-data';
import CategoryItem from '../../components/custom-category/custom-category';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginTop: statusBarHeight,
                paddingHorizontal: moderateScale(16),
                backgroundColor: '#fff',
                marginVertical: moderateScale(16),
            }}
        >
            {/* 🧭 Header */}
            <CustomHeader
                title={'My Wishlist'}
                onBack={() => navigation.goBack()}
                isShowSearch={false}
            />

            {/* 📋 Filtered FlatList */}
            <FlatList
                data={categoryData}
                keyExtractor={(item) => item.id.toString() + item.title}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: moderateScale(12),
                    paddingTop: moderateScale(8),
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                }}
                renderItem={({ item }) => (
                    <CategoryItem icon={item.icon} title={item.title} onPress={() => console.log(item.title)} />
                )}
            />
        </SafeAreaView>
    );
};

export default CategoryScreen;
