import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function StarList() {
  const navigate = useNavigate();
  const [starList, setStarList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, "starList"));
    const querySnapshot = await getDocs(q);
    const initialStarList = [];
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.uid,
        isLiked: false,
        ...doc.data(),
      };
      // console.log("data", data);
      initialStarList.push(data);
    });
    setStarList(initialStarList);
  };

  const handleLike = async (id) => {
    const starDocRef = doc(db, "starList", id);
    const starDocSnapshot = await getDoc(starDocRef);
    console.log("db", db);
    if (starDocSnapshot.exists()) {
      // 현재 좋아요 수 가져오기
      const currentLikes = starDocSnapshot.data().likes || 0;

      // 좋아요 수 업데이트
      await updateDoc(starDocRef, {
        likes: currentLikes + 1,
      });
      setStarList((prevStarList) => prevStarList.map((star) => (star.id === id ? { ...star, isLiked: true } : star)));
      // 데이터 다시 불러오기
      fetchData();
    }
    // await addDoc(collection(db, "starList"), );
  };

  return (
    <>
      <Title>Stellar Cooks</Title>
      <Container>
        {starList.map((star) => {
          return (
            <Profile key={star.uid} onClick={() => navigate(`/star/members/${star.uid}`)}>
              <LikesWrapper>
                <LikeBtn onClick={() => handleLike(star.id)} isLiked={star.isLiked}>
                  <BiSolidLike size={25} />
                </LikeBtn>
                <p>{star.likes || 0}</p>
              </LikesWrapper>
              <Photo src={star.photoURL} alt="member" />
              <Name>{star.displayName}</Name>
              <Cmt>{star.profileCmt}</Cmt>
            </Profile>
          );
        })}
      </Container>
    </>
  );
}

const Title = styled.h2`
  text-align: center;
  font-size: 3rem;
  padding-top: 70px;
  padding-bottom: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Profile = styled.div`
  width: 220px;
  text-align: center;
  padding: 1rem;
  background-color: var(--color-white);
  border-radius: 20px;
  box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  margin: 10px;
  -webkit-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 7px 5px 23px -9px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
    transform: translateY(-10px);
  }
`;

const LikesWrapper = styled.div`
  margin-left: 180px;
`;

const LikeBtn = styled.button`
  cursor: pointer;
  border: none;
  /* margin-left: 180px; */
  background-color: var(--color-white);
  color: ${({ isLiked }) => (isLiked ? "#B46060" : "#D3D3D3")};

  &:hover {
    color: #b46060;
  }
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;
`;

const Cmt = styled.p`
  padding-bottom: 10px;
`;
