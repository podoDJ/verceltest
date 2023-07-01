import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";
import logReducer from "../modules/logReducer";
import posts from "../modules/postWrite";
import thunk from "redux-thunk";
import comment from "../modules/comment";
import profileReducer from "../modules/profileReducer";
import myPostsReducer from "../modules/myPostReducer";

const rootReducer = combineReducers({
  tempReducer,
  logReducer,
  posts,
  comment,
  profileReducer,
  myPostsReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
