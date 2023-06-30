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
      // setUpdatedPostLike(post.postWhoLiked.length);
      const postRef = doc(db, "posts", post.postId);
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
    <>
      <S.Btn marginTop="10px" onClick={() => navigate("/post")}>POST로 이동</S.Btn>
      <S.PostDetailBox>
        <div>
          {/* 삼항연산자로 uid가 false(undefined)일 경우 updateLike 함수 실행, 아닐 경우 alert창 띄우는 익명함수 실행. ()=> 이부분이 포인트 */}
          <span onClick={uid ? updateLike : () => alert("로그인 후 이용 바랍니다.")}>👍🏻{updatedPostWhoLiked.length || 0}</span>
        </div>
        <p>{post.postId}</p>
        <p>{post.postTitle}</p>
        <S.PostImg src={post.photoURL} photoURL={post.photoURL} />
        <p>{post.postBody}</p>
        <p>{post.postIngredient}</p>
        <p>{post.postRecipe}</p>
        <p>{post.postDate}</p>
        <p>{post.uid}</p>

        <S.PostBtnCtn uid={uid} postuid={post.uid}>
          <S.Btn
            onClick={async () => {
              if (post.uid !== uid) {
                alert("회원님이 등록하신 글이 아닙니다.");
                return;
              } else if (post.uid === uid) {
                if (window.confirm("정말로 삭제하시겠습니까?")) {
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
          </S.Btn>
          <Link to={`/postupdate/${post.postId}`}>
            <S.Btn>수정하기</S.Btn>
          </Link>
        </S.PostBtnCtn>
      </S.PostDetailBox>
    </>
  );
};

export default PostDetailBrowse;

const S = {
  PostDetailBox: styled.div`
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
  `,
  PostBtnCtn: styled.div`
    display: ${(props) => props.uid === props.postuid ? "flex" : "none"};
  `,
  Btn: styled.button`
    width: 200px;
    height: 40px;
    color: white;
    background-color: #b46060;
    border-color: transparent;
    border-radius: 10px;
    margin-top: ${(props) => props.marginTop ? props.marginTop : "30px"};
    cursor: pointer;
  `,
  PostImg: styled.img`
    display: ${(props) => props.photoURL ? "flex" : "none"};
  `
};
