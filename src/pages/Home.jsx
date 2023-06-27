import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Link to={"/post"}>전체게시글로</Link>
  )
}

export default Home