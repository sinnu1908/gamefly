// Write your code here
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminUserModel } = require("../model/admin.model");
const productModel = require("../model/productModel");
const { userModel } = require("../model/user.model");
const adminRouter = express.Router()


adminRouter.post("/addProduct",async(req,res)=>{
  try {
      const post = await productModel.create(req.body)
      res.status(200).send(post)
  } catch (error) {
      res.status(400).send({error:error.message})
  }
})
// ---------Get the data while admin login----------------------->>>>

adminRouter.get("/data",async(req,res)=>{
  try {
    const data = await productModel.find({})
    res.status(200).send(data)
  } catch (error) {
    res.status(400).json({ error: err.messag });
  }
})
// ---------Get the UersList while admin login----------------------->>>>

adminRouter.get("/userlist",async(req,res)=>{
  try {
    const data = await userModel.find({})
    res.status(200).send(data)
  } catch (error) {
    res.status(400).json({ error: err.messag });
  }
})
adminRouter.patch("/blockuser/:id", async (req, res) => {
  try {
    const blockedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true }, 
      { new: true }
    );
    if (!blockedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({ msg: "User has been blocked", user: blockedUser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// --------------------If admin wants to update the data----------->>>>
adminRouter.patch("/updatedata/:id",async(req,res)=>{

  try {
    const updatedPost = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).send(updatedPost)
    
  } catch (error) {
    res.status(400).json({ error: err.messag });
  }
})

adminRouter.delete("/delete/:id",async(req,res)=>{
  try {
          const deleted = await productModel.findByIdAndDelete(req.params.id)
          res.status(200).send({msg:"Post has been Deleted"})
  } catch (error) {
      res.status(400).send({error:error.message})
  }
})


adminRouter.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const PasswordChecking =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!PasswordChecking.test(password)) {
    return res.status(400).json({ msg: "Invalid password format! Password format Should contain atleast one uppercase character,one number ,special character and length greater then 8",});
  }

  try {
    const existingUserEmail = await AdminUserModel.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ msg: "Admin Already Exists" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).json({ error: err.messag });
      } else {
        const adminuser = new AdminUserModel({
          name,
          email,
          phone,
          password: hash,
        });
        await adminuser.save();
      }
    });
    res
      .status(200)
      .json({
        msg: "The new Admin has been registered",
        registeredAdmin: req.body,
      });
  } catch (err) {
    res.status(400).json({ error: err.messag });
  }
});

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await AdminUserModel.findOne({ email });
      if (admin) {
        bcrypt.compare(password, admin.password,(err, result)=>{
          if (result){
            var token = jwt.sign({ _id:admin._id},",masai",{
              expiresIn: 120,
            });
            var refreshToken = jwt.sign({ _id: admin._id }, "admin", {
              expiresIn: 300,
            });
            res
              .status(200)
              .json({
                msg: "Login successful!",
                token: token,
                refreshToken: refreshToken,
              });
          }
        });
      } else{
        res.status(200).json({ msg:"Admin Not Found"});
      }
    } catch (err) {
      return res.status(400).json({error: err.messag});
    }
  });

  module.exports = {
    adminRouter
  }