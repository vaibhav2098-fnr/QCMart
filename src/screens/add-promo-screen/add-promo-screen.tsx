import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
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

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePromoSelect = (selectedId: string) => {
    dispatch(selectPromo(selectedId));
  };

  const handleApply = () => {
    const selectedPromo = promoOptions.find(promo => promo.isSelected);
    if (selectedPromo) {
      // Navigate back to checkout screen
      navigation.goBack();
    }
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
          <Text style={addPromoScreenStyles.promoDescription}>
            {promo.description}
          </Text>
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
        <TouchableOpacity
          style={addPromoScreenStyles.backButton}
          onPress={handleBackPress}
        >
          <Image
            source={Icons['fi-rr-angle-left']}
            style={addPromoScreenStyles.backIcon}
          />
        </TouchableOpacity>

        <Text style={addPromoScreenStyles.headerTitle}>Add Promo</Text>

        <TouchableOpacity style={addPromoScreenStyles.searchButton}>
          <Image
            source={Icons['fi-rr-search']}
            style={addPromoScreenStyles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={addPromoScreenStyles.content} showsVerticalScrollIndicator={false}>
        {promoOptions.map(renderPromoOption)}
      </ScrollView>

      {/* Footer - Apply Button */}
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