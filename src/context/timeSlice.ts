import { createSlice } from '@reduxjs/toolkit';
import {TimeCategory} from "src/pages/management/sections/parts/dtos/TimeSnippet";


const initialTimeState = {
  timeSnippets: [{
    expectedActivity: "",
    expectedTime: "",
    acutualActivity: "",
    actuaTime: "",
    timeCategory: TimeCategory.ETC
  }]
};

export const timeSlice = createSlice({
  name: "time",
  initialState: initialTimeState,
  reducers: {
    addTime: (state, action) => {
      state.timeSnippets.push(action.payload)
    }
  }
});

export const selectTime = (state:any) => state.time.timeSnippets;

export const {addTime} = timeSlice.actions;


export default timeSlice.reducer;
