import { auth, db, storage } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, getDocs, updateDoc, doc, collection, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import shortid from "shortid";

const app = initializeApp(firebaseConfig);

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

export const setDisplayname = (displayname) => {
  return {
    type: "SET_DISPLAYNAME",
    payload: displayname,
  };
};

export const setprofileCmt = (profileCmt) => {
  return {
    type: "SET_PROFILE_CMT",
    payload: profileCmt,
  };
};

export const updateDisplayname = (newDisplayname, uid) => {
  return async (dispatch, getState) => {
    try {
      // 파이어스토어 인스턴스 가져오지
      const firestore = getFirestore(app);

      // 파이어베이스에 유저네임 업데이트
      const userRef = doc(firestore, "users", uid);
      await updateDoc(userRef, { displayname: newDisplayname });

      // 상태 업데이트
      dispatch(setDisplayname(newDisplayname));
    } catch (error) {
      console.error("유저네임 업데이트 오류:", error);
    }
  };
};

export const updateProfileCmt = (newProfileCmt, uid) => {
  return async (dispatch, getState) => {
    try {
      // 파이어스토어 인스턴스 가져오기
      const firestore = getFirestore(app);

      // 파이어베이스에 소개글 업데이트
      const userRef = doc(firestore, "cmts", uid);
      await updateDoc(userRef, { profileCmt: newProfileCmt });

      // 상태 업데이트
      dispatch(setprofileCmt(newProfileCmt));
    } catch (error) {
      console.error("소개글 업데이트 오류:", error);
    }
  };
};

const fetchGuestbook = async (uid) => {
  const mockGuestbookData = [
    {
      uid: shortid.generate(),
      displayname: "jerry",
      comment: "Hello",
    },
  ];

  return mockGuestbookData;
};

export const setGuestbook = (guestbook) => {
  return {
    type: "SET_GUESTBOOK",
    payload: guestbook,
  };
};

export const getGuestbook = (uid) => {
  return async (dispatch) => {
    try {
      const guestbookData = await fetchGuestbook(uid);
      dispatch(setGuestbook(guestbookData));
    } catch (error) {
      console.error("방명록 가져오기 오류:", error);
    }
  };
};

const fetchPosts = async (uid) => {
  // uid로 파이어베이스에서 게시글 가져오기
  const firestoreInstance = getFirestore(app);
  const q = query(collection(firestoreInstance, "posts"), where("uid", "==", uid));
  const snapshot = await getDocs(q);

  const posts = [];
  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  return posts;
};

export const setPosts = (posts) => {
  return {
    type: "SET_POTS",
    payload: posts,
  };
};

export const getPosts = (uid) => {
  return async (dispatch) => {
    try {
      const posts = await fetchPosts(uid);
      dispatch(setPosts(posts));
    } catch (error) {
      console.error("게시글 가져오기 오류:", error);
    }
  };
};
