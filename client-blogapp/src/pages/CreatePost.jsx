import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';



function CreatePost() {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState(false)
    async function createNewPost(e){
      e.preventDefault()
      const formData = new FormData()
      formData.set('title',title)
      formData.set('summary',summary)
      formData.set('content',content)
      formData.set('file',files[0])
  
      const response = await fetch('http://localhost:8000/post',{
        method:'POST',
        body:formData,
        credentials:'include'
      })
      if(response.ok){
       setRedirect(true)
      }
    }

    if(redirect){
     return <Navigate to={'/'}/>
    }
  return (
    <form onSubmit={createNewPost}>
        <input type='title' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <input type="summary" placeholder='Summary' value={summary} onChange={(e)=>setSummary(e.target.value)}/>
        <input type="file"  onChange={(e)=> setFiles(e.target.files)}/>
        <Editor value={content} onChange={setContent} />
        <button style={{marginTop:'5px',backgroundColor:'#32CD32',fontWeight:'700'}}>Create post</button>
    </form>
  )
}

export default CreatePost