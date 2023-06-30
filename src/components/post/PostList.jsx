import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const PostList = () => {
  const posts = useSelector((state) => {
    return state.posts;
  });
  const navigate = useNavigate();
  // console.log(typeof posts[0].postDate);

  const sortByDate = (a, b) => {
    return new Date(a.postDate).getTime() - new Date(b.postDate).getTime();
  };
  const sortedPosts = posts.sort(sortByDate).reverse();

  return (
    <>
      <S.Title>All post</S.Title>
      <S.PostWriteBox onClick={() => navigate("/postcreate")}>글 작성하기</S.PostWriteBox>
      <S.PostingBoxCtn>
        {sortedPosts.map((post) => {
          console.log(post);
          console.log(post);
          return (
            <S.PostingBox onClick={() => navigate(`/post/${post.postId}`)} key={post.postId}>
              {/* <p>글 아이디: {post.postId}</p> */}
              <S.PostingFoodPhoto src={post.photoURL} />
              <S.PostingTitle>{post.postTitle}</S.PostingTitle>

              {/* <S.PostingBody>{post.display}</S.PostingBody> */}
              <S.PostingBody>작성자</S.PostingBody>
              <S.PostingLike> 👍🏻 {post.postWhoLiked?.length || 0}</S.PostingLike>
              {/* <p>uid: {post.uid}</p> */}
              <p> {post.postDate.slice(0, 11)}</p>
            </S.PostingBox>
          );
        })}
      </S.PostingBoxCtn>
    </>
  );
};

export default PostList;

const S = {
  Title: styled.p`
    font-size: 2rem;
    font-weight: bold;
    margin: 40px auto;
    color: #4d4d4d;
    text-align: center;
  `,
  PostWriteBox: styled.div`
    background-color: white;
    width: 1200px;
    height: 80px;
    border-radius: 20px;
    cursor: pointer;
  `,
  PostingBoxCtn: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,

  PostingBox: styled.div`
    width: 240px;
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
  `,
  PostingFoodPhoto: styled.img`
    width: 230px;
    height: 230px;
    border-radius: 5px;
    margin-top: 5px;
  `,

  PostingTitle: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 20px;
  `,
  PostingBody: styled.p`
    padding-bottom: 10px;
  `,
  PostingLike: styled.div`
    float: right;
  `,
};
