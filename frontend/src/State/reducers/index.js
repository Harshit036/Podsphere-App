import { combineReducers } from "redux";
import isPlayingReducer from "./isPlayingReducer.js";
import trackindexReducer from "./trackindexReducer";

const reducers = combineReducers({
  trackIndex: trackindexReducer,
  isPlaying: isPlayingReducer,
});

export default reducers;
