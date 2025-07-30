import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HomeHeader from './home-header/home-header';
import { statusBarHeight } from '../../utils/helper';
import { moderateScale } from '../../utils/deviceConfig';
import CustomInput from '../../components/custom-Input/input-field';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomCarousel from '../../components/custom-Carousel/carousel';
import { DATA, categoryData, products } from './dummy-data';
import CategoryItem from '../../components/custom-category/custom-category';
import HomeSeeAll from './home-see-all/home-see-all';
import ProductCard from '../../components/custom-ProductCard/product-Card';
import { IMG } from '../../assets/qcImages/qxImages';
import PromoBanner from './home-promo-banner/home-promo-banner';
import SummerSaleBanner from './home-summerSaleBanner/home-summerSaleBanner';
import { useNavigation } from '@react-navigation/native';
import CategoryChips from '../../components/custom-Chips/category-Chips';
import { useDispatch, useSelector } from 'react-redux';
import { productCategoriesDataRequest } from '../../redux/reducers/product-categories';
import { RootState } from '../../redux/reducers';

const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { productCategoriesData = [] } = useSelector((state: RootState) => state.productCategoriesDataReducer);

  useEffect(() => {
    dispatch(productCategoriesDataRequest({}));
  }, [dispatch]);

  const [Search, setSearch] = useState('')
  return (
    <View style={{ flex: 1, marginTop: statusBarHeight, paddingHorizontal: moderateScale(16), backgroundColor: '#fff', marginVertical: moderateScale(16) }}>
      <HomeHeader />
      <View style={{ marginVertical: moderateScale(8) }} />
      <CustomInput
        customPlaceholder='Search....'
        value={Search}
        secureTextEntry={false}
        onChangeText={(txt) => setSearch(txt)}
        leftIcon={<Image tintColor={'#8C949D'} source={Icons['fi-rr-search']} style={{ height: 24, width: 24, resizeMode: 'contain' }} />}
        rightIcon={<TouchableOpacity><Image source={Icons['fi-rr-filter']} style={{ height: 24, width: 24, resizeMode: 'contain' }} /></TouchableOpacity>}
      />
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <CustomCarousel data={DATA} />


        <HomeSeeAll title='Category' onPress={() => (navigation as any).navigate('category')} />
        <FlatList
          scrollEnabled={false}
          data={productCategoriesData?.slice(0,8)}
          keyExtractor={(item) => item.id.toString() + item.name}
          numColumns={4}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingTop: 8,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({ item }) => (
            <CategoryItem icon={item?.icon || Icons['fi-rr-camera']} title={item.name} onPress={() => console.log(item.name)} />
          )}
        />


        <HomeSeeAll title='Most Popular' onPress={() => (navigation as any).navigate('mostpopular')} />
        <CategoryChips />
        <FlatList
          scrollEnabled={false}
          data={products}
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
            />
          )}
        />

        <SummerSaleBanner />

      </ScrollView>
    </View>
  );
};

export default HomeScreen;