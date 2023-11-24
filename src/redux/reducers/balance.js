import { createSlice } from '@reduxjs/toolkit';
import { getBalanceAction } from '../actions/balance';

const initialState = {
  data: {},
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalanceAction.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default balanceSlice.reducer;
