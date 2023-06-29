import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { showMembers } from "../../redux/modules/logReducer";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const starList = useSelector((state) => state.logReducer.members);

  const user = starList.find((user) => user.id === id);

  useEffect(() => {
    dispatch(showMembers(starList));
  }, []);

  return (
    <>
      <div>
        <div key={user.uid}>
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
              <div style={{ display: "flex" }}>
                <p>INTRO : {user.profileCmt}</p>
              </div>
            </P.ProfileBody>
          </P.ProfileContainer>
        </div>
      </div>
    </>
  );
};

export default Profile;

const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 80px;
    margin-top: 30px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 280px;
    height: 280px;
    overflow: hidden;
    border-radius: 100%;
    margin: 30px;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,
  NameBox: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
};
