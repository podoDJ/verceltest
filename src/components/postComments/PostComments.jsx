import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT, REMOVE_COMMENT, baseComment } from "../../redux/modules/comment";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const PostComments = ({ post, id }) => {
  const uid = useSelector((state) => state.logReducer.user.uid);
  console.log("uid =>", uid);

  const comments = useSelector((state) => {
    return state.comment;
  });
  console.log("commentsssss", comments);

  const dispatch = useDispatch();
  //console.log(comments);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  // 함수의 리턴값 const abc  = (a)=> return a+1  abc(1) const b = abc(1512341)
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "comments"));
      console.log("q", q);
      const querySnapshot = await getDocs(q);
      console.log("query", querySnapshot);
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
          const collectionRef = collection(db, "comments");
          const docRef = await addDoc(collectionRef, { title, comment });
          console.log(docRef.id);
          const commentDocRef = doc(db, "comments", docRef.id);
          await setDoc(commentDocRef, { commentId: docRef.id, postId: post.id, userId: uid }, { merge: true });
          dispatch({
            type: ADD_COMMENT,
            payload: {
              uid: uid,
              commentId: docRef.id,
              title,
              comment,
              postId: post.id,
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
        {console.log("comments", comments)}
        {comments
          .filter((item) => {
            return item.postId === id;
          })
          .map((comment) => {
            const isOpen = comment.userId === uid;
            console.log(isOpen);
            return (
              <div key={comment.commentId}>
                <p>{comment.commentId}</p>
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
                      console.log("commentRef=>", commentRef);
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostComments;
