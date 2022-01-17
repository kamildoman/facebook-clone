import { combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
  commentState: commentReducer,
});

export default rootReducer;
