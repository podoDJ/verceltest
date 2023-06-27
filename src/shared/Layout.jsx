import React, { useEffect } from "react";
import { styled } from "styled-components";
import { HeaderComp, UserHeaderComp } from "../components/common/Header.jsx/HeaderComp";
import { auth } from "../firebase";

export default function Layout({ children }) {
  const user = auth.currentUser;
  console.log(user);

  useEffect(() => {
    <StLayout />;
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
