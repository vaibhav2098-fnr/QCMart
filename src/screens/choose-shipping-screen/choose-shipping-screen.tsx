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
import { chooseShippingScreenStyles } from './choose-shipping-styles';
import CustomButton from '../../components/custom-Button/button';
import SingleRadioButton from '../../components/custom-RadioButton/single-radio-button';
import { useDispatch, useSelector } from 'react-redux';
import { selectShippingOption } from '../../redux/reducers/common';
import { RootState } from '../../redux/reducers';

interface ShippingOption {
  id: string;
  name: string;
  estimatedArrival: string;
  cost: number;
  isSelected: boolean;
}

const ChooseShippingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { shippingOptions } = useSelector((state: RootState) => state.commonReducer);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleShippingOptionSelect = (selectedId: string) => {
    dispatch(selectShippingOption(selectedId));
  };

  const handleApply = () => {
    const selectedOption = shippingOptions.find(option => option.isSelected);
    if (selectedOption) {
      // Navigate back to checkout screen
      navigation.goBack();
    }
  };

  const renderShippingOption = (option: ShippingOption) => (
    <TouchableOpacity
      key={option.id}
      style={chooseShippingScreenStyles.shippingOptionCard}
      onPress={() => handleShippingOptionSelect(option.id)}
    >
      <View style={chooseShippingScreenStyles.shippingOptionContent}>
        <View style={chooseShippingScreenStyles.locationIconContainer}>
          <Image
            source={Icons['fi-rr-location-alt']}
            style={chooseShippingScreenStyles.locationIcon}
          />
        </View>

        <View style={chooseShippingScreenStyles.shippingDetails}>
          <Text style={chooseShippingScreenStyles.shippingName}>{option.name}</Text>
          <Text style={chooseShippingScreenStyles.estimatedArrival}>
            Estimated Arrival, {option.estimatedArrival}
          </Text>
        </View>

        <View style={chooseShippingScreenStyles.costContainer}>
          <Text style={chooseShippingScreenStyles.costText}>{option.cost}</Text>
        </View>

        <SingleRadioButton
          selected={option.isSelected}
          onPress={() => handleShippingOptionSelect(option.id)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={chooseShippingScreenStyles.container}>
      <StatusBar backgroundColor="#25D366" barStyle="light-content" />

      {/* Header */}
      <View style={chooseShippingScreenStyles.header}>
        <TouchableOpacity
          style={chooseShippingScreenStyles.backButton}
          onPress={handleBackPress}
        >
          <Image
            source={Icons['fi-rr-angle-left']}
            style={chooseShippingScreenStyles.backIcon}
          />
        </TouchableOpacity>

        <Text style={chooseShippingScreenStyles.headerTitle}>Choose Shipping</Text>

        <View style={chooseShippingScreenStyles.headerSpacer} />
      </View>

      <ScrollView style={chooseShippingScreenStyles.content} showsVerticalScrollIndicator={false}>
        {shippingOptions.map(renderShippingOption)}
      </ScrollView>

      {/* Footer - Apply Button */}
      <View style={chooseShippingScreenStyles.footer}>
        <CustomButton
          title="Apply"
          onPress={handleApply}
          containerStyle={chooseShippingScreenStyles.applyButton}
          textStyle={chooseShippingScreenStyles.applyText}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseShippingScreen; 