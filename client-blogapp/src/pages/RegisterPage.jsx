import React, { useState } from 'react'
import { toast } from 'react-toastify';

function RegisterPage() {
const [username,setUsername] = useState('');
const [password,setPassword] = useState('')

async function register(ev) {
  ev.preventDefault();
 const response = await fetch('http://localhost:8000/register', {
    method: 'POST',
    body: JSON.stringify({username,password}),
    headers: {'Content-Type':'application/json'},
  });
  if (response.status === 200) {
    toast.success("Registration successful",{
      theme:'colored'
  })
  } else {
    toast.warning("Registration failed",{
      theme:'colored'
  })
  }
}

  return (
    <form className="register" onSubmit={register}>
    <h1>Register</h1>
    <input type="text"
           placeholder="username"
           value={username}
           onChange={e => setUsername(e.target.value)}/>
    <input type="password"
           placeholder="password"
           value={password}
           onChange={e => setPassword(e.target.value)}/>
    <button>Register</button>
  </form>
  )
}

export default RegisterPage