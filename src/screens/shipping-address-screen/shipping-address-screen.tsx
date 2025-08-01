import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { moderateScale } from '../../utils/deviceConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { shippingAddressScreenStyles } from './shipping-address-styles';
import CustomButton from '../../components/custom-Button/button';
import SingleRadioButton from '../../components/custom-RadioButton/single-radio-button';
import { useDispatch, useSelector } from 'react-redux';
import { selectShippingAddress, addShippingAddress } from '../../redux/reducers/common';
import { RootState } from '../../redux/reducers';

interface ShippingAddress {
  id: number;
  type: string;
  address: string;
  isSelected: boolean;
}

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { shippingAddresses } = useSelector((state: RootState) => state.commonReducer);

  // Modal state for adding new address
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddressType, setNewAddressType] = useState('');
  const [newAddressText, setNewAddressText] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddressSelect = (selectedId: number) => {
    dispatch(selectShippingAddress(selectedId));
  };

  const handleAddNewAddress = () => {
    setModalVisible(true);
  };

  const handleSaveNewAddress = () => {
    if (newAddressType.trim() === '' || newAddressText.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newAddress: ShippingAddress = {
      id: shippingAddresses.length + 1,
      type: newAddressType.trim(),
      address: newAddressText.trim(),
      isSelected: false,
    };

    dispatch(addShippingAddress(newAddress));
    setNewAddressType('');
    setNewAddressText('');
    setModalVisible(false);
  };

  const handleCancelNewAddress = () => {
    setNewAddressType('');
    setNewAddressText('');
    setModalVisible(false);
  };

  const handleApply = () => {
    const selectedAddress = shippingAddresses.find(addr => addr.isSelected);
    if (selectedAddress) {
      // Navigate back to checkout screen
      navigation.goBack();
    }
  };

  const renderAddressItem = ({ item }: { item: ShippingAddress }) => (
    <TouchableOpacity
      style={shippingAddressScreenStyles.addressCard}
      onPress={() => handleAddressSelect(item.id)}
    >
      <View style={shippingAddressScreenStyles.addressIconContainer}>
        <View style={shippingAddressScreenStyles.addressIconSubContainer}>
          <Image
            source={Icons['fi-rr-location-alt']}
            style={shippingAddressScreenStyles.addressIcon}
          />
        </View>
      </View>
      
      <View style={shippingAddressScreenStyles.addressDetails}>
        <Text style={shippingAddressScreenStyles.addressType}>
          {item.type}
        </Text>
        <Text style={shippingAddressScreenStyles.addressText}>
          {item.address}
        </Text>
      </View>
      
      <SingleRadioButton
        selected={item.isSelected}
        onPress={() => handleAddressSelect(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={shippingAddressScreenStyles.container}>
      <StatusBar backgroundColor="#25D366" barStyle="light-content" />
      
      {/* Header */}
      <View style={shippingAddressScreenStyles.header}>
        <TouchableOpacity
          style={shippingAddressScreenStyles.backButton}
          onPress={handleBackPress}
        >
          <Image
            source={Icons['fi-rr-angle-left']}
            style={shippingAddressScreenStyles.backIcon}
          />
        </TouchableOpacity>
        
        <Text style={shippingAddressScreenStyles.headerTitle}>Shipping Address</Text>
        
        <View style={shippingAddressScreenStyles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={shippingAddressScreenStyles.content}>
        <FlatList
          data={shippingAddresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={shippingAddressScreenStyles.addressList}
          showsVerticalScrollIndicator={false}
        />
        
        {/* Add New Address Button */}
        <TouchableOpacity
          style={shippingAddressScreenStyles.addNewAddressButton}
          onPress={handleAddNewAddress}
        >
          <Text style={shippingAddressScreenStyles.addNewAddressText}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer - Apply Button */}
      <View style={shippingAddressScreenStyles.footer}>
        <CustomButton
          title="Apply"
          onPress={handleApply}
          containerStyle={shippingAddressScreenStyles.applyButton}
          textStyle={shippingAddressScreenStyles.applyButtonText}
        />
      </View>

      {/* Add New Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelNewAddress}
      >
        <View style={shippingAddressScreenStyles.modalOverlay}>
          <View style={shippingAddressScreenStyles.modalContainer}>
            <Text style={shippingAddressScreenStyles.modalTitle}>Add New Address</Text>
            
            <View style={shippingAddressScreenStyles.inputContainer}>
              <Text style={shippingAddressScreenStyles.inputLabel}>Address Type</Text>
              <TextInput
                style={shippingAddressScreenStyles.textInput}
                placeholder="e.g., Home, Office, Apartment"
                value={newAddressType}
                onChangeText={setNewAddressType}
                placeholderTextColor="#999"
              />
            </View>

            <View style={shippingAddressScreenStyles.inputContainer}>
              <Text style={shippingAddressScreenStyles.inputLabel}>Full Address</Text>
              <TextInput
                style={[shippingAddressScreenStyles.textInput, shippingAddressScreenStyles.multilineInput]}
                placeholder="Enter your complete address"
                value={newAddressText}
                onChangeText={setNewAddressText}
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={shippingAddressScreenStyles.modalButtonContainer}>
              <CustomButton
                title="Cancel"
                onPress={handleCancelNewAddress}
                containerStyle={shippingAddressScreenStyles.cancelModalButton}
                textStyle={shippingAddressScreenStyles.cancelModalButtonText}
              />
              <CustomButton
                title="Save"
                onPress={handleSaveNewAddress}
                containerStyle={shippingAddressScreenStyles.saveModalButton}
                textStyle={shippingAddressScreenStyles.saveModalButtonText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShippingAddressScreen; 