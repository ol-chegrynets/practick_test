import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeInfo,
  fetchLatestSymbols,
} from './operrations';

const initialState = {
  baseCurrency: '',
  isLoading: false,
  isError: null,
  exchangeInfo: null,
  rates: [],
};

const handlePending = state => {
  state.isLoading = true;
  state.isError = null;
};
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(fetchExchangeInfo.pending, handlePending)
      .addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = payload;
      })
      .addCase(fetchExchangeInfo.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
        state.exchangeInfo = null;
      })
      .addCase(fetchLatestSymbols.pending, handlePending)
      .addCase(fetchLatestSymbols.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.rates = payload;
      })
      .addCase(fetchLatestSymbols.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
        state.rates = null;
      }),
});

export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
