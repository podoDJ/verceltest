import React, { useEffect, useState } from "react";
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
  console.log("post.postId check0 => ", posts);
  const post = posts.filter((post) => post.postId === id)[0];

  if (!post) {
    navigate("/post");
    return null;
  }

  console.log("포스트브라우저의 포스트 : ", post);

  //좋아요 기능. 근데 state가 쓸모가 있는건가????
  const [updatedPostWhoLiked, setUpdatedPostWhoLiked] = useState(post.postWhoLiked || []);

  const updateLike = async (event) => {
    if (post.postWhoLiked.includes(TestUID)) {
      alert("이미 좋아요를 누르신 게시글입니다.");
      return;
    } else {
      const updatedWhoLiked = [...post.postWhoLiked, TestUID];
      setUpdatedPostWhoLiked(updatedWhoLiked);
      console.log("updatedPostWhoLiked==>", updatedWhoLiked);
      // setUpdatedPostLike(post.postWhoLiked.length);
      const postRef = doc(db, "posts", post.postId);
      console.log("postRef ==>", postRef);
      // postLike: updatedPostLike + 1 아래 updateDoc에서 얘를 뺌.
      await updateDoc(postRef, { ...post, postWhoLiked: updatedWhoLiked });

      dispatch({
        type: "UPDATE_POSTLIKE",
        payload: {
          postId: post.postId,
          // postLike: updatedPostLike,
          postWhoLiked: updatedWhoLiked,
        },
      });
    }
  };
  return (
    <S.PostDetailBox>
      <div>
        <span onClick={updateLike}>👍{post?.postWhoLiked?.length || 0}</span>
      </div>
      <p>{post.postId}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <p>{post.postDate}</p>
      <button
        onClick={async () => {
          if (post.UID !== TestUID) {
            alert("회원님이 등록하신 글이 아닙니다.");
            return;
          } else if (post.UID === TestUID) {
            if (confirm("정말로 삭제하시겠습니까?")) {
              //문서아이디=필드아이디
              const postRef = doc(db, "posts", post.postId);
              await deleteDoc(postRef);
              dispatch({
                type: "DELETE_POST",
                payload: post.postId,
              });
              navigate("/post");
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
