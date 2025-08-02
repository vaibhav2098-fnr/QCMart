import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  Animated,
} from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { useNavigation } from '@react-navigation/native';
import { addPromoScreenStyles } from './add-promo-styles';
import CustomButton from '../../components/custom-Button/button';
import SingleRadioButton from '../../components/custom-RadioButton/single-radio-button';
import { useDispatch, useSelector } from 'react-redux';
import { selectPromo } from '../../redux/reducers/common';
import { RootState } from '../../redux/reducers';
import { IMG } from '../../assets/qcImages/qxImages';
import CustomInput from '../../components/custom-Input/input-field';

interface PromoOption {
  id: string;
  title: string;
  description: string;
  discount: number;
  isSelected: boolean;
}

const AddPromoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { promoOptions } = useSelector((state: RootState) => state.commonReducer);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredPromos, setFilteredPromos] = useState<PromoOption[]>(promoOptions);

  const searchAnim = useRef(new Animated.Value(0)).current;

  // Animate in/out the search bar
  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: searchVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [searchVisible]);

  // Filter logic
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredPromos(promoOptions);
    } else {
      const filtered = promoOptions.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPromos(filtered);
    }
  }, [searchText, promoOptions]);

  const handleBackPress = () => navigation.goBack();

  const handlePromoSelect = (selectedId: string) => {
    dispatch(selectPromo(selectedId));
  };

  const handleApply = () => {
    const selectedPromo = promoOptions.find(promo => promo.isSelected);
    if (selectedPromo) navigation.goBack();
  };

  const renderPromoOption = (promo: PromoOption) => (
    <TouchableOpacity
      key={promo.id}
      style={addPromoScreenStyles.promoOptionCard}
      onPress={() => handlePromoSelect(promo.id)}
    >
      <View style={addPromoScreenStyles.promoOptionContent}>
        <View style={addPromoScreenStyles.promoIconContainer}>
          <Image
            source={IMG['QC-mart-promo-card']}
            style={addPromoScreenStyles.promoIconInner}
          />
        </View>

        <View style={addPromoScreenStyles.promoDetails}>
          <Text style={addPromoScreenStyles.promoTitle}>{promo.title}</Text>
          <Text style={addPromoScreenStyles.promoDescription}>{promo.description}</Text>
        </View>

        <SingleRadioButton
          selected={promo.isSelected}
          onPress={() => handlePromoSelect(promo.id)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={addPromoScreenStyles.container}>
      <StatusBar backgroundColor="#25D366" barStyle="light-content" />

      {/* Header */}
      <View style={addPromoScreenStyles.header}>
        <TouchableOpacity style={addPromoScreenStyles.backButton} onPress={handleBackPress}>
          <Image source={Icons['fi-rr-angle-left']} style={addPromoScreenStyles.backIcon} />
        </TouchableOpacity>

        <Text style={addPromoScreenStyles.headerTitle}>Add Promo</Text>

        <TouchableOpacity
          style={addPromoScreenStyles.searchButton}
          onPress={() => {
            if (searchVisible) {
              setSearchText('');
            }
            setSearchVisible(!searchVisible);
          }}
        >
          <Image
            source={Icons[searchVisible ? 'fi-rr-cross' : 'fi-rr-search']}
            style={addPromoScreenStyles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 🔍 Animated Search Bar */}
      <Animated.View
        style={{
          height: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, moderateScale(60)],
          }),
          overflow: 'hidden',
          marginHorizontal: moderateScale(16),
          borderWidth: 0,
        }}
      >
        <CustomInput
          customPlaceholder='Search promo...'
          value={searchText}
          secureTextEntry={false}
          onChangeText={setSearchText}
          leftIcon={<></>}
          rightIcon={<></>}
        />
      </Animated.View>

      {/* List */}
      <ScrollView style={addPromoScreenStyles.content} showsVerticalScrollIndicator={false}>
        {filteredPromos.map(renderPromoOption)}
      </ScrollView>

      {/* Footer */}
      <View style={addPromoScreenStyles.footer}>
        <CustomButton
          title="Apply"
          onPress={handleApply}
          containerStyle={addPromoScreenStyles.applyButton}
          textStyle={addPromoScreenStyles.applyText}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddPromoScreen;
