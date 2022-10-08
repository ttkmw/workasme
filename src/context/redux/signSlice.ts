import { createSlice } from '@reduxjs/toolkit';

const initialSignState = {
  status: 'SignedIn',
  isSigned: true,
  token: null
};

export const signSlice = createSlice({
  name: 'sign',
  initialState: initialSignState,
  reducers: {
    signIn: (state, action) => {
      state.status = 'SignedIn';
      state.isSigned = true;
      state.token = action.payload.accessToken
    },

    signOut: (state) => {
      state.status = 'SignedOut';
      state.isSigned = false;
    },

    signUp: (state) => {
      state.status = 'SignedUp';
      state.isSigned = true;
    }
  }
});

export const selectSign = (state: any) => state.sign.isSigned;
export const selectToken = (state: any) => state.sign.token;

export const {signIn, signOut, signUp}  = signSlice.actions;

export default signSlice.reducer;
