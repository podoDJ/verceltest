import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePhotoURL, updateDisplayname, updateProfileCmt } from "./ProfileActions";

const Profile = () => {
  const uid = useSelector((state) => state.profile.uid); // uid 가져오기
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

  const displaynameChange = (e) => {
    const newDisplayname = e.target.value;

    dispatch(updateDisplayname(newDisplayname, uid));
  };

  const profileCmtChange = (e) => {
    const newProfileCmt = e.target.value;

    dispatch(updateProfileCmt(newProfileCmt, uid));
  };

  return (
    <>
      <div>
        <label>Profile Image</label>
        <input type="file" onChange={photoURLChange} />
        {photoURL && <img src={photoURL} alt="profile" />}
      </div>
      <div>
        <span>Email :{email}</span>
      </div>
      <div>
        <label>User Name</label>
        <input type="text" value={displayname} onChange={displaynameChange} />
      </div>
      <div>
        <label>Profile Cmt</label>
        <input type="text" value={profileCmt} onChange={profileCmtChange} />
      </div>
      <div>
        <h2>My Post</h2>
        {posts.map((post) => (
          <div key={post.uid}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Guestbook</h2>
        {guestbook.map((entry) => (
          <div key={entry.uid}>
            <h3>{entry.name}</h3>
            <p>{entry.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
