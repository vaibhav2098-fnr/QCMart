import React, { useState, useMemo, useRef, useEffect } from 'react';
import CustomHeader from '../../components/custom-header/custom-header';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { statusBarHeight, transformIconName } from '../../utils/helper';
import { moderateScale } from '../../utils/deviceConfig';
import CategoryItem from '../../components/custom-category/custom-category';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomInput from '../../components/custom-Input/input-field';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [searchVisible, setSearchVisible] = useState(false); // 👈 toggle state
  const searchAnim = useRef(new Animated.Value(0)).current;

  const { productCategoriesData = [] } = useSelector(
    (state: RootState) => state.productCategoriesDataReducer
  );

  // 📦 Animate search bar
  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: searchVisible ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [searchVisible]);

  // 🔍 Filtered categories (case-insensitive match)
  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return productCategoriesData;
    return productCategoriesData.filter((item) =>
      item.name?.toLowerCase().includes(keyword)
    );
  }, [search, productCategoriesData]);

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
        title={'Categories'}
        onBack={() => navigation.goBack()}
        isShowSearch={true}
        onSearch={() => {
          if (searchVisible) setSearch(''); // optional: clear input
          setSearchVisible(!searchVisible);
        }}
        rightIcon={Icons[searchVisible ? 'fi-rr-cross' : 'fi-rr-search']}
      />

      {/* 🔍 Animated Search Input */}
      <Animated.View
        style={{
          height: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, moderateScale(60)],
          }),
          overflow: 'hidden',
          marginBottom: moderateScale(8),
        }}
      >
        <CustomInput
          customPlaceholder="Search..."
          value={search}
          secureTextEntry={false}
          onChangeText={(txt) => setSearch(txt)}
          leftIcon={<></>}
          rightIcon={<></>}
        />
      </Animated.View>

      {/* 📋 Filtered Category List */}
      <FlatList
        data={filteredCategories}
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
          <CategoryItem
            buttonStyle={{ marginHorizontal: moderateScale(6) }}
            icon={Icons[transformIconName(item?.icon)] || Icons['fi-rr-cube']}
            title={item.name}
            onPress={() => console.log(item.name)}
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: moderateScale(32) }}>
            <Image
              source={Icons['fi-rr-box']}
              style={{
                width: moderateScale(60),
                height: moderateScale(60),
                marginBottom: moderateScale(12),
              }}
            />
            <Text>No categories found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;
