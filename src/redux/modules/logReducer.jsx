//진솔님파트-로그인상태에 따라 헤더변경
const LOG_CHANGE = "LOG_CHANGE";

export const logChange = (payload) => {
  return {
    type: LOG_CHANGE,
    payload,
  };
};

const initialState = { isLogin: false };

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_CHANGE:
      return { ...state, isLogin: action.payload };

    default:
      return state;
  }
};

export default logReducer;
