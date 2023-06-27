import { createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";
import posts from "../modules/postWrite";


const rootReducer = combineReducers({
  tempReducer,
  posts,
}) 
const store = createStore(rootReducer)

export default store;