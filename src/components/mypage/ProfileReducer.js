import shortid from "shortid";

const initialState = {
  uid: shortid.generate(),
  photoURL: "",
  displayname: "Tom",
  profileCmt: "가나다라마바사",
  posts: [],
  guestbook: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_IMAGE":
      return {
        ...state,
        photoURL: action.payload, // 프로필 이미지 업데이트
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        displayname: action.payload, // 유저네임 업데이트
      };
    case "UPDATE_PROFILE_CMT":
      return {
        ...state,
        profileCmt: action.payload, // 소개글 업데이트
      };

    default:
      return state;
  }
};

export default profileReducer;
