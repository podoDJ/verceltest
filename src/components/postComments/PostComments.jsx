import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, REMOVE_COMMENT, baseComment } from "../../redux/modules/comment";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Await, Link } from "react-router-dom";
import { styled } from "styled-components";

const PostComments = ({ post, id }) => {
  const uid = useSelector((state) => state.logReducer.user.uid);
  const comments = useSelector((state) => {
    return state.comment;
  });

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  // 함수의 리턴값 const abc  = (a)=> return a+1  abc(1) const b = abc(1512341)
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);
      const abc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch(baseComment(abc));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h3>댓글</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!title || !comment) {
            alert("내용을 추가해주세요");
            return false;
          }

          const collectionRef = collection(db, "comments");
          const docRef = await addDoc(collectionRef, { title, comment });
          const commentDocRef = doc(db, "comments", docRef.id);
          await setDoc(commentDocRef, { commentId: docRef.id, postId: id, userId: id }, { merge: true });

          dispatch({
            type: ADD_COMMENT,
            payload: {
              postId: post.id,
              userId: uid,
              commentId: docRef.id,
              title,
              comment,
            },
          });
        }}
      >
        <input
          type="text"
          placeholder="제목을적어주세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="내용을적어주세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <button>작성</button>
      </form>

      <div>
        {comments
          .filter((item) => {
            return item.postId === id;
          })
          .map((comment) => {
            const isOpen = comment.userId === uid;

            return (
              <Stspan key={comment.commentId}>
                <p>{comment.title}</p>
                <p>{comment.comment}</p>
                {isOpen && (
                  <Link to={`/post/commentup/${comment.commentId}`}>
                    <button>수정</button>
                  </Link>
                )}

                {isOpen && (
                  <button
                    onClick={async () => {
                      const commentRef = doc(db, "comments", comment.commentId);
                      await deleteDoc(commentRef);

                      dispatch({
                        type: REMOVE_COMMENT,
                        payload: comment.commentId,
                      });
                    }}
                  >
                    삭제
                  </button>
                )}
              </Stspan>
            );
          })}
      </div>
    </div>
  );
};

export default PostComments;

const Stspan = styled.div`
  display: flex;
  border: 1px solid black;
`;

// const StModalBox = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StModalContents = styled.div`
//   background-color: #fff;
//   padding: 20px;
//   width: 70%;
//   height: 50%;
//   border-radius: 12px;
// `;
// const StButton = styled.button`
//   border: none;
//   cursor: pointer;
//   border-radius: 8px;
//   background-color: rgb(85, 239, 196);
//   color: rgb(0, 0, 0);
//   height: 40px;
//   width: 100px;
// `;
