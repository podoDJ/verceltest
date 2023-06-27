import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage, updateUsername } from "./ProfileActions";

const Profile = () => {
  const profileImage = useSelector((state) => state.profile.profileImage);
  const username = useSelector((state) => state.profile.username);
  const posts = useSelector((state) => state.profile.posts);
  const guestbook = useSelector((state) => state.profile.guestbook);
  const dispatch = useDispatch();

  const profileImageChange = (e) => {
    const file = e.target.files[0];

    dispatch(updateProfileImage(file));
  };

  const usernameChange = (e) => {
    const newUsername = e.target.value;

    dispatch(updateUsername(newUsername));
  };

  return (
    <>
      <div>
        <label>Profile Image</label>
        <input type="file" onChange={profileImageChange} />
        {profileImage && <img src={profileImage} alt="profile" />}
      </div>
      <div>
        <label>User Name</label>
        <input type="text" value={username} onChange={usernameChange} />
      </div>
      <div>
        <h2>My Post</h2>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Guestbook</h2>
        {guestbook.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.name}</h3>
            <p>{entry.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
