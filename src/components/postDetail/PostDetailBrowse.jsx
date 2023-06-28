import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { styled } from "styled-components";

const PostDetailBrowse = () => {
  console.log("여기는 POSTDETAILBROWSE");
  const { id } = useParams(); // id === documentId
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.id === id)[0];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(!post) {
    navigate("/post")
    return;
  }
  return (
    <S.PostDetailBox>
      <p>{post.id}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <button
        onClick={async () => {

          console.log('post.id => ', post.id)
          
          const postRef = doc(db, "posts", post.id);
          await deleteDoc(postRef);
          dispatch({
            type: "DELETE_POST",
            payload: post.id,
          });
        }}
      >
        삭제하기
      </button>
      <Link to={`/postupdate/${post.id}`}>
      <button>
        수정하기
      </button>
      </Link>
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