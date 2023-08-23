const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../model/productModel");
const moviesModel = require("../model/moviesModel");
const cartModel = require("../model/CartModel");

const productRoute=Router();


productRoute.get('/products',async (req,res)=>{
const {type}=req.query;
    try {
        if(type=='games'){
    const product =await productModel.find();
    res.status(200).send({product});
        }else if(type=='movies'){
            const product =await moviesModel.find();
    res.status(200).send({product});
        }else{
            const product =await productModel.find();
    res.status(200).send({product});
        }
} catch (error) {
    res.status(500).send({msg:'error'})
}

})


productRoute.post('/cart/add',async (req,res)=>{
    try {
    const product =await cartModel(req.body);
    await product.save();
    res.status(200).send({msg:'added',product});
} catch (error) {
    res.status(500).send({msg:'error'})
} 
})

productRoute.get('/cart',async (req,res)=>{
    try {
        const product =await cartModel.find();
        res.status(200).send({product});
} catch (error) {
    res.status(500).send({msg:'error'})
} 
})

productRoute.delete('/cart/remove/:_id',async(req,res)=>{
  let {_id}=req.params;
    try {
        console.log(_id);
        let product=await cartModel.deleteOne({_id});
        res.status(200).send({msg:'deleted',product});
} catch (error) {
    res.status(500).send({msg:'error'})
} 
})

module.exports=productRoute;