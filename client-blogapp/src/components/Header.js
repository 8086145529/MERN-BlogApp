import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
function Header() {
 const {userInfo,setUserInfo} = useContext(UserContext)
 const navigate = useNavigate();

useEffect(() => {
  const cookie = document.cookie
  // console.log(cookie);
  fetch('http://localhost:8000/profile', {
    credentials: 'include',
  }).then(response => {
    response.json().then(userInfo => {
      setUserInfo(userInfo)

    });
  });
}, []);


// With the logout function we need to invalidate the cookie
function logout(){
  fetch('http://localhost:8000/logout',{
    credentials:'include',
    method:'POST'
  });
  setUserInfo(null)//Resetting the value of the state to null to remove the userinfo data storedin it on the mounting of this Header component
  navigate('/login')
}



const username = userInfo?.username;

  return (
    <header>
    <Link to="/" className="logo">MyBlog</Link>
    <nav>
      {username && (
        <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Logout ({username})</a>
        </>
      )}
      {!username && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
  )
}

export default Header