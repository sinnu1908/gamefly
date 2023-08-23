const jwt=require("jsonwebtoken");
const { logoutUserModel } = require("../models/user.model");
require("dotenv").config();

//Authentication middleware of users

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
        if(token){
            const blTokenAvailable=await logoutUserModel.findOne({blToken:token});
            if(blTokenAvailable){
                res.status(201).json({msg:"User logged out, Please Login"})
            }else{
               const decodeToken=jwt.verify(token,process.env.secretKey);
               if(decodeToken){
                console.log(decodeToken)
                  req.body.userName=decodeToken.userName;
                  req.body.userId=decodeToken.userId;
                  next();
               }else{
                res.status(201).json({msg:"User is not authorized"})
               }
            }
        }

    } catch (error) {
        res.status(400).json({error:error})
    }
}

//Export Module
module.exports=auth;