const { hashPassword, commerHashPassword } = require("../config/hash.password");
const loginModel = require("../model/login-model");
const registerModel = require("../model/user.auth.model");
const jwt = require('jsonwebtoken');


// create a register user..
exports.register = async(req,res)=>{
    try {
        // distracture name,email,password in body...
        const {name,email,password} = req.body;

        // validator user...data...
        if(!name){
            return res.status(200).json({status:"fail",message:"name is required."});
        }else if(name.length < 3){
            return res.status(200).json({status:"fail",message:"name min length 3 word."});
        };
        const existeName = await registerModel.findOne({name});
        if(existeName){
            return res.status(200).json({status:"fail",message:"name is already use."});
        };
        if(!email){
            return res.status(200).json({status:"fail",message:"email is required."});
        }
        const existeEmail = await registerModel.findOne({email});
        if(existeEmail){
            return res.status(200).json({status:"fail",message:"email is already use."});
        };
        if(!password){
            return res.status(200).json({status:"fail",message:"password is required."});
        }else if(password.length < 8){
            return res.status(200).json({status:"fail",message:"password min length 8 word."});
        };

        // generate a hash password.....
        const chashPassword = await hashPassword(password);

        // save a user data in database.....
        const userData = await new registerModel(
            {
                name,email,password:chashPassword
            }
        ).save();

        // send res user data...
        res.status(200).json({status:"success",message:userData});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// login section ..
exports.login = async(req,res)=>{
    try {
         // distracture name,email,password in body...
         const {email,password} = req.body;

         // validator user...data...
         if(!email){
             return res.status(200).json({status:"fail",message:"email is required."});
         }
         if(!password){
             return res.status(200).json({status:"fail",message:"password is required."});
         }else if(password.length < 8){
             return res.status(200).json({status:"fail",message:"password min length 8 word."});
         };

        //  user email check ....
        const emailCheck = await registerModel.findOne({email});
        if(!emailCheck){
            return res.status(200).json({status:"fail",message:"user is not found."});
        }

        // comper a hash password.....
        const chashPassword = await commerHashPassword(password,emailCheck.password);
        if(!chashPassword){
            return res.status(200).json({status:"fail",message:"email and password is wrong."});
        }
        
        // save login information in database...
        const loginData = await new loginModel({email,password:emailCheck.password}).save();

        // create jwt token...
        const token = jwt.sign({_id:loginData._id},process.env.SECRAT_KEY,{expiresIn: '5d'});
        
         // send res user data...
         res.status(200).json({status:"success",message:"successfully login done.",token});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};