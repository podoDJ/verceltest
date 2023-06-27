import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetailBrowse = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts)
  const post = posts.filter((post) => post.postId === id)[0]
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div>
      <p>{post.postId}</p>
      <p>{post.postTitle}</p>
      <p>{post.postBody}</p>
      <button onClick={()=>{
        navigate("/post")
        dispatch({
          type: "DELETE_POST",
          payload: post.postId
        })
      }}>삭제하기</button>
    </div>
  )
}

export default PostDetailBrowse