import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';
import ProductCard from '../../components/custom-ProductCard/product-Card';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

interface Product {
  id: number;
  slug: string;
  name: string;
  sku: string;
  description: string;
  content: string;
  quantity: number;
  is_out_of_stock: boolean;
  stock_status_label: string;
  stock_status_html: string;
  price: number;
  price_formatted: string;
  original_price: number;
  original_price_formatted: string;
  reviews_avg: number | null;
  reviews_count: number;
  image_with_sizes: {
    origin: string[];
    thumb: string[];
    medium: string[];
    small: string[];
  };
  weight: number;
  height: number;
  wide: number;
  length: number;
  image_url: string;
  product_options: any[];
  store: {
    id: number;
    slug: string;
    name: string;
  };
}

interface ProductCategoriesScreenProps {
  route?: {
    params?: {
      categoryId?: number;
      categoryName?: string;
    };
  };
}

const ProductCategoriesScreen: React.FC<ProductCategoriesScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const categoryId = route?.params?.categoryId;
  const categoryName = route?.params?.categoryName || 'Products';
  const {categoriesProductListDataData} = useSelector((state: RootState) => state.categoriesProductListDataDataReducer);

  const fetchProducts = async (page: number = 1, isRefresh: boolean = false) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      if (categoriesProductListDataData?.error) {
        console.error('API Error:', categoriesProductListDataData?.message);
        return;
      }

      if (isRefresh) {
        setProducts(categoriesProductListDataData?.data);
        setCurrentPage(1);
      } else {
        setProducts(prev => [...prev, ...categoriesProductListDataData?.data]);
        setCurrentPage(page);
      }
      setHasMoreData(categoriesProductListDataData?.meta?.current_page < categoriesProductListDataData?.meta?.last_page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(1, true);
  };

  const loadMoreProducts = () => {
    if (!loading && hasMoreData) {
      fetchProducts(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchProducts(1, true);
  }, [categoryId]);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      title={item.name}
      price={item.price}
      oldPrice={item.original_price}
      offer={`${Math.round(((item.original_price - item.price) / item.original_price) * 100)}% OFF`}
      image={{ uri: item.image_url }}
      isFavorite={false}
      product={item}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={Icons['fi-rr-angle-left']} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{categoryName}</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image source={Icons['fi-rr-box']} style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptyMessage}>
        We couldn't find any products in this category. Please try again later.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {renderHeader()}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={!loading ? renderEmptyState : null}
        ListFooterComponent={
          loading && products?.length > 0 ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading more products...</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: moderateScale(8),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: '#374151',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: moderateScale(40),
  },
  productList: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(32),
    paddingTop: moderateScale(100),
  },
  emptyIcon: {
    width: moderateScale(64),
    height: moderateScale(64),
    tintColor: '#D1D5DB',
    marginBottom: moderateScale(16),
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#374151',
    marginBottom: moderateScale(8),
  },
  emptyMessage: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  loadingContainer: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
  },
  loadingText: {
    fontSize: moderateScale(14),
    color: '#6B7280',
  },
});

export default ProductCategoriesScreen; 