const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { userModel } = require("../model/user.model");
require("dotenv").config();

//Register user
const registerUser=async(req,res)=>{
    console.log(req.body)
    const {name,email,mobile_No,password}=req.body;
    const userAvailable=await userModel.findOne({$or:[{email},{mobile_No}]});

    if(userAvailable){
     res.status(200).json({msg:"User is already registered with us, Please Login...!"})
    }else{
        //hashing the password and storing it into database
     bcrypt.hash(password, 3, async(err, hash)=>{
         if(err){
             res.status(400).json({msg:"Something went wrong please try again sometime"})
         }else{
            let newUser=new userModel({name,email,mobile_No,password:hash,});
            await newUser.save();
            res.status(201).json({msg:"Registration Successfull !, Please Login...", User:req.body})
         }
     });
    }
 }

 //Login User
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password){
            res.status(200).json({msg:"Please fill the all the required fields"})
        }else{
            let userAvailable=await userModel.findOne({email});
            
            if(!userAvailable){
                res.status(200).json({msg:"User not found, Please register first"})
            }else{
                bcrypt.compare(password, userAvailable.password, async(err, result)=>{
                    if(result){
                        let token=jwt.sign({userName:userAvailable.name,userId:userAvailable._id},process.env.secretKey,{expiresIn:"60m"});
                        res.status(200).json({msg:"User login in successfull",
                        success:true, token,user:userAvailable.name})
                    }else if(!result){
                        res.status(201).json({msg:"password is incorrect"})
                    }else{
                        res.status(401).json({msg:"Something went wrong please try again sometime"}); 
                    }
                });
            }  
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

//Logout user

const logoutUser=async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
        if(token){
            const newblT=await new logoutUserModel({
                blToken:token
            });
            await newblT.save();
            res.status(200).json({msg:"User has been logged out"});
        }else{
            res.status(201).json({msg:"Token not recieved"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

//Exporting module
module.exports={
    registerUser,
    loginUser,
    logoutUser
}