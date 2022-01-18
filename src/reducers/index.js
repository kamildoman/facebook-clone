import { combineReducers } from "redux";

import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer,
  commentState: commentReducer,
  usersState: usersReducer,
});

export default rootReducer;
