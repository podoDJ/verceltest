import React from "react";
import HomeComp from "../components/home/HomeComp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const currentUid = useSelector((state) => state.logReducer.user.uid);
  console.log("currentUid =>", currentUid);
  return (
    <>
      <HomeComp />
    </>
  );
};
export default Home;
