import { app, firestore } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

export const updatePhotoURL = (file, uid) => {
  return async (dispatch, getState) => {
    try {
      // 파일 업로드
      const storage = getStorage(app);
      const storageRef = ref(storage, `profile/${file.name}`);
      await uploadBytes(storageRef, file);

      // 업로드된 파일의 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);

      // 파이어베이스에 프로필 사진 업데이트
      const firestore = getFirestore(app);
      const userRef = doc(firestore, `users/${uid}`);
      await updateDoc(userRef, { photoURL: downloadURL });

      // 상태 업데이트
      dispatch({ type: "UPDATE_PHOTO_URL", payload: file });
    } catch (error) {
      console.error("프로필 사진 업데이트 오류:", error);
    }
  };
};

export const updateDisplayname = (newDisplayname, uid) => {
  return async (dispatch, getState) => {
    try {
      // 파이어베이스에 유저네임 업데이트
      const userRef = firestore.collection("users").doc(uid);
      await userRef.update({ displayname: newDisplayname });

      // 상태 업데이트
      dispatch({ type: "UPDATE_DISPLAYNAME", payload: newDisplayname });
    } catch (error) {
      console.error("유저네임 업데이트 오류:", error);
    }
  };
};

export const updateProfileCmt = (newProfileCmt, uid) => {
  return async (dispatch, getState) => {
    try {
      // 파이어베이스에 소개글 업데이트
      const userRef = firestore.collection("users").doc(uid);
      await userRef.update({ profileCmt: newProfileCmt });

      // 상태 업데이트
      dispatch({ type: "UPDATE_PROFILE_CMT", payload: newProfileCmt });
    } catch (error) {
      console.error("소개글 업데이트 오류:", error);
    }
  };
};
