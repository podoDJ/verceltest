import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { P } from "../starDetail/starProfile.styles";
import { useParams } from "react-router-dom";
import { showMembers } from "../../redux/modules/logReducer";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const starList = useSelector((state) => state.logReducer.members);

  const user = starList.find((user) => user.uid === id);

  useEffect(() => {
    dispatch(showMembers(starList));
  }, []);

  return (
    <>
      <P.ProfileContainer>
        <P.ProfileImageWrap>
          <P.ProfileImageBox>
            <P.ProfileImage src={user.photoURL} alt="profile" />
          </P.ProfileImageBox>
        </P.ProfileImageWrap>
        <P.ProfileBody>
          <p>id : {user.uid}</p>
          <p>EMAIL : {user.email}</p>
          <P.NameBox>
            <p>NAME : {user.displayName}</p>

            {/* <p>좋아요 수 : {user.likes}</p> */}
          </P.NameBox>
          <div>
            <p>INTRO : {user.profileCmt}</p>
          </div>
        </P.ProfileBody>
      </P.ProfileContainer>
      <p>1개의 방명록</p>
      <P.Textarea name="guestbook" />
      <button>등록</button>
      <div>
        <img src={user.photoURL} alt="profile" />
        <p>{user.displayName}</p>
        <div>작성시간</div>
        <button>수정</button>
        <button>삭제</button>
        <p>작성 글</p>
      </div>
    </>
  );
};

export default Profile;
