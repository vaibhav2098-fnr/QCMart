import React from 'react';
import CustomHeader from '../../components/custom-header/custom-header';
import { FlatList, SafeAreaView, View } from 'react-native';
import { statusBarHeight } from '../../utils/helper';
import { moderateScale } from '../../utils/deviceConfig';
import { categoryData } from '../home-screen/dummy-data';
import CategoryItem from '../../components/custom-category/custom-category';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Icons } from '../../assets/qcIcons/qcIcons';

const CategoryScreen = () => {
    const navigation = useNavigation();
    const { productCategoriesData = [] } = useSelector((state: RootState) => state.productCategoriesDataReducer);

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
                data={productCategoriesData}
                keyExtractor={(item) => item.id.toString() + item.name}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: moderateScale(12),
                    paddingTop: moderateScale(8),
                }}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                }}
                renderItem={({ item }) => (
                    <CategoryItem buttonStyle={{ marginHorizontal: moderateScale(6) }} icon={item?.icon || Icons['fi-rr-camera']} title={item.name} onPress={() => console.log(item.name)} />
                )}
            />
        </SafeAreaView>
    );
};

export default CategoryScreen;
