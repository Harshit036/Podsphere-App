const reducer = (state = "", action) => {
  if (action.type === "updateuserid") {
    console.log("action payload is ", typeof action.payload);
    console.log("state typpe is ", typeof state);
    return (state = action.payload);
  } else {
    return state;
  }
};

export default reducer;
