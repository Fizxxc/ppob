import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const asyncLoginAction = createAsyncThunk(
  '/login',
  async (payload, {rejectWithValue})=>{
    try {
      const form = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password
      };
      const formJson = JSON.stringify(form);
      const {data} = await http().post('/login', formJson);
      return data;
    } catch (error) {
      const message = error?.response?.data?.message;
      if(error.code === 'ERR_NETWORK'){
        return rejectWithValue('Error: Conennecting to backend failed');
      }
      return rejectWithValue(message);
    }
  }
);

export const asyncRegisterAction = createAsyncThunk(
  '/registration',
  async (payload, {rejectWithValue})=>{
    try {
      const form = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password
      };
      const formJson = JSON.stringify(form);
      const {data} = await http().post('/registration', formJson);
      return data;
    } catch (error) {
      const results = error?.response?.data?.data;
      const message = error?.response?.data?.message;
      if(results){
        return rejectWithValue(results);
      }
      if(error.code === 'ERR_NETWORK'){
        return rejectWithValue('Error: Conennecting to backend failed');
      }
      return rejectWithValue(message);
    }
  }
);