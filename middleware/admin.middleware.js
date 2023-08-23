const jwt=require("jsonwebtoken")
const { BlacklistModel } = require("../model/token.model");


const adminAuthMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1] || null;
        if(token){
            
            let decoded=jwt.verify(token,"admin");
            req.body._id=decoded._id;
            return next()
        }else{
            res.status(400).send("Please Login First"); 
        }
    }catch(err){
        return res.status(400).send(err);
    }
}

module.exports={
    adminAuthMiddleware
}