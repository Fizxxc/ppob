import { createSlice } from '@reduxjs/toolkit';
import { getProfileAction } from '../actions/profile';

const initialState = {
  data: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default profileSlice.reducer;
