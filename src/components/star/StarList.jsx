import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";
import { BiSolidLike } from "react-icons/bi";

export default function StarList() {
  const [starList, setStarList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "starList"));
      const querySnapshot = await getDocs(q);
      const initialStarList = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.uid,
          ...doc.data(),
        };
        console.log("data", data);
        initialStarList.push(data);
      });
      setStarList(initialStarList);
    };
    fetchData();
  }, []);

  const handleLike = () => {
    addDoc(collection(db, "starList"));
    // setIsLiked(!isLiked);
  };

  return (
    <>
      <Title>Stellar Cooks</Title>
      <Container>
        {starList.map((star) => {
          return (
            <Profile key={star.uid}>
              <LikesWrapper>
                <LikeBtn onClick={handleLike}>
                  <BiSolidLike size={25} />
                </LikeBtn>
                <p>{star.likes}</p>
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
  margin-left: 180px;
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
