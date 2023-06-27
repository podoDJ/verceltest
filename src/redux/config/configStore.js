import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";
import logReducer from "../modules/logReducer";
import profileReducer from "../../components/mypage/ProfileReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tempReducer,
  logReducer,
  profileReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
