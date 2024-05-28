import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { toast } from 'react-toastify';

function EditPost() {
    
    const { id } = useParams()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState(null)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/post/${id}`,{
            method:'GET'
        }).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    }, [id])

  

   async function updatePost(e){
        e.preventDefault()
        const formData = new FormData()
        formData.set('title',title);
        formData.set('summary',summary);
        formData.set('content',content);
        formData.set('id',id)
        if(files?.[0]){
            formData.set('file',files[0])
        }
     const response = await fetch(`http://localhost:8000/post`,{
        method:'PUT',
        body:formData,
        credentials:'include'
       })

       if(response.ok){
        setRedirect(true)
        toast.info("Post edited",{
            theme:'colored'
        })
       }
    }

    if (redirect) {
      return <Navigate to={`/post/${id}`} />
    }


    return (
        <form onSubmit={updatePost}>
            <input type='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="summary" placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    )
}

export default EditPost