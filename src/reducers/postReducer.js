export const initState = {
  posts: [],
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
