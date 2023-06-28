import React, { useEffect } from "react";
import { auth, firestore, storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updatePhotoURL, updateDisplayname, updateProfileCmt, getGuestbook, getPosts } from "./ProfileActions";
import { ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const uid = useSelector((state) => state.profile.uid);
  const photoURL = useSelector((state) => state.profile.photoURL);
  const displayname = useSelector((state) => state.profile.displayname);
  const email = useSelector((state) => state.profile.email);
  const profileCmt = useSelector((state) => state.profile.profileCmt);
  const posts = useSelector((state) => state.profile.posts);
  const guestbook = useSelector((state) => state.profile.guestbook);
  const dispatch = useDispatch();

  const photoURLChange = (e) => {
    const file = e.target.files[0];

    dispatch(updatePhotoURL(file, uid));
  };

  const uploadPhotoURL = async () => {
    const imgRef = ref(storage, `${auth.currentUser.uid}/${photoURL.name}`);
    await uploadBytes(imgRef, photoURL);
  };

  const displaynameChange = (e) => {
    const newDisplayname = e.target.value;

    dispatch(updateDisplayname(newDisplayname, uid));
  };

  const profileCmtChange = (e) => {
    const newProfileCmt = e.target.value;

    dispatch(updateProfileCmt(newProfileCmt, uid));
  };

  useEffect(() => {
    dispatch(getPosts(uid)); // 내가 작성한 게시글 가져오기
    dispatch(getGuestbook(uid)); // 방명록 가져오기
  }, [dispatch, uid]);

  return (
    <>
      <div>
        <label>Profile Image</label>
        <input type="file" onChange={photoURLChange} />
        {photoURL && <img src={photoURL} alt="profile" />}
        sss <button onClick={uploadPhotoURL}>Upload</button>
      </div>
      <div>
        <span>Email :{email}</span>
      </div>
      <div>
        <label>User Name</label>
        <input type="text" value={displayname} onChange={displaynameChange} />
        <button>변경</button>
      </div>
      <div>
        <label>Profile Cmt</label>
        <input type="text" value={profileCmt} onChange={profileCmtChange} />
        <button>변경</button>
      </div>
      <div>
        <h2>My Post</h2>
        {posts.map((post) => (
          <div key={post.uid}>
            <h3>{post.title}</h3>
            <p>{post.displayname}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Guestbook</h2>
        {guestbook.map((entry) => (
          <div key={entry.uid}>
            <h3>작성자 : {entry.displayname}</h3>
            <p>내용 : {entry.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
