const reducer = (state = 0, action) => {
  if (action.type === "updateisplaying") {
    return (state = action.payload);
  } else {
    return state;
  }
};

export default reducer;
