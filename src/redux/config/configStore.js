import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import logReducer from "../modules/logReducer";
import posts from "../modules/postWrite";
import thunk from "redux-thunk";
import comment from "../modules/comment";
import profile from "../modules/profileReducer";
import myPosts from "../modules/myPostReducer";

const rootReducer = combineReducers({
  logReducer,
  posts,
  comment,
  profile,
  myPosts,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
