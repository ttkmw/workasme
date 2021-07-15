import { createSlice } from '@reduxjs/toolkit';

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    value: ''
  },
  reducers: {
    passwordSignIn: (state,
      action) => {
      state.value = action.payload;
    }
  }
});

export const {passwordSignIn} = passwordSlice.actions;

export const selectPassword = (state: any) => state.password.value;

export default passwordSlice.reducer;
