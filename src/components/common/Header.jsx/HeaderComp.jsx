import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

export const HeaderComp = () => {
  const navigate = useNavigate();

  // 메뉴바 클릭시 하단 그림자 유지(sessionStorage)
  const clickedMenuArray = sessionStorage.getItem("clickedMenus") ? JSON.parse(sessionStorage.getItem("clickedMenus")) : ["LOGO"];
  const addItem = (event) => {
    clickedMenuArray.push(event.target.id);
    sessionStorage.setItem("clickedMenus", JSON.stringify(clickedMenuArray));
  };
  const clickedNow = clickedMenuArray.at(-1);
  console.log("clickedNow=>", clickedNow);

  return (
    <S.Header>
      <S.HeaderMenuDiv>
        <S.HeaderMenu
          id="LOGO"
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/");
          }}
        >
          <S.Logo src="/assets/images/honcook.png" alt="logo" />
        </S.HeaderMenu>
        <S.HeaderMenu
          id="POST"
          propid={"POST"}
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/post");
          }}
        >
          POST
        </S.HeaderMenu>
        <S.HeaderMenu
          id="MEMBER"
          propid={"MEMBER"}
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/star");
          }}
        >
          MEMBER
        </S.HeaderMenu>
      </S.HeaderMenuDiv>
      <S.HeaderMenuDiv>
        <S.HeaderSubMenu
          id="LOG IN"
          onClick={(event) => {
            addItem(event);
            navigate("/login");
          }}
        >
          Log In
        </S.HeaderSubMenu>
        <S.HeaderSubMenu
          id="SIGN UP"
          onClick={(event) => {
            addItem(event);
            navigate("/signup");
          }}
        >
          Sign Up
        </S.HeaderSubMenu>
      </S.HeaderMenuDiv>
    </S.Header>
  );
};

export const UserHeaderComp = () => {
  const navigate = useNavigate();
  // 메뉴바 클릭시 하단 그림자 유지(sessionStorage)
  const clickedMenuArray = sessionStorage.getItem("clickedMenus") ? JSON.parse(sessionStorage.getItem("clickedMenus")) : ["LOGO"];
  const addItem = (event) => {
    clickedMenuArray.push(event.target.id);
    sessionStorage.setItem("clickedMenus", JSON.stringify(clickedMenuArray));
  };
  const clickedNow = clickedMenuArray.at(-1);
  console.log("clickedNow=>", clickedNow);

  const logOutFunc = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const user = useSelector((state) => {
    return state.logReducer.user;
  });

  // 제이 추가
  const getProfile = useSelector((state) => state.profile);

  return (
    <S.Header>
      <S.HeaderMenuDiv>
        <S.HeaderMenu
          id="LOGO"
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/");
          }}
        >
          <S.Logo src="/assets/images/honcook.png" alt="logo" />
        </S.HeaderMenu>
        <S.HeaderMenu
          id="POST"
          propid={"POST"}
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/post");
          }}
        >
          POST
        </S.HeaderMenu>
        <S.HeaderMenu
          id="MEMBER"
          propid={"MEMBER"}
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/star");
          }}
        >
          MEMBER
        </S.HeaderMenu>
        <S.HeaderMenu
          id="PROFILE"
          propid={"PROFILE"}
          clickedNow={clickedNow}
          onClick={(event) => {
            addItem(event);
            navigate("/mypage");
          }}
        >
          PROFILE
        </S.HeaderMenu>

        {/* 마이페이지 경로 수정 - 제이 */}
      </S.HeaderMenuDiv>
      <S.HeaderMenuDiv>
        <S.HeaderSubMenu
          id="LOG OUT"
          onClick={(event) => {
            addItem(event);
            logOutFunc();
          }}
        >
          Log Out
        </S.HeaderSubMenu>
        <S.Img
          id="PROFILE IMG"
          src={getProfile.photoURL}
          onClick={(event) => {
            addItem(event);
            navigate("/mypage");
          }}
        />
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
    margin: 0 15px;
  `,
  HeaderMenu: styled.span`
    font-size: 25px;
    font-weight: 600;

    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: ${(props) => (props.propid === props.clickedNow ? "inset 0px -13px 10px -6px #f9d7c5" : "none")};
    &:hover {
      box-shadow: inset 0px -13px 10px -6px #f9d7c5;
      transition-duration: 200ms;
    }
  `,
  HeaderSubMenu: styled.span`
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 15px;
    &:hover {
      box-shadow: inset 0px -13px 5px -6px #f9d7c5;
      transition-duration: 100ms;
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
