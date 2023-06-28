import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";
import logReducer from "../modules/logReducer";
import posts from "../modules/postWrite";
import profileReducer from "../../components/mypage/ProfileReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tempReducer,
  logReducer,
  posts,
  profile: profileReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
