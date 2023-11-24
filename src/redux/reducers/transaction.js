import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: ''
};

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (state, action) =>{
      state.data = action.payload;
    }
  }
});

export const {setTransaction} = transaction.actions;
export default transaction.reducer;