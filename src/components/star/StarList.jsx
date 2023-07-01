import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";
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

  const updateLikeHandler = async (memberId) => {
    // 해당 uid와 일치하는 starList 컬렉션의 문서를 쿼리
    // where()함수 : 쿼리에 필터를 추가하기 위해 사용

    let target = {};

    const q = query(collection(db, "members"), where("memberId", "==", memberId));
    const docSnap = await getDocs(q);
    docSnap.forEach(async (x) => {
      target.id = x.id;
      target.likes = x.data().likes;
      // target.isLiked = x.data().isLiked;
    });

    await updateDoc(doc(db, "members", target.id), { likes: target.likes + 1, isLiked: true });

    const newStarList = starList.map((x) => (x.memberId === memberId ? { ...x, likes: x.likes + 1 } : x));
    dispatch(showMembers(newStarList));
  };

  // // 좋아요 수를 1 증가시킴
  // await updateDoc(q, {
  //   likes: likes + 1,
  // });

  // console.log("1", starListRef.docs[0].ref);
  // newStarList를 업데이트하여 Redux 상태에 반영

  // };

  return (
    <>
      <S.Title>Stellar Cooks</S.Title>
      <S.Container>
        {starList.map((star) => {
          return (
            <S.Profile key={star.memberId} onClick={() => navigate(`/star/members/${star.memberId}/guestbook `)}>
              <S.LikesWrapper>
                <S.LikeBtn
                  onClick={(e) => {
                    // 프로필 클릭 이벤트 전파 방지
                    e.stopPropagation();
                    updateLikeHandler(star.memberId);
                  }}
                  // star.isLiked이 true일 때만 liked prop을 전달
                  isLiked={star.isLiked ? true : undefined}
                >
                  <BiSolidLike size={25} />
                </S.LikeBtn>
                <S.LikeCut>{star.likes || 0}</S.LikeCut>
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
