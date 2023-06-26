// 임시 reducer입니다.

const tempReducer = (state = [], action) => {
  switch (action.type) {
    case "temp":
      return [...state, action.payload]
    default:
      return state
  }
}

export default tempReducer;