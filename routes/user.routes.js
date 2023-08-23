const express=require("express");
const { registerUser, loginUser } = require("../controller/user.controller");
const passCheck = require("../middleware/passCheck.middleware");

//Routes Object
const userRoute=express.Router();

//Routes
userRoute.post("/signup",passCheck,registerUser);
userRoute.post("/signin",loginUser);

//Exporting the module
module.exports=userRoute;