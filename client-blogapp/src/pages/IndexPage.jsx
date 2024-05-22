import React, { useEffect, useState } from 'react'
import Post from '../components/Post'



function IndexPage() {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
   fetch('http://localhost:8000/post',{
    method:'GET'
   }).then(response => {
    response.json().then(postDoc => {
    setPosts(postDoc);
   })
  })
  },[])
  return (
       posts?.length>0 && posts.map(post => (
      <Post post = {post}/>
    ))
  
  )
}

export default IndexPage