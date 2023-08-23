const mongoose=require("mongoose");
//Register User Schema
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    mobile_No:{
        type:String,
        required:[true,"Mobile No. is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    confirm_password:{
        type:String,
        required:[true,"password is required"]
    },
    isBlocked: { type: Boolean, default: false },

    }
,{timestamps:true});

//Register User Model
const userModel=mongoose.model("user",userSchema);

//Logout User Schema
const logoutSchema=mongoose.Schema({
    blToken:String
});

//Logout User Model
const logoutUserModel=mongoose.model("blToken",logoutSchema);

//Exporting the module
module.exports={
    userModel,
    logoutUserModel,
}