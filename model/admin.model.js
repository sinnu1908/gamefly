
const mongoose=require("mongoose")

const adminSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String
},{
    
    versionKey:false
})

const AdminUserModel=mongoose.model("admin", adminSchema)

module.exports={
    AdminUserModel
}