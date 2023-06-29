import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { styled } from "styled-components";
import { deletePosts, updatePostsLike } from "../../redux/modules/postWrite";

const PostDetailBrowse = ({ post, id }) => {
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.logReducer.user.uid);

  const [updatedPostWhoLiked, setUpdatedPostWhoLiked] = useState(post?.postWhoLiked || []);
  if (!post) {
    navigate("/post");
    return null;
  }

  const updateLike = async (event) => {
    if (post.postWhoLiked.includes(uid)) {
      const updatedPostWhoLiked = post.postWhoLiked.filter((like) => like !== uid);
      setUpdatedPostWhoLiked(updatedPostWhoLiked);
      const postRef = doc(db, "posts", post.postId);
      await updateDoc(postRef, { ...post, postWhoLiked: updatedPostWhoLiked });
      dispatch(
        updatePostsLike({
          postId: post.postId,
          // postLike: updatedPostLike,
          postWhoLiked: updatedPostWhoLiked,
        })
      );
    } else {
      const updatedPostWhoLiked = [...post.postWhoLiked, uid];
      setUpdatedPostWhoLiked(updatedPostWhoLiked);
      console.log("updatedPostWhoLiked==>", updatedPostWhoLiked);
      // setUpdatedPostLike(post.postWhoLiked.length);
      const postRef = doc(db, "posts", post.postId);
      console.log("postRef ==>", postRef);
      // postLike: updatedPostLike + 1 아래 updateDoc에서 얘를 뺌.
      await updateDoc(postRef, { ...post, postWhoLiked: updatedPostWhoLiked });

      dispatch(
        updatePostsLike({
          postId: post.postId,
          // postLike: updatedPostLike,
          postWhoLiked: updatedPostWhoLiked,
        })
      );
    }
  };
  return (
    <S.PostDetailBox>
      <div>
        <span onClick={updateLike}>👍{updatedPostWhoLiked.length || 0}</span>
      </div>
      <p>{post.postId}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <p>{post.postDate}</p>
      <button
        onClick={async () => {
          if (post.uid !== uid) {
            alert("회원님이 등록하신 글이 아닙니다.");
            return;
          } else if (post.uid === uid) {
            if (confirm("정말로 삭제하시겠습니까?")) {
              //문서아이디=필드아이디
              const postRef = doc(db, "posts", post.postId);
              await deleteDoc(postRef);
              dispatch(deletePosts(post.postId));
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
