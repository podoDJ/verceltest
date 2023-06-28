import shortid from "shortid";

const initialState = {
  uid: shortid.generate(),
  photoURL: "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg",
  displayname: "Tom",
  email: "",
  profileCmt: "안녕하세요, 반갑습니다!",
  posts: [],
  guestbook: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DISPLAYNAME":
      return {
        ...state,
        displayname: action.payload,
      };
    case "SET_PROFILE_CMT":
      return {
        ...state,
        profileCmt: action.payload,
      };
    case "UPDATE_PHOTO_URL":
      return {
        ...state,
        photoURL: action.payload, // 프로필 이미지 업데이트
      };
    case "UPDATE_DISPLAYNAME":
      return {
        ...state,
        displayname: action.payload, // 유저네임 업데이트
      };
    case "UPDATE_PROFILE_CMT":
      return {
        ...state,
        profileCmt: action.payload, // 소개글 업데이트
      };

    case "SET_GUESTBOOK":
      return {
        ...state,
        guestbook: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
