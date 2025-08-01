import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedShippingAddress: {
    type: 'Home',
    address: '61480 Sunbrook park, PC 5679',
  },
  shippingAddresses: [
    {
      id: 1,
      type: 'Home',
      address: '61480 Sunbrook park, PC 5679',
      isSelected: true,
    },
    {
      id: 2,
      type: 'Office',
      address: '123 Business Center, Suite 456, PC 1234',
      isSelected: false,
    },
    {
      id: 3,
      type: 'Apartment',
      address: '789 Downtown Ave, Apt 101, PC 5678',
      isSelected: false,
    },
    {
      id: 4,
      type: "Parent's House",
      address: '456 Family Street, PC 9012',
      isSelected: false,
    },
  ],
  selectedShippingOption: {
    id: '1',
    name: 'Economy',
    estimatedArrival: 'Dec 20-06-2025',
    cost: 25,
    isSelected: true,
  },
  shippingOptions: [
    {
      id: '1',
      name: 'Economy',
      estimatedArrival: 'Dec 20-06-2025',
      cost: 25,
      isSelected: true,
    },
    {
      id: '2',
      name: 'Regular',
      estimatedArrival: 'Dec 20-06-2025',
      cost: 20,
      isSelected: false,
    },
    {
      id: '3',
      name: 'Cargo',
      estimatedArrival: 'Dec 20-06-2025',
      cost: 35,
      isSelected: false,
    },
    {
      id: '4',
      name: 'Express',
      estimatedArrival: 'Dec 20-06-2025',
      cost: 15,
      isSelected: false,
    },
  ],
  selectedPromo: null,
  promoOptions: [
    {
      id: '1',
      title: 'Special 25% Off',
      description: 'Special Promo Only Today!',
      discount: 25,
      isSelected: false,
    },
    {
      id: '2',
      title: 'Discount 30% Off',
      description: 'New User Special Promo',
      discount: 30,
      isSelected: true,
    },
    {
      id: '3',
      title: 'Special 25% Off',
      description: 'Special Promo Only Today!',
      discount: 25,
      isSelected: false,
    },
    {
      id: '4',
      title: 'Discount 40% Off',
      description: 'Special Promo Only Today!',
      discount: 40,
      isSelected: false,
    },
    {
      id: '5',
      title: 'Special 35% Off',
      description: 'Special Promo Only Today!',
      discount: 35,
      isSelected: false,
    },
  ],
};

export const commonSlice = createSlice({
  name: 'commonReducer',
  initialState,
  reducers: {
    // Update selected shipping address
    updateSelectedShippingAddress: (state, action) => {
      state.selectedShippingAddress = action.payload;
    },
    
    // Update shipping addresses list
    updateShippingAddresses: (state, action) => {
      state.shippingAddresses = action.payload;
    },
    
    // Select shipping address by ID
    selectShippingAddress: (state, action) => {
      const selectedId = action.payload;
      state.shippingAddresses = state.shippingAddresses.map(address => ({
        ...address,
        isSelected: address.id === selectedId,
      }));
      
      // Update selected shipping address
      const selectedAddress = state.shippingAddresses.find(address => address.id === selectedId);
      if (selectedAddress) {
        state.selectedShippingAddress = {
          type: selectedAddress.type,
          address: selectedAddress.address,
        };
      }
    },
    
    // Add new shipping address
    addShippingAddress: (state, action) => {
      const newAddress = action.payload;
      state.shippingAddresses.push(newAddress);
    },
    
    // Update selected shipping option
    updateSelectedShippingOption: (state, action) => {
      state.selectedShippingOption = action.payload;
    },
    
    // Update shipping options (for Choose Shipping screen)
    updateShippingOptions: (state, action) => {
      state.shippingOptions = action.payload;
    },
    
    // Select shipping option by ID
    selectShippingOption: (state, action) => {
      const selectedId = action.payload;
      state.shippingOptions = state.shippingOptions.map(option => ({
        ...option,
        isSelected: option.id === selectedId,
      }));
      
      // Update selected shipping option
      const selectedOption = state.shippingOptions.find(option => option.id === selectedId);
      if (selectedOption) {
        state.selectedShippingOption = selectedOption;
      }
    },
    
    // Select promo by ID
    selectPromo: (state, action) => {
      const selectedId = action.payload;
      state.promoOptions = state.promoOptions.map(promo => ({
        ...promo,
        isSelected: promo.id === selectedId,
      }));
      
      // Update selected promo
      const selectedPromo = state.promoOptions.find(promo => promo.id === selectedId);
      if (selectedPromo) {
        state.selectedPromo = selectedPromo;
      }
    },
    
    // Update promo options
    updatePromoOptions: (state, action) => {
      state.promoOptions = action.payload;
    },
    
    // Clear selected promo
    clearSelectedPromo: (state) => {
      state.selectedPromo = null;
      state.promoOptions = state.promoOptions.map(promo => ({
        ...promo,
        isSelected: false,
      }));
    },
    
    // Reset common state
    resetCommonState: (state) => {
      state.selectedShippingAddress = initialState.selectedShippingAddress;
      state.shippingAddresses = initialState.shippingAddresses;
      state.selectedShippingOption = initialState.selectedShippingOption;
      state.shippingOptions = initialState.shippingOptions;
      state.selectedPromo = initialState.selectedPromo;
      state.promoOptions = initialState.promoOptions;
    },
  },
});

export const {
  updateSelectedShippingAddress,
  updateShippingAddresses,
  selectShippingAddress,
  addShippingAddress,
  updateSelectedShippingOption,
  updateShippingOptions,
  selectShippingOption,
  selectPromo,
  updatePromoOptions,
  clearSelectedPromo,
  resetCommonState,
} = commonSlice.actions;

export default commonSlice.reducer; 