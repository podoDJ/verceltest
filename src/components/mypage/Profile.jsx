import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { P } from "./ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const userProfile = useSelector((state) => state.logReducer.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (uid) {
  //     const fetchData = async () => {
  //       const q = await query(collection(db, "profile"));
  //       const querySnapshot = await getDocs(q);
  //       const initialProfile = [];
  //       querySnapshot.forEach((doc) => {
  //         const data = {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //         console.log("data", data);
  //         initialProfile.push(data);
  //       });
  //       dispatch(setProfile(initialProfile));
  //     };
  //     fetchData();
  //   }
  // }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState(userProfile.displayName || "");
  const [profileCmt, setProfileCmt] = useState(userProfile.profileCmt || "");

  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();
  // 이미지 업로드 버튼 클릭 시 이미지 파일 인풋 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  const nameChangeHandler = (e) => {
    setDisplayName(e.target.value);
  };

  const changeName = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, { displayName: displayName });
    alert("닉네임 변경 완료");
  };

  const profileCmtChangeHandler = (e) => {
    setProfileCmt(e.target.value);
  };

  const changeProfileCmt = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, { profileCmt: profileCmt });
    alert("소개글 변경 완료");
  };

  const changedPhoto = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
    UploadPhoto(e, file);
    alert("프로필 사진 변경 완료");
  };

  const UploadPhoto = async (e, file) => {
    e.preventDefault();
    const URL = `${userProfile.uid}/${file.name}`;
    const storageRef = ref(storage, URL);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    setPhotoURL(photoURL);
    await updateProfile(auth.currentUser, { photoURL: photoURL });
  };

  return (
    <>
      <div>
        <div key={userProfile.uid}>
          <P.ProfileContainer>
            <P.ProfileImageWrap>
              <P.ProfileImageBox>
                <P.ProfileImage src={userProfile.photoURL} alt="profile" />
              </P.ProfileImageBox>
              <P.ImageUploadBox>
                <input type="file" style={{ display: "none" }} ref={imageFileInput} onChange={changedPhoto} />
                <P.Btns onClick={onClickImageFile}>이미지 업로드</P.Btns>
                <P.Btns onClick={UploadPhoto}>프로필 사진 변경하기</P.Btns>
              </P.ImageUploadBox>
            </P.ProfileImageWrap>
            <P.ProfileBody>
              <p>EMAIL</p>
              <input type="email" placeholder={userProfile.email} disabled={true} />
              <P.NameBox>
                <p>NAME : </p>
                <input type="text" value={displayName} onChange={nameChangeHandler} />
                {/* <p>좋아요 수 : {profile.likes}</p> */}
                <P.Btns type="submit" size="medium" onClick={changeName}>
                  변경
                </P.Btns>
              </P.NameBox>
              <div style={{ display: "flex" }}>
                <p>INTRO : {userProfile.profileCmt}</p>
                <input value={profileCmt} onChange={profileCmtChangeHandler} />
                <P.Btns size="large" onClick={changeProfileCmt}>
                  수정하기
                </P.Btns>
              </div>
            </P.ProfileBody>
          </P.ProfileContainer>
          <P.Contents>
            <P.ContentsTitle>내가 쓴 글</P.ContentsTitle>
            <P.ContentsTitle>방명록</P.ContentsTitle>
          </P.Contents>
          <P.contentsBody>게시글 연결은 어느세월에,,,</P.contentsBody>
        </div>
      </div>
    </>
  );
};

export default Profile;
