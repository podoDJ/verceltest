import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, unstable_HistoryRouter, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { updatePosts } from "../redux/modules/postWrite";
import { styled } from "styled-components";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostBody, setUpdatePostBody] = useState("");
  const [updatedPostIngredient, setUpdatedPostIngredient] = useState("");
  const [updatedPostRecipe, setUpdatedPostRecipe] = useState("");

  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === id)[0];
  console.log("post가 =>>", id);
  if (!post) {
    navigate("/post");
    return;
  }

  return (
    <>
      <div>
        <Link to={"/post"}>전체게시글보기</Link>
      </div>
      <S.UpdatePostForm
        onSubmit={async (event) => {
          event.preventDefault();
          const postRef = doc(db, "posts", post.postId);
          await updateDoc(postRef, { ...post, postTitle: updatePostTitle, postBody: updatePostBody });
          console.log("postRef", postRef);
          dispatch(
            updatePosts({
              postId: id,
              postTitle: updatePostTitle,
              postBody: updatePostBody,
              postIngredient: updatedPostIngredient,
              postRecipe: updatedPostRecipe,
            })
          );
          navigate(`/post/${id}`);
        }}
      >
        <div>
          <div>
            <S.UpdatePostLabel for="updatePostTitle">오늘의 혼쿡</S.UpdatePostLabel>
            <S.UpdatePostInput
              text="text"
              name="updatePostTitle"
              value={updatePostTitle}
              placeholder={post.postTitle}
              onChange={(event) => {
                setUpdatePostTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <S.UpdatePostLabel for="updatePostBody">CooK'Story</S.UpdatePostLabel>
            <S.UpdatePostTextarea
              text="text"
              name="updatePostBody"
              value={updatePostBody}
              placeholder={post.postTitle}
              onChange={(event) => {
                setUpdatePostBody(event.target.value);
              }}
            />
          </div>

          <div>
            <S.UpdatePostLabel for="updatedPostIngredient">오늘의 재료</S.UpdatePostLabel>
            <S.UpdatePostTextarea
              text="text"
              name="updatedPostIngredient"
              value={updatedPostIngredient}
              placeholder={post.postTitle}
              onChange={(event) => {
                setUpdatedPostIngredient(event.target.value);
              }}
            />
          </div>

          <div>
            <S.UpdatePostLabel for="updatedPostRecipe">레시피</S.UpdatePostLabel>
            <S.UpdatePostTextarea
              text="text"
              name="updatedPostRecipe"
              value={updatedPostRecipe}
              placeholder={post.postTitle}
              onChange={(event) => {
                setUpdatedPostRecipe(event.target.value);
              }}
            />
          </div>
        </div>
        <S.UpdateBtnCtn>
          <S.UpdatePostBtn>수정완료</S.UpdatePostBtn>
          {/* type="button"으로 form의 자동 onSubmit 속성 해제.
        window.history.back()은 뒤로가는 메서드(window.history : 윈도우 히스토리 객체) */}
          <S.UpdatePostBtn
            type="button"
            onClick={() => {
              if (window.confirm("취소하시겠습니까?")) {
                window.history.back();
              } else {
                return;
              }
            }}
          >
            취소
          </S.UpdatePostBtn>
        </S.UpdateBtnCtn>
      </S.UpdatePostForm>
    </>
  );
};

export default PostUpdate;

const S = {
  UpdatePostForm: styled.form`
    background-color: #ffbf9b;
    color: #4d4d4d;
    width: 500px;
    height: 700px;
    margin: auto;
    padding: 50px;
    border-radius: 20px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  UpdatePostLabel: styled.label`
    font-size: 20px;
    font-weight: 700;
    margin: 0 auto 20px 10px;
  `,

  UpdatePostInput: styled.input`
    width: 500px;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    border-color: transparent;
    font-size: 18px;
  `,

  UpdatePostTextarea: styled.textarea`
    width: 500px;
    height: 100px;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    border-color: transparent;
    font-size: 18px;
    resize: none;
    /* 스크롤바 설정. https://www.geeksforgeeks.org/how-to-style-scrollbar-thumb-for-the-webkit-browsers-and-what-are-components-of-scrollbar/ */
    overflow: auto;
    scrollbar-width: thin; /* Set the width of the scrollbar */
    scrollbar-color: transparent; /* Set the color of the scrollbar */
    &::-webkit-scrollbar {
      width: 1px; /* Set the width of the scrollbar */
    }
  `,

  UpdatePostBtn: styled.button`
    width: 200px;
    height: 40px;
    color: white;
    background-color: #b46060;
    border-color: transparent;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 20px;
    cursor: pointer;
  `,

  UpdateBtnCtn: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,
};
