const reducer = (state = 0, action) => {
  if (action.type === "updatetrackindex") {
    return (state = action.payload);
  } else {
    return state;
  }
};

export default reducer;
