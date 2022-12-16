import React from "react";

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });

    default:
      break;
  }
};
export default reducer;
