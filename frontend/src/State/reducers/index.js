import { combineReducers } from "redux";
import isPlayingReducer from "./isPlayingReducer.js";
import trackindexReducer from "./trackindexReducer";
import userIdReducer from "./userIdReducer.js";

const reducers = combineReducers({
  trackIndex: trackindexReducer,
  isPlaying: isPlayingReducer,
  userId: userIdReducer,
});

export default reducers;
