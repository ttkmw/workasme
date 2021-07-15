import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({

  name: 'username',
  initialState: {
    value: ''
  },
  reducers: {
    usernameSignIn: (state,
             action) => {
      state.value = action.payload;
    }
  },
});

export const { usernameSignIn } = usernameSlice.actions;

export const selectUsername = (state: any) => state.username.value;

export default usernameSlice.reducer;
