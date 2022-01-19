const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      if (action.user) {
        localStorage.setItem("user", action.user.uid);
        return {
          ...state,
          user: action.user,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default userReducer;
