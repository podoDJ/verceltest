import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { styled } from "styled-components";

const PostDetailBrowse = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === id)[0];
  console.log("post => ", post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <S.PostDetailBox>
      <p>{post.postId}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <button
        onClick={async () => {
          navigate("/post");
          const postRef = doc(db, "posts", post.id);
          await deleteDoc(postRef);
          
          dispatch({
            type: "DELETE_POST",
            payload: post.postId,
          });
        }}
      >
        삭제하기
      </button>
    </S.PostDetailBox>
  );
};

export default PostDetailBrowse;

const S = {
  PostDetailBox: styled.div`
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
  `
}