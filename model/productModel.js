const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
   img_url:{type:String , required:true},
    date:{type:String , required:true},
developer:{type:String , required:true},
publisher:{type:String , required:true},
price:{type:String , required:true},
name:{type:String , required:true}
})

const productModel=mongoose.model('games',productSchema);

module.exports=productModel;

