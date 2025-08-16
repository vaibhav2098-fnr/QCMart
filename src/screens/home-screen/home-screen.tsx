import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import HomeHeader from './home-header/home-header';
import { statusBarHeight, transformIconName, performSearch } from '../../utils/helper';
import { moderateScale } from '../../utils/deviceConfig';
import CustomInput from '../../components/custom-Input/input-field';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomCarousel from '../../components/custom-Carousel/carousel';
import { DATA, products } from './dummy-data';
import CategoryItem from '../../components/custom-category/custom-category';
import HomeSeeAll from './home-see-all/home-see-all';
import ProductCard from '../../components/custom-ProductCard/product-Card';
import PromoBanner from './home-promo-banner/home-promo-banner';
import SummerSaleBanner from './home-summerSaleBanner/home-summerSaleBanner';
import { useNavigation } from '@react-navigation/native';
import CategoryChips from '../../components/custom-Chips/category-Chips';
import { useDispatch, useSelector } from 'react-redux';
import { productCategoriesDataRequest } from '../../redux/reducers/product-categories';
import { RootState } from '../../redux/reducers';
import { categoriesProductListDataDataRequest } from '../../redux/reducers/categories-products-list';
import { getProductsListDataRequest } from '../../redux/reducers/get-products-list';
import SearchResults from '../../components/custom-SearchResults/custom-SearchResults';

const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { productCategoriesData = [] } = useSelector((state: RootState) => state.productCategoriesDataReducer);
  const { getProductsListData } = useSelector((state: RootState) => state.getProductsListDataReducer);

  useEffect(() => {
    dispatch(productCategoriesDataRequest({}));
    dispatch(getProductsListDataRequest({}));
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Combine all products from different sources
  const allProducts = useMemo(() => {
    const apiProducts = getProductsListData?.data || [];
    const dummyProducts = products;
    return [...apiProducts, ...dummyProducts];
  }, [getProductsListData?.data]);

  // Perform search when query changes
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { filteredProducts: [], filteredCategories: [] };
    }
    return performSearch(allProducts, productCategoriesData, searchQuery);
  }, [searchQuery, allProducts, productCategoriesData]);

  // Handle search input changes with loading state
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setIsSearching(true);
      // Simulate a small delay for better UX
      setTimeout(() => setIsSearching(false), 200);
    } else {
      setIsSearching(false);
    }
  };



  const handleProductListDataRequest = (productId: any, productName: any) => {
    dispatch(categoriesProductListDataDataRequest({ id: productId }));
    (navigation as any).navigate('productCategories', {
      categoryId: productId,
      categoryName: productName,
    })
  }



  const handleCategoryPress = (category: any) => {
    handleProductListDataRequest(category.id, category.name);
  }

  const handleClearSearch = () => {
    setSearchQuery('');
  }


  return (
    <View style={{ flex: 1, marginTop: statusBarHeight, paddingHorizontal: moderateScale(16), backgroundColor: '#fff' }}>
      <HomeHeader />
      <View style={{ marginVertical: moderateScale(8) }} />
      <CustomInput
        customPlaceholder='Search products and categories...'
        value={searchQuery}
        secureTextEntry={false}
        onChangeText={handleSearchChange}
        leftIcon={<Image tintColor={'#8C949D'} source={Icons['fi-rr-search']} style={{ height: 24, width: 24, resizeMode: 'contain' }} />}
        rightIcon={
          searchQuery.length > 0 ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Image source={Icons['fi-rr-cross']} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Image source={Icons['fi-rr-filter']} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
            </TouchableOpacity>
          )
        }
      />
      
      {searchQuery.length > 0 ? (
        <SearchResults
          searchQuery={searchQuery}
          products={searchResults.filteredProducts}
          categories={searchResults.filteredCategories}
          onCategoryPress={handleCategoryPress}
          onClearSearch={handleClearSearch}
          isLoading={isSearching}
        />
      ) : (
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <CustomCarousel data={DATA} />


          <HomeSeeAll title='Category' onPress={() => (navigation as any).navigate('category')} />
          <FlatList
            scrollEnabled={false}
            data={productCategoriesData?.slice(0, 8)}
            keyExtractor={(item) => item?.id.toString() + item?.name}
            numColumns={4}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 8,
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => (
              <CategoryItem
                icon={Icons[transformIconName(item?.icon)] || Icons['fi-rr-cube']}
                title={item?.name}
                onPress={() => handleProductListDataRequest(item?.id, item?.name)}
              />
            )}
          />


          <HomeSeeAll title='Most Popular' onPress={() => (navigation as any).navigate('mostpopular')} />
          <CategoryChips />
          <FlatList
            scrollEnabled={false}
            data={getProductsListData?.data?.slice(0, 4)}
            keyExtractor={(item) => item.id.toString() + item.title}
            numColumns={2}
            contentContainerStyle={{
              paddingTop: 8,
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => (
              <ProductCard
                title={item?.name}
                price={item?.price}
                oldPrice={item?.original_price}
                reviews_count={item?.reviews_count}
                image={{ uri: item?.image_url }}
                isFavorite={item?.isFavorite}
                product={item}
              // onAddToCart={handleAddToCart}
              />
            )}
          />

          <PromoBanner itemImg={products[0]?.image} />

          <HomeSeeAll title='Featured products' onPress={() => console.log('Featured products')} />
          <FlatList
            data={products}
            horizontal
            keyExtractor={(item) => item.id.toString() + item.title}
            contentContainerStyle={{
              paddingTop: 8,
            }}
            renderItem={({ item }) => (
              <ProductCard
                title={item?.title}
                price={item?.price}
                oldPrice={item?.originalPrice}
                offer={item?.discount}
                image={{ uri: item?.image }}
                isFavorite={item?.isFavorite}
                product={item}
              // onAddToCart={handleAddToCart}
              />
            )}
          />

          <SummerSaleBanner />

        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;