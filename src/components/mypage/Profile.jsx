import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { P } from "./ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const getProfile = useSelector((state) => state.profile);
  const getMyPosts = useSelector((state) => state.myPosts);

  console.log(getMyPosts);

  const { uid } = getProfile;

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPhotoURL, setCurrentPhotoURL] = useState(null);
  const [currentDisplayName, setCurrentDisplayName] = useState(null);
  const [currentProfileCmt, setCurrentProfileCmt] = useState(null);

  useEffect(() => {
    setCurrentPhotoURL(getProfile.photoURL);
  }, [getProfile.photoURL]);

  useEffect(() => {
    setCurrentDisplayName(getProfile.displayName);
  }, [getProfile.displayName]);

  useEffect(() => {
    setCurrentProfileCmt(getProfile.profileCmt);
  }, [getProfile.profileCmt]);

  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();

  // 이미지 업로드 버튼 클릭 시 이미지 파일 인풋 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  const nameChangeHandler = (e) => {
    setCurrentDisplayName(e.target.value);
  };

  const profileCmtChangeHandler = (e) => {
    setCurrentProfileCmt(e.target.value);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const userDocRef = doc(db, "members", uid);
    await updateDoc(userDocRef, { profileCmt: currentProfileCmt, displayName: currentDisplayName });

    alert("프로필 정보 변경 완료");
  };

  const changedPhoto = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    try {
      const URL = `${uid}/${file.name}`;
      const storageRef = ref(storage, URL);
      await uploadBytes(storageRef, file);
      const resultPhotoURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "members", uid);
      await updateDoc(userDocRef, { photoURL: resultPhotoURL });
      alert("프로필 사진 변경 완료");

      setCurrentPhotoURL(resultPhotoURL);
    } catch (error) {
      console.log(error);
      alert("프로필 사진 변경 실패", error);
    }
  };

  return (
    <>
      <div>
        <div key={uid}>
          <P.ProfileContainer>
            <P.ProfileImageWrap>
              <P.ProfileImageBox>
                <P.ProfileImage src={currentPhotoURL} alt="profile" />
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
              <P.MemberInput type="email" placeholder={getProfile.email} disabled={true} />

              <p>NAME</p>
              <P.MemberInput type="text" value={currentDisplayName} onChange={nameChangeHandler} />
              {/* <p>좋아요 수 : {profile.likes}</p> */}
              <p>COMMENT</p>
              <P.MemberInput value={getProfile.profileCmt} onChange={profileCmtChangeHandler} />
              <P.Btns onClick={updateProfile} btn="introBtn">
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
