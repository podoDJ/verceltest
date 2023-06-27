import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={signupSubmitHandler}>
      Name
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      E-mail
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      Password
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      Password Check
      <input
        type="password"
        value={checkPassword}
        onChange={(e) => {
          setCheckPassword(e.target.value);
        }}
      />
      <button>Sign Up</button>
    </form>
  );
};

export default SignupComp;
