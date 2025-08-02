import React, { useMemo, useRef, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { products } from '../home-screen/dummy-data'
import ProductCard from '../../components/custom-ProductCard/product-Card'
import CustomHeader from '../../components/custom-header/custom-header'
import { useNavigation } from '@react-navigation/native'
import { statusBarHeight } from '../../utils/helper'
import { moderateScale } from '../../utils/deviceConfig'
import CustomInput from '../../components/custom-Input/input-field'
import { Icons } from '../../assets/qcIcons/qcIcons'
import CategoryChips from '../../components/custom-Chips/category-Chips'
import RBBottomSheet from '../../components/custom-BottomSheet/custom-BottomSheet'
import { styles } from './most-popular-styles'
import CustomButton from '../../components/custom-Button/button'
import NotFoundPage from '../../components/custom-NotFoundPage/not-FoundPage'

const MostPopularScreen = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const bottomSheetRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSort, setSelectedSort] = useState('Most Recent');
    const [selectedRating, setSelectedRating] = useState('All');

    const resetFilter = () => {
        setSelectedCategory('All');
        setSelectedSort('Most Recent');
        setSelectedRating('All');
    };

    const applyFilter = () => {
        // Add logic to apply selected filters
        bottomSheetRef.current?.close();
    };
    // 🔍 Filter logic using useMemo (for performance)
    const filteredData = useMemo(() => {
        if (search.trim() === '') return products;
        const lowercased = search.toLowerCase();
        return products.filter((item) =>
            item.title.toLowerCase().includes(lowercased)
        );
    }, [search]);

    const ListHeader = ({ keyword, count }: { keyword: string; count: number }) => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: moderateScale(12),
                paddingBottom: moderateScale(8),
                paddingTop: moderateScale(8),
                borderBottomWidth: 0.5,
                borderColor: '#ccc',
            }}
        >
            <Text style={{ fontSize: moderateScale(14), color: '#000' }}>
                Result For “{keyword}”
            </Text>
            <Text style={{ fontSize: moderateScale(14), color: '#000' }}>
                {count.toLocaleString()} Founds
            </Text>
        </View>
    );

    return (
        <View
            style={{
                flex: filteredData?.length > 4 ? 1 : 0,
                marginTop: statusBarHeight,
                paddingHorizontal: moderateScale(16),
                backgroundColor: '#fff',
                marginVertical: moderateScale(16),
            }}
        >
            {/* 🧭 Header */}
            <CustomHeader
                title={'Most Popular'}
                onBack={() => navigation.goBack()}
                isShowSearch={false}
            />
            <CustomInput
                customPlaceholder='Search....'
                value={search}
                secureTextEntry={false}
                onChangeText={(txt) => setSearch(txt)}
                leftIcon={<Image tintColor={'#8C949D'} source={Icons['fi-rr-search']} style={{ height: moderateScale(24), width: moderateScale(24), resizeMode: 'contain' }} />}
                rightIcon={<TouchableOpacity onPress={() => bottomSheetRef.current?.open()}><Image source={Icons['fi-rr-filter']} style={{ height: moderateScale(18), width: moderateScale(18), resizeMode: 'contain' }} /></TouchableOpacity>}
            />
            {/* <CategoryChips selected={selectedCategory || 'All'} setSelected={setSelectedCategory}/> */}
            {filteredData?.length === 0 ? (
                <NotFoundPage
                    keyword={search}
                    title="No Results Found"
                    message="Sorry, the keyworf you entered cannot be found, please check again or search with another keyword."
                />
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString() + item.title}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: moderateScale(8),
                        paddingBottom: moderateScale(80),
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                    }}
                    ListHeaderComponent={
                        filteredData.length > 0 && search?.length > 0 ? (
                            <ListHeader keyword={search} count={filteredData.length} />
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <ProductCard
                            title={item?.title}
                            price={item?.price}
                            oldPrice={item?.originalPrice}
                            offer={item?.discount}
                            image={{ uri: item?.image }}
                            isFavorite={item?.isFavorite}
                            product={item}
                        />
                    )}
                />
            )}
            <RBBottomSheet
                ref={bottomSheetRef}
                child={
                    <View style={{}}>
                        <Text style={styles.sheetTitle}>Sort & Filter</Text>
                        <View style={styles.dividerLine} />

                        {/* Categories */}
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <CategoryChips data={['All', 'Computer', 'Laptop', 'Accessories']} selected={selectedCategory || 'All'} setSelected={setSelectedCategory} />

                        {/* Price Range */}
                        <Text style={styles.sectionTitle}>Price Range</Text>
                        <View style={styles.priceRangeTextContainer}>
                            <Text style={styles.priceText}>₹100</Text>
                            <Text style={styles.priceText}>₹590</Text>
                        </View>

                        {/* Sort By */}
                        <Text style={styles.sectionTitle}>Sort By</Text>
                        <CategoryChips data={['Popular', 'Most Recent', 'Price High', 'Low to High']} selected={selectedSort || 'Popular'} setSelected={setSelectedSort} />

                        {/* Rating */}
                        <Text style={styles.sectionTitle}>Rating</Text>
                        <CategoryChips data={['All', '5', '4', '3', '2']} extraString={'⭐'} selected={selectedRating || 'All'} setSelected={setSelectedRating} />
                        <View style={styles.dividerLine} />
                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <CustomButton disabled title='Reset' onPress={resetFilter} containerStyle={{ width: '48%', height: moderateScale(50), borderRadius: 28 }} />
                            <CustomButton title='Apply' onPress={applyFilter} containerStyle={{ width: '48%', height: moderateScale(50), borderRadius: 28 }} />
                        </View>
                    </View>
                }
                customHeight={480}
                closeOnDragDown
                withCloseButton={false}
                containerStyle={styles.bottomSheetStyle}
            />
        </View>
    )
}

export default MostPopularScreen