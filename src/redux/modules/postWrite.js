//action value
const SHOW_POSTS = "postWrite/SHOW_POSTS";
const SORT_LIKE_POSTS = "postWrite/SORT_LIKE_POSTS";

const ADD_POSTS = "postWrite/ADD_POSTS";
const DELETE_POSTS = "postWrite/DELETE_POSTS";
const UPDATE_POSTS = "postWrite/UPDATE_POSTS";
const UPDATE_POSTS_Like = "postWrite/UPDATE_POSTS_Like";

//action creater

export const showPosts = (payload) => {
  return {
    type: SHOW_POSTS,
    payload,
  };
};

export const sortLikePosts = (payload) => {
  return {
    type: SORT_LIKE_POSTS,
    payload,
  };
};

export const addPosts = (payload) => {
  return {
    type: ADD_POSTS,
    payload,
  };
};

export const deletePosts = (payload) => {
  return {
    type: DELETE_POSTS,
    payload,
  };
};

export const updatePosts = (payload) => {
  return {
    type: UPDATE_POSTS,
    payload,
  };
};

export const updatePostsLike = (payload) => {
  return {
    type: UPDATE_POSTS_Like,
    payload,
  };
};

let newArr = [];

const posts = (state = newArr, action) => {
  switch (action.type) {
    case SHOW_POSTS:
      return action.payload;
    case ADD_POSTS:
      return [action.payload, ...state];
    case DELETE_POSTS:
      return state.filter((post) => {
        return post.postId !== action.payload;
      });
    case UPDATE_POSTS:
      return state.map((post) => {
        if (post.postId === action.payload.postId) {
          return { ...post, postTitle: action.payload.postTitle, postBody: action.payload.postBody, postIngredient: action.payload.postIngredient, postRecipe: action.payload.postRecipe };
        } else {
          return post;
        }
      });
    case SORT_LIKE_POSTS:
      return action.payload.sort((a, b) => b.postWhoLiked - a.postWhoLiked);
    case UPDATE_POSTS_Like:
      return state.map((post) => {
        if (post.postId === action.payload.postId) {
          return { ...post, postWhoLiked: action.payload.postWhoLiked };
        } else {
          return post;
        }
      });
    default:
      return state;
  }
};

export default posts;
