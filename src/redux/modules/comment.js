// action value
export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

// 초기값
const initialState = [];

// 리듀서
const comment = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload];
    case REMOVE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload);
    default:
      return state;
  }
};

export default comment;
