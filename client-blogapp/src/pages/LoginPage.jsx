import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify';


function LoginPage() {
const [username,setUsername] = useState('');
const [password,setPassword] = useState('')
const [redirect,setRedirect] = useState(false)
const {userInfo,setUserInfo} = useContext(UserContext)

async function login(e){
    e.preventDefault();
const response =  await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
  
    if(response.ok){
       response.json().then((userInfo)=>{
        if(Object.keys(userInfo).length > 0){
          setUserInfo(userInfo) // Here on clicking the login button we are setting the userInfo to the context i.e updating the context value ,before the redirection to the main page . Since the header features in the mainpage like create post, appears ,before the redirection happens.because the create post renders only if the UserInfo gets from the response
          setRedirect(true)
        }else{
       toast.warning('Wrong credentials', {
        theme: 'colored'
      })
        }

      })
     
    }
}

if(redirect){
  return <Navigate to={'/'}/>
}
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button>Login</button>
    </form>
  )
}

export default LoginPage