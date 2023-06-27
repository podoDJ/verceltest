import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import tempReducer from "../modules/temp";
import profileReducer from "../../components/mypage/ProfileReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  temp: tempReducer,
  profile: profileReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
