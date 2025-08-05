import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../utils/deviceConfig';
import { statusBarHeight } from '../../utils/helper';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomButton from '../../components/custom-Button/button';
import { styles } from './product-detail-styles';
import { addToCart } from '../../redux/reducers/cart';
import { useDispatch } from 'react-redux';

interface ProductDetailScreenProps {
  route?: {
    params?: {
      product?: any;
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState('teal');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch()
  // Mock product data - in real app this would come from route params
  const product = route?.params?.product || {
    // const product = {
    id: 1,
    title: 'HP 15, 13th Gen Intel Core i5-1335U',
    image: 'https://apiv2.exceldisc.com/media/7070/8299940f-3712-4a23-b648-d3c423efb639.png',
    price: 22056,
    originalPrice: 28000,
    discount: '20% OFF',
    soldCount: 9742,
    rating: 4.8,
    reviewCount: 4749,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    colors: [
      { name: 'brown', value: '#8B4513' },
      { name: 'teal', value: '#008080' },
      { name: 'grey', value: '#808080' },
    ],
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', { product, quantity, selectedColor });
    (navigation as any).navigate('MainTabs', { screen: 'Cart' });
    dispatch(addToCart(product));
    // Add to cart logic here
  };

  const totalPrice = product.price * quantity;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={Icons['fi-rr-angle-left']} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.imageSection}>
          <Image source={{ uri: product.image_url }} style={styles.productImage} resizeMode="contain" />
          
          {/* Image Carousel Dots */}
          {/* <View style={styles.carouselDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View> */}
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsSection}>
          {/* Product Title and Favorite */}
          <View style={styles.titleRow}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {product.name}
            </Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favoriteButton}>
              <Image 
                source={isFavorite ? Icons['fi-sr-heart'] : Icons['fi-rr-heart']} 
                style={[styles.favoriteIcon, { tintColor: isFavorite ? 'red' : '#ccc' }]} 
              />
            </TouchableOpacity>
          </View>

          {/* Sold Count and Rating */}
          <View style={styles.statsRow}>
            <View style={styles.soldBadge}>
              <Text style={styles.soldText}>{product.stock_status_label}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Image source={Icons['fi-rr-star']} style={styles.starIcon} />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewText}>({product.reviews_count} reviews)</Text>
            </View>
          </View>

          <View style={styles.divider}/>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Color Selection */}
          <View style={styles.colorSection}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {product?.colors?.map((color: any) => (
                <TouchableOpacity
                  key={color.name}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color.value },
                    selectedColor === color.name && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color.name)}
                >
                  {selectedColor === color.name && (
                    <Image source={Icons['fi-rr-check']} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(false)}
                disabled={quantity <= 1}
              >
                <Image source={Icons['fi-rr-minus']} style={styles.quantityIcon} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(true)}
              >
                <Image source={Icons['fi-rr-plus']} style={styles.quantityIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>₹{totalPrice}</Text>
        </View>
        <CustomButton
          title="Add To Cart"
          onPress={handleAddToCart}
          containerStyle={styles.addToCartButton}
          icons={<Image
            source={Icons['fi-rr-shopping-bag']}
            style={styles.checkoutIcon}
          />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

