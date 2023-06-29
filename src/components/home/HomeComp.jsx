import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { sortLikePosts, showPosts } from "../../redux/modules/postWrite";
import { useEffect } from "react";
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../../../src/firebase";
import { showMembers, sortLikeMembers } from "../../redux/modules/logReducer";

const HomeComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const newArr = [];
    const fetchPostsData = async () => {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newArr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(showPosts(newArr));
      dispatch(sortLikePosts());
    };
    fetchPostsData();

    const fetchMemberData = async () => {
      // q = 요청 객체
      const q = query(collection(db, "starList"));
      const querySnapshot = await getDocs(q);
      const initialStarList = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialStarList.push(data);
      });
      dispatch(showMembers(initialStarList));
      dispatch(sortLikeMembers());
    };
    fetchMemberData();
  }, []);

  const popPosts = useSelector((state) => state.posts);
  console.log("popPosts", popPosts);

  const StarList = useSelector((state) => {
    return state.logReducer.members;
  });
  console.log("StarList", StarList.slice(0, 5));

  return (
    <>
      <S.Container>
        <p>인기 게시글</p>
        <S.CardContainer>
          {popPosts.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id}>
                <p>{item.postWhoLiked?.length || 0}</p>
                <p>{item.postTitle}</p>
                <p>{item.postDate}</p>
                <p>작성자</p>
              </S.Card>
            );
          })}
        </S.CardContainer>
      </S.Container>
      <S.Container>
        <p>인기 멤버</p>
        <S.CardContainer>
          {StarList.slice(0, 5).map((item) => {
            return (
              <S.Card key={item.id}>
                <p>{item.displayName}</p>
                <p>{item.likes}</p>
                <p>게시글</p>
              </S.Card>
            );
          })}
        </S.CardContainer>
      </S.Container>
    </>
  );
};

export default HomeComp;

const S = {
  Container: styled.div``,
  CardContainer: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
    padding: 20px;
  `,
  Card: styled.div`
    background-color: white;
    min-width: 250px;
    height: 400px;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
  `,
};
