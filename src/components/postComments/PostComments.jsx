import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, REMOVE_COMMENT, baseComment } from "../../redux/modules/comment";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Await, Link } from "react-router-dom";
import { styled } from "styled-components";
import CommentChange from "./CommentChange";

const PostComments = ({ post, id }) => {
  const uid = useSelector((state) => state.logReducer.user.uid);
  console.log(uid);
  const comments = useSelector((state) => {
    return state.comment;
  });

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [isModal, setIsModal] = useState(false);
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
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
      <StTitle>댓글</StTitle>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!comment) {
            alert("내용을 추가해주세요");
            return false;
          }

          const collectionRef = collection(db, "comments");
          const docRef = await addDoc(collectionRef, { comment });
          const commentDocRef = doc(db, "comments", docRef.id);
          await setDoc(commentDocRef, { commentId: docRef.id, postId: id, userId: uid }, { merge: true });

          dispatch({
            type: ADD_COMMENT,
            payload: {
              postId: post.id,
              userId: uid,
              commentId: docRef.id,

              comment,
            },
          });
        }}
      >
        <StinputText
          type="text"
          placeholder="내용을적어주세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <Stbutton>작성</Stbutton>
      </form>

      <div>
        {comments
          .filter((item) => {
            return item.postId === id;
          })
          .map((comment) => {
            const isOpen = comment.userId === uid;

            return (
              <Stlist key={comment.commentId}>
                <StCommentList>
                  <p>{comment.title}</p>
                  <p>{comment.comment}</p>
                </StCommentList>

                {isOpen && <Stbutton onClick={openModal}>수정</Stbutton>}
                {isModal && (
                  // <Link to={`/post/commentup/${comment.commentId}`}>
                  //   <button>수정</button>
                  // </Link>
                  <StModalBox>
                    <StModalContents>
                      <CommentChange closeModal={closeModal} />
                    </StModalContents>
                  </StModalBox>
                )}

                {isOpen && (
                  <Stbutton
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
                  </Stbutton>
                )}
              </Stlist>
            );
          })}
      </div>
    </div>
  );
};

export default PostComments;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 17%;
  height: 10%;
  border-radius: 12px;
`;
const StinputText = styled.input`
  width: 35%;
  height: 25px;
  margin-left: 10%;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid rgba(77, 77, 77, 0.5);
`;
const StCommentList = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 1px solid rgba(77, 77, 77, 0.5);
  margin-top: 10px;
  width: 60%;
  height: 25px;
`;
const Stbutton = styled.button`
  width: 45px;
  height: 28px;
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  background: var(--color-accent);
  cursor: pointer;
  margin-left: 10px;
`;
const Stlist = styled.div`
  margin-left: 10%;
  width: 60%;
`;
const StTitle = styled.div`
  margin-left: 40%;
  margin-top: 25px;
`;
