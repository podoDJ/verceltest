import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { P, G } from "../starDetail/starProfile.styles";
import { useParams } from "react-router-dom";
import { showMembers } from "../../redux/modules/logReducer";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const starList = useSelector((state) => state.logReducer.members);
  // console.log("1", starList);

  const user = starList.find((user) => {
    return user.memberId == id;
  });

  useEffect(() => {
    dispatch(showMembers(starList));
  }, []);

  return (
    <>
      <P.ProfileContainer>
        <P.ProfileImageBox>
          <P.ProfileImage src={user.photoURL} alt="profile" />
        </P.ProfileImageBox>
        <P.ProfileBody>
          <p>EMAIL : {user.email}</p>
          <P.NameBox>
            <p>NAME : {user.displayName}</p>
          </P.NameBox>
          <P.IntroContainer>
            <label>INTRO :</label>
            <P.Intro> {user.profileCmt}</P.Intro>
          </P.IntroContainer>
        </P.ProfileBody>
      </P.ProfileContainer>
      <G.Guestbook>
        <G.GuestbookCut>1개의 방명록</G.GuestbookCut>
        <G.Textarea name="guestbook" />
        <G.CreateBtn>등록</G.CreateBtn>
        <G.GuestbookList>
          <G.UserImage src={user.photoURL} alt="profile" />
          <G.UserCmt>
            <p>{user.displayName}</p>
            <span>작성시간</span>
          </G.UserCmt>
          <G.UpdateBtn>수정</G.UpdateBtn>
          <G.DeleteBtn>삭제</G.DeleteBtn>
          <G.Cmt>작성 글</G.Cmt>
        </G.GuestbookList>
      </G.Guestbook>
    </>
  );
};

export default Profile;
