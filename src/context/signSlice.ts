import { createSlice } from '@reduxjs/toolkit';

const initialSignState = {
  status: 'SignedIn',
  isSigned: true
};

export const signSlice = createSlice({
  name: 'sign',
  initialState: initialSignState,
  reducers: {
    signIn: (state) => {
      state.status = 'SignedIn';
      state.isSigned = true;
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

export const {signIn, signOut, signUp}  = signSlice.actions;

export default signSlice.reducer;
