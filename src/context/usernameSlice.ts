import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({

  name: 'username',
  initialState: {
    value: ''
  },
  reducers: {
    usernameSign: (state,
             action) => {
      state.value = action.payload;
    }
  },
});

export const { usernameSign } = usernameSlice.actions;

export const selectUsername = (state: any) => state.username.value;

export default usernameSlice.reducer;
