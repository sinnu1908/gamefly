


const passCheck=(req,res,next)=>{

    console.log(req.body);
    
    const {name,email,mobile_No,password}=req.body;
    let passChecker=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const checkMobile=/^[0-9]+$/.test(mobile_No);

    try {

        if(!name || !email || !mobile_No || !password){
            res.status(200).json({msg:"Please fill all the required fields"})
        }

   else if(!checkMobile || mobile_No.length!=10){
      res.status(200).json({msg:"Please check Mobile Number"})
   }
    else if(!password.match(passChecker)){
        res.status(200).json({msg:"Password should contain One Uppercase, One Special Character, One Number and length must be greater than Eight"})
    }else{
       next();
    }
        
    } catch (error) {
        console.log(error)
    }
    
}

module.exports=passCheck;