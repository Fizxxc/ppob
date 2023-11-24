import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const getProfileAction = createAsyncThunk('/profile', async (token, { rejectWithValue }) => {
  try {
    const { data } = await http(token).get('/profile');
    return data.data;
  } catch (err) {
    const message = err?.response?.data?.message;
    if (err.code === 'ERR_NETWORK') {
      return rejectWithValue('Error: Connection to Backend Failed!');
    }
    return rejectWithValue(message);
  }
});
