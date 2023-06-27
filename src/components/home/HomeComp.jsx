import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../firebase";

const HomeComp = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);
  return <div>HomeComp</div>;
};

export default HomeComp;
