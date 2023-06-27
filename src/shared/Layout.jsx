import React, { useEffect } from "react";
import { styled } from "styled-components";
import { HeaderComp, UserHeaderComp } from "../components/common/header/HeaderComp";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Layout({ children }) {
  const user = auth.currentUser;
  //console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);

  return (
    <StLayout>
      {user ? <UserHeaderComp /> : <HeaderComp />}
      <div>{children}</div>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 2px auto;
`;
