import FilterBottomSheet from '@/src/components/custom-Filter-BottomSheet.tsx/custom-filterBottomSheet'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo, useRef, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Icons } from '../../assets/qcIcons/qcIcons'
import CustomInput from '../../components/custom-Input/input-field'
import NotFoundPage from '../../components/custom-NotFoundPage/not-FoundPage'
import ProductCard from '../../components/custom-ProductCard/product-Card'
import CustomHeader from '../../components/custom-header/custom-header'
import { RootState } from '../../redux/reducers'
import { moderateScale } from '../../utils/deviceConfig'
import { statusBarHeight } from '../../utils/helper'

const MostPopularScreen = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const bottomSheetRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSort, setSelectedSort] = useState('Most Recent');
    const [selectedRating, setSelectedRating] = useState('All');
    const [range, setRange] = useState([100, 590]);
    const { getProductsListData } = useSelector((state: RootState) => state.getProductsListDataReducer);

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
        if (search.trim() === '') return getProductsListData?.data;
        const lowercased = search?.toLowerCase();
        return getProductsListData?.data?.filter((item) =>
            item?.name?.toLowerCase().includes(lowercased)
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
                            title={item?.name}
                            price={item?.price}
                            oldPrice={item?.original_price}
                            reviews_count={item?.reviews_count || 0}
                            image={{ uri: item?.image_url }}
                            isFavorite={item?.isFavorite}
                            product={item}
                        />
                    )}
                />
            )}
            <FilterBottomSheet
                ref={bottomSheetRef}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                range={range}
                setRange={setRange}
                onApply={applyFilter}
                onReset={resetFilter}
            />

        </View>
    )
}

export default MostPopularScreen