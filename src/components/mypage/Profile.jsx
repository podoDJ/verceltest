import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { P } from "./ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const defaultProfileImage = "https://i.pinimg.com/originals/99/f3/06/99f3068e425e6b9f56d683b0859ee942.jpg";
  const userProfile = useSelector((state) => state.logReducer.user);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(() => {
    const storedPhotoURL = localStorage.getItem("photoURL");
    return storedPhotoURL || userProfile.photoURL || defaultProfileImage;
  });
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
    const userDocRef = doc(db, "members", userProfile.memberid);
    await updateDoc(userDocRef, { displayName: displayName });
    alert("닉네임 변경 완료");
    console.log(userDocRef);
  };

  const profileCmtChangeHandler = (e) => {
    setProfileCmt(e.target.value);
  };

  const changeProfileCmt = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, { profileCmt: profileCmt });
    const userDocRef = doc(db, "members", userProfile.uid);
    await updateDoc(userDocRef, { profileCmt: profileCmt });
    alert("소개글 변경 완료");
  };

  const changedPhoto = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    try {
      const URL = `${userProfile.uid}/${file.name}`;
      const storageRef = ref(storage, URL);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      setPhotoURL(photoURL);
      localStorage.setItem("photoURL", photoURL);
      await updateProfile(auth.currentUser, { photoURL: photoURL });
      alert("프로필 사진 변경 완료");
    } catch (error) {
      console.log(error);
      alert("프로필 사진 변경 실패", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 포토URL 값을 가져와 초기화
    const storedPhotoURL = localStorage.getItem("photoURL");
    if (storedPhotoURL) {
      setPhotoURL(storedPhotoURL);
    }
  }, []);

  return (
    <>
      <div>
        <div key={userProfile.uid}>
          <P.ProfileContainer>
            <P.ProfileImageWrap>
              <P.ProfileImageBox>
                <P.ProfileImage src={photoURL} alt="profile" />
              </P.ProfileImageBox>
              <P.ImageUploadBox>
                <P.ImageInput type="file" ref={imageFileInput} onChange={changedPhoto} />
                <P.Btns onClick={onClickImageFile} btn="imageBtn">
                  프로필 사진 변경
                </P.Btns>
              </P.ImageUploadBox>
            </P.ProfileImageWrap>
            <P.ProfileBody>
              <p>EMAIL</p>
              <P.MemberInput type="email" placeholder={userProfile.email} disabled={true} />

              <p>NAME</p>
              <P.MemberInput type="text" value={displayName} onChange={nameChangeHandler} />
              {/* <p>좋아요 수 : {profile.likes}</p> */}
              {/* <P.Btns type="submit" btn="nameBtn" onClick={changeName}>
                변경
              </P.Btns> */}

              <p>INTRO {userProfile.profileCmt}</p>

              <P.MemberInput value={profileCmt} onChange={profileCmtChangeHandler} />
              <P.Btns onClick={changeProfileCmt} btn="introBtn">
                프로필 정보 변경
              </P.Btns>
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
