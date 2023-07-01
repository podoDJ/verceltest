import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { UPDATE_COMMENT } from "../../redux/modules/comment";

const CommentChange = ({ commentId, closeModal }) => {
  const navigate = useNavigate();
  const [uptitle, setUpTitle] = useState();
  const [upComment, setUpComment] = useState();
  const { id } = useParams();
  const comments = useSelector((state) => state.comment);
  const comment = comments.find((comment) => comment.commentId === id);

  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!uptitle || !upComment) {
            alert("내용을 추가해주세요");
            return false;
          }

          const commentRef = doc(db, "comments", comment.commentId);

          await updateDoc(commentRef, { ...comment, title: uptitle, comment: upComment });
          dispatch({
            type: UPDATE_COMMENT,
            payload: {
              title: uptitle,
              comment: upComment,
              postId: id,
              commentId,
            },
          });
        }}
      >
        <input
          type="text"
          value={uptitle || ""}
          onChange={(e) => {
            setUpTitle(e.target.value);
          }}
        />
        <br />
        <input
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
