import { createSlice } from '@reduxjs/toolkit';

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    value: ''
  },
  reducers: {
    passwordSign: (state,
      action) => {
      state.value = action.payload;
    }
  }
});

export const {passwordSign} = passwordSlice.actions;

export const selectPassword = (state: any) => state.password.value;

export default passwordSlice.reducer;
