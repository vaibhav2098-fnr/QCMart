import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { transformIconName } from '../../utils/helper';
import ProductCard from '../custom-ProductCard/product-Card';
import CategoryItem from '../custom-category/custom-category';

interface SearchResultsProps {
  searchQuery: string;
  products: any[];
  categories: any[];
  onCategoryPress: (category: any) => void;
  onClearSearch: () => void;
  isLoading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  products,
  categories,
  onCategoryPress,
  onClearSearch,
  isLoading = false,
}) => {
  const renderProductItem = ({ item }: { item: any }) => (
    <ProductCard
      title={item?.name || item?.title}
      price={item?.price}
      oldPrice={item?.original_price || item?.originalPrice}
      reviews_count={item?.reviews_count}
      image={{ uri: item?.image_url || item?.image }}
      isFavorite={item?.isFavorite}
      product={item}
    />
  );

  const renderCategoryItem = ({ item }: { item: any }) => (
    <CategoryItem
      icon={Icons[transformIconName(item?.icon)] || Icons['fi-rr-cube']}
      title={item?.name}
      onPress={() => onCategoryPress(item)}
    />
  );

  const renderSectionHeader = (title: string, count: number) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>({count})</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={Icons['fi-rr-search']} 
        style={styles.emptyIcon}
        tintColor="#9CA3AF"
      />
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptySubtitle}>
        Try searching with different keywords or browse our categories
      </Text>
      <TouchableOpacity style={styles.clearButton} onPress={onClearSearch}>
        <Text style={styles.clearButtonText}>Clear Search</Text>
      </TouchableOpacity>
    </View>
  );

  const hasResults = products.length > 0 || categories.length > 0;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Searching...</Text>
      </View>
    );
  }

  if (!hasResults && searchQuery.length > 0) {
    return renderEmptyState();
  }

  return (
    <View style={styles.container}>
      {searchQuery.length > 0 && (
        <View style={styles.searchHeader}>
          <Text style={styles.searchQuery}>
            Search results for "{searchQuery}"
          </Text>
          <TouchableOpacity onPress={onClearSearch}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {categories.length > 0 && (
        <View style={styles.section}>
          {renderSectionHeader('Categories', categories.length)}
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => `category-${item.id}`}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.categoryList}
            columnWrapperStyle={styles.categoryRow}
          />
        </View>
      )}

      {products.length > 0 && (
        <View style={styles.section}>
          {renderSectionHeader('Products', products.length)}
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => `product-${item.id}`}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productList}
            columnWrapperStyle={styles.productRow}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchQuery: {
    fontSize: moderateScale(14),
    color: '#374151',
    fontWeight: '500',
  },
  clearText: {
    fontSize: moderateScale(14),
    color: '#3B82F6',
    fontWeight: '500',
  },
  section: {
    marginBottom: moderateScale(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111827',
  },
  sectionCount: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    marginLeft: moderateScale(8),
  },
  categoryList: {
    paddingHorizontal: moderateScale(12),
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  productList: {
    paddingHorizontal: moderateScale(16),
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(32),
  },
  emptyIcon: {
    width: moderateScale(64),
    height: moderateScale(64),
    marginBottom: moderateScale(16),
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#111827',
    marginBottom: moderateScale(8),
  },
  emptySubtitle: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(24),
  },
  clearButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  clearButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});

export default SearchResults; 