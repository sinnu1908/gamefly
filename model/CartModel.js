const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
   img_url:{type:String , required:true},
    date:{type:String , required:true},
price:{type:String , required:true},
name:{type:String , required:true},
quantity:Number
})

const cartModel=mongoose.model('cart',cartSchema);

module.exports=cartModel;
