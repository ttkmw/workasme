import { createSlice } from '@reduxjs/toolkit';


const initialTimeState = {
  timeSnippets: []
};

export const timeSlice = createSlice({
  name: "time",
  initialState: initialTimeState,
  reducers: {
    addTime: (state, action) => {
      // @ts-ignore
      state.timeSnippets.push(action.payload)
    }
  }
});

export const selectTime = (state:any) => state.time.timeSnippets;

export const {addTime} = timeSlice.actions;


export default timeSlice.reducer;
