export const updateTrackIndex = (trackIndex) => {
  return {
    type: "updatetrackindex",
    payload: trackIndex,
  };
};

export const updateIsPlaying = (isPlaying) => {
  return {
    type: "updateisplaying",
    payload: isPlaying,
  };
};

export const updateUserId = (userId) => {
  return {
    type: "updateuserid",
    payload: userId,
  };
};
