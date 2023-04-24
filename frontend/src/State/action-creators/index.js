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
