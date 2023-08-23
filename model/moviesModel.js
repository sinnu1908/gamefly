const mongoose=require("mongoose");

const moviesSchema=mongoose.Schema({
    id:Number,
    Type:String,
   img_url:{type:String , required:true},
    date:{type:String , required:true},
price:{type:String , required:true},
name:{type:String , required:true}
})

const moviesModel=mongoose.model('movies',moviesSchema);

module.exports=moviesModel;
