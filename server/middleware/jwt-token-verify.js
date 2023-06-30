const jwt = require('jsonwebtoken');
const registerModel = require('../model/user.auth.model');
const loginModel = require('../model/login-model');



// verify the token...
exports.registration = async(req,res,next)=>{
    try {
        // distructure token in headers...
        const {token} = req.headers;
        if(!token){
           return res.status(200).json({status:'fail',message:"please login your account."});
        }

        // verify token...
        const verifyData = jwt.verify(token,process.env.SECRAT_KEY);
        // stroge a data in req.....
        req.User = verifyData;
        
        // verify done.
        next();

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// check isadmin....
exports.IsAdmin = async(req,res,next)=>{
    try {
          // find user profile data in database....
        const profileData = await loginModel.findOne({_id:req.User});
        if(!profileData){
            return res.status(200).json({status:'fail',message:"please login your account first."});
         }

         // find batabase email ...
         const emailCheck = await registerModel.findOne({email:profileData.email});
        
         if(emailCheck.role != 1){
           return res.status(200).json({status:"fail",message:"You Can't Access All System Because You Are A User."});
         }else{
            next();
         }

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};
