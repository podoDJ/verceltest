import shortid from "shortid"

const postInitialState = [
  {
    postId: shortid.generate(),
    postTitle: "포스트타이틀1",
    postBody: "포스트바디1",
  },
]


const posts = (state = postInitialState, action) => {
  switch(action.type) {
    case "ADD_POST":
      return [...state, action.payload]
    case "DELETE_POST":
      return state.filter((post) => {return post.postId !== action.payload})
    default:
      return state
  }
}

export default posts