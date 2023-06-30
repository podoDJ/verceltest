import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { S } from "../star/starList.styles";
import { BiSolidLike } from "react-icons/bi";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { showMembers } from "../../redux/modules/logReducer";
// import InfiniteScroll from "react-infinite-scroll-component";

export default function StarList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const starList = useSelector((state) => state.logReducer.members);

  useEffect(() => {
    // showMembers 액션을 디스패치하여 멤버 정보 표시
    dispatch(showMembers(starList));
  }, []);

  const updateLikeHandler = async (uid, likes, isLiked) => {
    // 해당 uid와 일치하는 starList 컬렉션의 문서를 쿼리
    // where()함수 : 쿼리에 필터를 추가하기 위해 사용
    const q = query(collection(db, "starList"), where("uid", "==", uid));
    const starListRef = await getDocs(q);
    console.log("11111111", starListRef.docs[0].ref);

    // 좋아요 수와 isLiked 상태를 업데이트
    await updateDoc(starListRef.docs[0].ref, {
      likes: isLiked ? likes - 1 : likes + 1,
      isLiked: !isLiked,
    });

    // newStarList를 업데이트하여 Redux 상태에 반영
    const newStarList = starList.map((prevStar) => (prevStar.uid === uid ? { ...prevStar, likes: isLiked ? prevStar.likes - 1 : prevStar.likes + 1, isLiked: !prevStar.isLiked } : prevStar));
    dispatch(showMembers(newStarList));
  };

  return (
    <>
      <S.Title>Stellar Cooks</S.Title>
      <S.Container>
        {starList.map((star) => {
          return (
            <S.Profile key={star.uid} onClick={() => navigate(`/star/members/${star.uid} `)}>
              <S.LikesWrapper>
                <S.LikeBtn
                  onClick={(e) => {
                    // 프로필 클릭 이벤트 전파 방지
                    e.stopPropagation();
                    if (star.uid) {
                      updateLikeHandler(star.uid, star.likes, star.isLiked);
                    }
                  }}
                  isLiked={star.isLiked}
                  // uid가 없는 경우 버튼 비활성화
                  disabled={!star.uid}
                >
                  <BiSolidLike size={25} />
                </S.LikeBtn>
                <p>{star.likes || 0}</p>
              </S.LikesWrapper>
              <S.Photo src={star.photoURL} alt="member" />
              <S.Name>{star.displayName}</S.Name>
              <S.Cmt>{star.profileCmt}</S.Cmt>
            </S.Profile>
          );
        })}
      </S.Container>
    </>
  );
}
