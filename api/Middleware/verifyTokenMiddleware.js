// const jwt = require('jsonwebtoken')
// const JWT_SECRET = process.env.secret

// const verifyToken = async(req,res,next) => {
//     const {token} = req.cookies;

//     // check json web token exists & is verified
//     if(token){
//         jwt.verify(token,JWT_SECRET,{},async(err,decodedToken) => {
//             if(err){
//                 console.log(err.message);
//                return res.redirect('/login')
//             }else{
//                 console.log(decodedToken);
//                 next();
//             }
//         })
//     }
//     else{
//       return  res.redirect('/login')
//     }
// }

// module.exports = {verifyToken}