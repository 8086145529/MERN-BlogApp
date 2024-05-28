const express = require('express');
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const User = require('./models/User')
const Post = require('./models/Post')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const multer  = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);// For hashing password
dotenv.config();// 1. This loads/moves environment variables (like PORT) from the .env file into process.env.So that we can aceess the environment variable using process.env
const PORT = process.env.PORT || 7000
const MONGOURL =process.env.MONGO_URL;

const JWT_SECRET = process.env.secret

app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname + '/uploads'))


mongoose.connect(MONGOURL).then(()=>{
  console.log("Database is connected successfully");
  app.listen(PORT,()=>{ // define the route where the server runs
    console.log(`Server is running on port ${PORT}`);
  })
}).catch((error)=>console.log(`${error} didn't connect`));

// mongoose.connect('mongodb://127.0.0.1/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connect('mongodb+srv://new-user:test2024@cluster0.qv3i2uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// mongoose.connect('mongodb+srv://shafanafaiza:WbxeHSprlRVkBr7x@cluster0.qv3i2uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// mongodb+srv://shafanafaiza:WbxeHSprlRVkBr7x@cluster0.qv3i2uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 


app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});


app.post('/login',async(req,res)=>{
  try{
    const {username,password} = req.body
  const userDoc = await User.findOne({username:username})
  // const pswdOk gives 'true' on response when the password from the request matches with the password stored on database
 const pswdOk = bcrypt.compareSync(password,userDoc.password)
  if(pswdOk){
    // User is logged in
   jwt.sign({username:userDoc.username,id:userDoc._id},JWT_SECRET,{},(err,token)=>{
       if(err) throw err;

      res.cookie('token',token).json({
        username:userDoc.username,
        id:userDoc._id
      })// Here we are setting the jwt token into a cookie with naming the cookie as 'token' and sending the cookie and username and id of user as the json to frontend        
      })
  }

  }catch(err){
    res.json(err)
  }
})


app.get('/profile',(req,res) =>{
  const {token} = req.cookies
  jwt.verify(token,JWT_SECRET,{},(err,info)=>{
    if(err) throw err
     res.json(info)
  })
})
  
// invalidating the cookie on logout by sending an empty string
app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok')
})


app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
//  Managing the file by uploading it and renaming it's path.
 const {originalname,path} = req.file
 const parts = originalname.split('.')
 const ext = parts[parts.length-1]
 const newPath = path + '.' + ext
 fs.renameSync(path,newPath)//Here we are adding format extension to the path of the file.This path changing helps to make the uploaded files to be saved in jpg/image format


 const {token} = req.cookies
 jwt.verify(token,JWT_SECRET,{},async(err,info)=>{
  if(err) throw err
  //  res.json(info)
  const {title,summary,content} = req.body
 const postDoc = await Post.create({
   title:title,
   summary:summary,
   content:content,
   filePath:newPath,
   author:info.id
})

res.json(postDoc)
 
   
  // file:newPath

 })
 
//  res.json(postDoc)
})


app.get('/post',async(req,res)=>{
  res.json(
    await Post.find()
    .populate('author',['username'])
    .sort({createdAt: -1})
    .limit(20)
  )

})

app.get('/post/:id',async(req,res)=>{
  const {id} = req.params
 res.json(
   await Post.findById(id).populate('author',['username'])
  )
  
})

app.put('/post',uploadMiddleware.single('file'),async(req,res)=>{
  let newPath = null
  if(req.file){
    const {originalname,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
     newPath = path + '.'+ ext
    fs.renameSync(path,newPath)
  }

  const {token} = req.cookies
  jwt.verify(token,JWT_SECRET,{},async(err,info)=>{
    if(err) throw err;
    const {id,title,summary,content} = req.body
    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(info.id) === JSON.stringify(postDoc.author._id)
    if(!isAuthor){
      return res.status(400).json('You are not tha author of this post')
    }
    await postDoc.updateOne({
      title:title,
      summary:summary,
      content:content,
      filePath: newPath ? newPath : postDoc.filePath
    } )
    res.json(postDoc)
  })
})

app.delete('/post/:id',async (req,res)=>{
  try{
  const {id} = req.params
  const deletedPost = await Post.findByIdAndDelete(id);
  res.json('post deleted')
  // if (!deletedPost){
  //   return res.status(404).json({error:'Post not found'})
  // }
}catch(error){
  res.json('Error deleting post',error)
}
})


// app.listen(4000,()=>{
//     console.log('Server is running');
// })

// WbxeHSprlRVkBr7x