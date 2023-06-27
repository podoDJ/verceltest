import { app, firestore, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase.storage";

export const updateProfileImage = (file) => {
  return async (dispatch, getState) => {
    try {
      // 파일 업로드
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`profile/${file.name}`);
      await uploadBytes(fileRef, file);

      // 업로드된 파일의 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(fileRef);

      // 파이어베이스에 프로필 사진 업데이트
      const userRef = firestore.collection("users").doc(getState().auth.userID);
      await userRef.update({ profileImage: downloadURL });

      // 상태 업데이트
      dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: downloadURL });
    } catch (error) {
      console.error("프로필 사진 업데이트 오류:", error);
    }
  };
};

export const updateUsername = (newUsername) => {
  return async (dispatch, getState) => {
    try {
      // 파이어베이스에 유저네임 업데이트
      const userRef = firestore.collection("users").doc(getState().auth.userID);
      await userRef.update({ username: newUsername });

      // 상태 업데이트
      dispatch({ type: "UPDATE_USERNAME", payload: newUsername });
    } catch (error) {
      console.error("유저네임 업데이트 오류:", error);
    }
  };
};
