import React from 'react'
import ReactQuill from 'react-quill'


function Editor({value,onChange}) {
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }


  return (
    <ReactQuill theme='snow'  value={value} onChange={onChange} modules={modules} />
  )
}

export default Editor