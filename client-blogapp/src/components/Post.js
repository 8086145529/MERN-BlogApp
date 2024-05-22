import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/image2.webp'
import { formatISO9075 } from "date-fns";

function Post({ post }) {
  const { _id, title, summary, content, filePath, createdAt, author } = post
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:8000/${filePath}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a className='author'>{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>

    </div>
  )
}

export default Post


