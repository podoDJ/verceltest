import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import shortid from "shortid";

const PostForm = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        //navigate : 등록하기 버튼 누르면 submit하고 전체 게시글로 나옴. postdetail로 가는 방법을 찾아야 함.
        navigate("/post")
        dispatch({
          type: "ADD_POST",
          payload: {
            postId: shortid.generate(),
            postTitle,
            postBody,
          },
        });
        setPostTitle("");
        setPostBody("");
      }}
    >
      <div>
        <Link to={"/post"}>전체게시글보기</Link>
      </div>
      <div>
        <label>제목</label>
        <input
          text="text"
          name="postTitle"
          value={postTitle}
          onChange={(event) => {
            setPostTitle(event.target.value);
          }}
        />
        <label>내용</label>
        <textarea
          text="text"
          name="postTitle"
          value={postBody}
          onChange={(event) => {
            setPostBody(event.target.value);
          }}
        />
      </div>
      <button>등록하기</button>
    </form>
  );
};

export default PostForm;
