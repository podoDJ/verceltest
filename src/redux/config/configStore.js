import { createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";
import logReducer from "../modules/logReducer";


const rootReducer = combineReducers({
  tempReducer,
  logReducer,
  posts,
}) 
const store = createStore(rootReducer)

export default store;
