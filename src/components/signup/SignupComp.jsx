import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SignupComp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  // const inputRef = useRef([]);
  const navigate = useNavigate();

  //회원가입 기능
  const signupFunc = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      console.log(userCredential.user);
      alert("회원가입 완료");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", errorCode, errorMessage);
      switch (errorCode) {
        case "auth/email-already-in-use":
          return alert("이미 사용 중인 이메일입니다.");
        case "auth/weak-password":
          return alert("비밀번호는 6글자 이상이어야 합니다.");
        case "auth/network-request-failed":
          return alert("네트워크 연결에 실패 하였습니다.");
        case "auth/invalid-email":
          return alert("잘못된 이메일 형식입니다.");
        case "auth/internal-error":
          return alert("잘못된 요청입니다.");
        default:
          return alert("로그인에 실패 하였습니다. 개발팀에 연락해");
      }
    }
  };

  //폼 submit 관리
  const signupSubmitHandler = (event) => {
    event.preventDefault();
    if (name && email && password && checkPassword && password === checkPassword) {
      signupFunc();
    } else if (name && email && password && checkPassword && password !== checkPassword) {
      alert("입력하신 비밀번호가 달라");
    } else alert("모든 내용을 입력해주세요!");
    //프리벤트 디폴트
    //유효성 검사
  };

  return (
    <S.SignupForm onSubmit={signupSubmitHandler}>
      <S.SignupTitle>Name</S.SignupTitle>
      <S.SignupInput
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <S.SignupTitle>E-mail</S.SignupTitle>
      <S.SignupInput
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <S.SignupTitle>Password</S.SignupTitle>
      <S.SignupInput
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <S.SignupTitle>Password Check</S.SignupTitle>
      <S.SignupInput
        type="password"
        value={checkPassword}
        onChange={(e) => {
          setCheckPassword(e.target.value);
        }}
      />
      <div>
        <S.SignupBtn>Sign Up</S.SignupBtn>
      </div>
    </S.SignupForm>
  );
};

export default SignupComp;

const S = {
  SignupForm: styled.form`
    background-color: #ffbf9b;
    width: 500px;
    height: 600px;

    margin: auto;
    padding: 50px;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  SignupTitle: styled.p`
    font-size: 20px;
    margin: 0 auto 5px 50px;
  `,
  SignupInput: styled.input`
    width: 400px;
    height: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    border-color: transparent;
  `,
  SignupBtn: styled.button`
    width: 200px;
    height: 40px;
    color: white;
    background-color: #b46060;
    border-color: transparent;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
  `,
};
