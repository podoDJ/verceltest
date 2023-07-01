import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

export const HeaderComp = () => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.HeaderMenuDiv>
        <S.HeaderMenu onClick={() => navigate("/")}>로고</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/post")}>POST</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/star")}>MEMBER</S.HeaderMenu>
      </S.HeaderMenuDiv>
      <S.HeaderMenuDiv>
        <S.HeaderSubMenu onClick={() => navigate("/login")}>Log In</S.HeaderSubMenu>
        <S.HeaderSubMenu onClick={() => navigate("/signup")}>Sign Up</S.HeaderSubMenu>
      </S.HeaderMenuDiv>
    </S.Header>
  );
};

export const UserHeaderComp = () => {
  const navigate = useNavigate();

  const logOutFunc = async () => {
    await signOut(auth);
    window.location.reload();
    // 로컬스토리지 코드 삭제(제이)
  };

  const user = useSelector((state) => {
    return state.logReducer.user;
  });
  const members = useSelector((state) => {
    return state.logReducer.members;
  });

  const currentUser = members.filter((item) => {
    return item.id == auth.currentUser.uid;
  });

  return (
    <S.Header>
      <S.HeaderMenuDiv>
        <S.HeaderMenu onClick={() => navigate("/")}>로고</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/post")}>POST</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/star")}>MEMBER</S.HeaderMenu>
        <S.HeaderMenu onClick={() => navigate("/mypage")}>PROFILE</S.HeaderMenu>
        {/* 마이페이지 경로 수정 - 제이 */}
      </S.HeaderMenuDiv>
      <S.HeaderMenuDiv>
        <S.HeaderSubMenu onClick={logOutFunc}>Log Out</S.HeaderSubMenu>
        <S.Img src={currentUser[0]?.photoURL ? currentUser[0].photoURL : "https://i.pinimg.com/originals/99/f3/06/99f3068e425e6b9f56d683b0859ee942.jpg"} onClick={() => navigate("/mypage")} />
      </S.HeaderMenuDiv>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    background-color: #b46060;
    color: white;
    width: 100wh;
    height: 70px;

    display: flex;
    justify-content: space-between;
  `,
  HeaderMenuDiv: styled.div`
    display: flex;
    align-items: center;
    /* margin: 0 10px; */
    /*동준변경시도*/
    margin: 0 15px;
  `,
  HeaderMenu: styled.span`
    font-size: 25px;
    font-weight: 600;
    /* margin: 0 15px; */
    cursor: pointer;
    /*동준변경시도*/
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &:hover {
      box-shadow: inset 0px -13px 5px -6px #f9d7c5;
      transition-duration: 100ms;
    }
    &:active {
      box-shadow: inset 0px -13px 5px -6px #f9d7c5;
    }
  `,
  HeaderSubMenu: styled.span`
    font-size: 25px;
    font-weight: 600;
    /* margin: 0 15px; */
    cursor: pointer;
    /*동준변경시도*/
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 15px;
    &:hover {
      box-shadow: inset 0px -13px 5px -6px #f9d7c5;
      transition-duration: 100ms;
    }
    &:active {
      box-shadow: inset 0px -13px 5px -6px #f9d7c5;
    }
  `,
  Img: styled.img`
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-left: 10px;
    cursor: pointer;
  `,
};
