import React from "react";
import { styled } from "styled-components";

export default function Layout({ children }) {
  return (
    <StLayout>
      <div>{children}</div>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 2px auto;
`;
