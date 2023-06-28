import Router from "./shared/Router";
import { auth } from "./firebase";
// yarn install --force  (모듈강제설치)
// yarn add redux react-redux styled-components shortid firebase react-router-dom
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logChange } from "./redux/modules/logReducer";

function App() {
  // const auth = getAuth();
  // const dispatch = useDispatch();
  // auth.currentUser ? dispatch(logChange(true)) : dispatch(logChange(false));

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
