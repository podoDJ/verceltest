import { createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";


const rootReducer = combineReducers({
  tempReducer,
}) 
const store = createStore(rootReducer)

export default store;