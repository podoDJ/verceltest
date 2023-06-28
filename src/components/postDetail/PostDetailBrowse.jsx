import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { styled } from "styled-components";
import { getAuth } from "firebase/auth";

const PostDetailBrowse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth();
  const TestUID = auth.currentUser.uid;
  //console.log("TestUID : ", TestUID);
  const { id } = useParams(); // id === documentId
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === id)[0];
  if (!post) {
    navigate("/post");
    return;
  }
  console.log("포스트브라우저의 포스트 : ", post);

  

  //좋아요 기능.
  // const [updatedPostWhoLiked, setUpdatedPostWhoLiked] = useState(post.postWhoLiked || []);
  // const [updatedPostLike, setUpdatedPostLike] = useState(post.postLike);

  // const updateLike = async (event) => {
  //   if (post.postWhoLiked.includes(TestUID)) {
  //     alert("이미 좋아요를 누르신 게시글입니다.");
  //     return;
  //   } else {
  //     setUpdatedPostWhoLiked([...post.postWhoLiked, TestUID]);
  //     setUpdatedPostLike(updatedPostLike + 1);
  //     const postRef = doc(db, "posts", post.postId);
  //     await updateDoc(postRef, { ...post, postLike: updatedPostLike + 1, postWhoLiked: updatedPostWhoLiked });
      

  //     setUpdatedPostLike(post.postWhoLiked.length);
  //   }

  //   dispatch({
  //     type: "UPDATE_POSTLIKE",
  //     payload: {
  //       postId: post.postId,
  //       postLike: updatedPostLike + 1,
  //       postWhoLiked: updatedPostWhoLiked,
  //     },
  //   });
  // };


  return (
    <S.PostDetailBox>
      {/* <div>
        <span onClick={updateLike}>👍{updatedPostLike}</span>
      </div> */}
      <p>{post.postId}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <button
        onClick={async () => {
          console.log("post.postId check1 => ",post.postId)
          if (post.UID !== TestUID) {
            alert("회원님이 등록하신 글이 아닙니다.");
            return;
          } else if (post.UID === TestUID) {
            if (confirm("정말로 삭제하시겠습니까?")) {
              //문서아이디=필드아이디
              console.log("post.postId check2 => ",post.postId)
              const postRef = doc(db, "posts", post.postId);
              await deleteDoc(postRef);
              console.log("post.postId check3 => ",post.postId)
              dispatch({
                type: "DELETE_POST",
                payload: post.postId,
              });
            } else {
              alert("삭제를 취소하였습니다.");
            }
          }
        }}
      >
        삭제하기
      </button>
      <Link to={`/postupdate/${post.postId}`}>
        <button>수정하기</button>
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
  `,
};
