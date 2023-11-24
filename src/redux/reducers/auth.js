import { createSlice } from '@reduxjs/toolkit';
import { asyncLoginAction, asyncRegisterAction } from '../actions/auth';


const initialState = {
  token: '',
  errorMessage: '',
  warningMessage: '',
  successMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setErrorMessage: (state, action)=>{
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action)=>{
      state.successMessage = action.payload;
    },
    setWarningMessage: (state, action)=>{
      state.warningMessage = action.payload;
    },
    clearMessage: (state) =>{
      state.errorMessage= '';
      state.warningMessage= '';
    },
    logout: ()=>{
      return initialState;
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(asyncLoginAction.rejected, (state, action)=>{
      if(typeof action.payload === 'string'){
        state.errorMessage = action.payload;
      }
    });

    builder.addCase(asyncLoginAction.fulfilled, (state, action)=>{
      console.log(action.payload.message);
      state.token = action.payload.data;
      state.successMessage = action.payload.message;
    });
    builder.addCase(asyncRegisterAction.rejected, (state, action)=>{
      if(typeof action.payload === 'string'){
        state.errorMessage = action.payload;
      }
    });

    builder.addCase(asyncRegisterAction.fulfilled, (state, action)=>{
      state.successMessage = action.payload.message;
    });
  }
}); 

export const {logout, setErrorMessage, setWarningMessage, clearMessage, successMessage} = authSlice.actions;
export default authSlice.reducer; 