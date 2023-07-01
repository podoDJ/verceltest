import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { UPDATE_COMMENT } from "../../redux/modules/comment";
import { styled } from "styled-components";

const CommentChange = ({ commentId, closeModal }) => {
  const navigate = useNavigate();
  const { id } = useParams;
  const [upComment, setUpComment] = useState();

  const comments = useSelector((state) => state.comment);
  const comment = comments.find((comment) => comment.commentId === commentId);
  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!upComment) {
            alert("내용을 추가해주세요");
            return false;
          }
          closeModal(false);

          const commentRef = doc(db, "comments", comment.commentId);
          await updateDoc(commentRef, { ...comment, comment: upComment });
          dispatch({
            type: UPDATE_COMMENT,
            payload: {
              comment: upComment,
              postId: id,
              commentId,
            },
          });
        }}
      >
        <br />
        <StUpInput
          type="text"
          value={upComment || ""}
          onChange={(e) => {
            setUpComment(e.target.value);
          }}
        />
        <br />
        <button>수정</button>
        <button onClick={closeModal}>닫기</button>
      </form>
    </div>
  );
};

export default CommentChange;

// const StxButton = styled.button`
//   display: flex;
//   bottom: 100px;
//   right: -250px;
//   position: relative;
// `;
const StUpInput = styled.input`
  display: flex;
  position: relative;
  width: 80%;
  height: 30px;
`;
