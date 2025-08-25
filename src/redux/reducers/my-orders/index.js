import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ordersData: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
    from: 0,
    to: 0
  },
  hasMoreData: false
};

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    myOrdersDataRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    myOrdersDataSuccess: (state, action) => {
      state.loading = false;
      state.ordersData = action.payload || [];
      state.pagination = {
        currentPage: action.payload.meta?.current_page || 1,
        lastPage: action.payload.meta?.last_page || 1,
        perPage: action.payload.meta?.per_page || 10,
        total: action.payload.meta?.total || 0,
        from: action.payload.meta?.from || 0,
        to: action.payload.meta?.to || 0
      };
      state.hasMoreData = action.payload.meta?.current_page < action.payload.meta?.last_page;
    },
    myOrdersDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadMoreOrdersRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loadMoreOrdersSuccess: (state, action) => {
      state.loading = false;
      state.ordersData = [...state.ordersData, ...(action.payload.data || [])];
      state.pagination = {
        currentPage: action.payload.meta?.current_page || 1,
        lastPage: action.payload.meta?.last_page || 1,
        perPage: action.payload.meta?.per_page || 10,
        total: action.payload.meta?.total || 0,
        from: action.payload.meta?.from || 0,
        to: action.payload.meta?.to || 0
      };
      state.hasMoreData = action.payload.meta?.current_page < action.payload.meta?.last_page;
    },
    resetOrdersData: (state) => {
      state.ordersData = [];
      state.pagination = {
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0
      };
      state.hasMoreData = false;
    }
  }
});

export const {
  myOrdersDataRequest,
  myOrdersDataSuccess,
  myOrdersDataFailure,
  loadMoreOrdersRequest,
  loadMoreOrdersSuccess,
  resetOrdersData
} = myOrdersSlice.actions;

export default myOrdersSlice.reducer;
