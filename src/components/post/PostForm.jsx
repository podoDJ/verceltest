import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { addPosts } from "../../redux/modules/postWrite";
import { styled } from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

const PostForm = () => {
  //uid는 여기서 가져옵니다.
  const uid = useSelector((state) => state.logReducer.user.uid);
  console.log("uid =>", uid);

  // const postLike = 0
  const postWhoLiked = [];
  //========================오늘 날짜 불러오는 함수==============================//
  const today = new Date(); // 현재 날짜와 시간을 가져옴
  const year = today.getFullYear(); // 연도를 가져옴
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월을 가져오고, 한 자리 수인 경우 앞에 0을 추가
  const day = String(today.getDate()).padStart(2, "0"); // 일을 가져오고, 한 자리 수인 경우 앞에 0을 추가
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  const postDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 연도, 월, 일을 조합하여 날짜 문자열 생성
  //========================오늘 날짜 불러오는 함수==============================//
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postIngredient, setPostIngredient] = useState("");
  const [postRecipe, setPostRecipe] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ========================
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const photoURL = await getDownloadURL(imageRef);
    setPhotoURL(photoURL);
  };
  console.log("ssss", photoURL);
  return (
    <>
      <div>
        <Link to={"/post"}>전체게시글보기</Link>
      </div>
      <S.PostForm
        onSubmit={async (event) => {
          event.preventDefault();
          // 이전에 사용했던 방법: const newPost = { postId: shortid.generate(), postTitle, postBody };
          const collectionRef = collection(db, "posts");
          const docRef = await addDoc(collectionRef, { postTitle, postBody, uid, postWhoLiked, postDate, photoURL });

          // 도큐먼트 아이디가 바로 필드에 반영되도록 하는 코드
          const postDocRef = doc(db, "posts", docRef.id);
          await setDoc(postDocRef, { postId: docRef.id }, { merge: true });

          //navigate : 등록하기 버튼 누르면 submit하고 전체 게시글로 나옴. postdetail로 가는 방법을 찾아야 함. (DJ : 해결)

          // dispatch 전에 async await로 통신 보내고 통신 보내면 아래 dispatch가 진행됨.
          // or .then
          // reducer로 새 데이터 넘겨주기
          dispatch(
            addPosts({
              postId: docRef.id,
              postTitle,
              postBody,
              postIngredient,
              postRecipe,
              uid,
              // postLike,
              postWhoLiked,
              postDate,
              photoURL,
            })),
          setPostTitle("");
          setPostBody("");
          navigate(`/post/${docRef.id}`);
        }}
      >
        <div>
          <div>
            <S.PostLabel for="postTitle">오늘의 혼쿡</S.PostLabel>
            <S.PostInput
              text="text"
              name="postTitle"
              value={postTitle}
              onChange={(event) => {
                setPostTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <S.PostLabel for="postBody">CooK'Story</S.PostLabel>
            <S.PostTextarea
              text="text"
              name="postBody"
              value={postBody}
              onChange={(event) => {
                setPostBody(event.target.value);
              }}
            />
          </div>

          <div>
            <S.PostLabel for="postIngredient">오늘의 재료</S.PostLabel>
            <S.PostTextarea
              text="text"
              name="postIngredient"
              value={postIngredient}
              onChange={(event) => {
                setPostIngredient(event.target.value);
              }}
            />
          </div>

          <div>
            <S.PostLabel for="postRecipe">레시피</S.PostLabel>
            <S.PostTextarea
              text="text"
              name="postRecipe"
              value={postRecipe}
              onChange={(event) => {
                setPostRecipe(event.target.value);
              }}
            />
          </div>
        </div>
        
        <div style={{ backgroundColor: "green", height: "200px" }}>
          <input type="file" onChange={handleFileSelect} />
          <button onClick={handleUpload}>업로드</button>
        </div>
        <S.PostBtnCtn>
          <S.PostBtn>등록하기</S.PostBtn>
        {/* window.history.back()은 뒤로가는 메서드(window.history : 윈도우 히스토리 객체) */}
        <S.PostBtn type="button" onClick={() => {window.history.back()}}>취소</S.PostBtn>
        </S.PostBtnCtn>
        
      </S.PostForm>
    </>
  );
};

export default PostForm;

const S = {
  PostForm: styled.form`
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
  PostLabel: styled.label`
    font-size: 20px;
    font-weight: 700;
    margin: 0 auto 20px 10px;
  `,

  PostInput: styled.input`
    width: 500px;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 10px;
    border-color: transparent;
    font-size: 18px;
  `,

  PostTextarea: styled.textarea`
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
    scrollbar-width: thin; /* 스크롤바 너비설정 */
    scrollbar-color: transparent; /* 스크롤바 색깔 설정 */
    &::-webkit-scrollbar {
      width: 1px; /* Set the width of the scrollbar */
    }
  `,

  PostBtn: styled.button`
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

  PostBtnCtn: styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
};
