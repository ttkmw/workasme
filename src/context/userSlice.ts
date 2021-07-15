import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  username: null,
  password: null,
  isSigned: true,
  status: "Initialized"
};

// todo: 추후에 액션에 페이로드 여러 값 넣어도 되게...
export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    signIn: (state,
             action) => {
      const {username, password} = action.payload;
      state.username = username;
      state.password = password;
      state.isSigned = true;
      state.status = "Initialized";
    }
  }
});

export const selectSign = (state: any) => state.user.isSigned;

export const {signIn} = userSlice.actions;

export default userSlice.reducer;
