import { combineReducers } from 'redux'
import signReducer from "src/context/redux/signSlice";
import timeReducer from "src/context/redux/timeSlice";
import usernameReducer from "src/context/redux/usernameSlice";
import passwordReducer from "src/context/redux/passwordSlice";

const rootReducer = combineReducers({
  sign: signReducer,
  time: timeReducer,
  username: usernameReducer,
  password: passwordReducer,
})

export default rootReducer;
