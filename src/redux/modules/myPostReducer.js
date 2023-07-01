export const myPosts = (payload) => {
  return {
    type: "GET_MY_POSTS",
    payload,
  };
};

const initialState = [{ photoURL: "", postBody: "", postDate: "", postId: "", postTitle: "", postWhoLiked: [], uid: "" }];

const myPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_POSTS":
      return action.payload;

    default:
      return state;
  }
};

export default myPostsReducer;
