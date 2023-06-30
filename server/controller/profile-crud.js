const { hashPassword } = require("../config/hash.password");
const loginModel = require("../model/login-model");
const registerModel = require("../model/user.auth.model");

// get a profile information....
exports.profile = async(req,res)=>{
    try {
        
        // find user profile data in database....
        const profileData = await loginModel.findOne({_id:req.User});
        if(!profileData){
           return res.status(200).json({status:'fail',message:"please login your account first."});
        }
        // find batabase email ...
        const emailCheck = await registerModel.findOne({email:profileData.email});

        // create a user profile details...
        const profileInformation = {
            _id:emailCheck._id,
            name:emailCheck.name,
            email:profileData.email,
            pasword:emailCheck.password,
            role:emailCheck.role,
            createdAt:profileData.createdAt,
            updatedAt:profileData.updatedAt,
        }

        // send res in clien side.....
        res.status(200).json({status:"success",message:profileInformation});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// update a profile name email password etc....
exports.updateProfile = async(req,res)=>{
    try {
        // distructure profile information in req.body...
        const {name,email,password} = req.body;

        // validator user...data...
        if(name){
            if(name.length < 3){
                return res.status(200).json({status:"fail",message:"name min length 3 word."});
            };   
        };
        const existeName = await registerModel.findOne({name});
        if(existeName){
            return res.status(200).json({status:"fail",message:"name is already use."});
        };
        if(email){
            const existeEmail = await registerModel.findOne({email});
            if(existeEmail){
                return res.status(200).json({status:"fail",message:"email is already use."});
            };
        };
        if(password){
            if(password.length < 8){
                return res.status(200).json({status:"fail",message:"password min length 8 word."});
            };  
        };

        // generate a hash password.....
        const chashPassword = await hashPassword(password);

        // find user profile data in database....
        const profileData = await loginModel.findOne({_id:req.User}).select("email");
        if(!profileData){
            return res.status(200).json({status:'fail',message:"please login your account first."});
         }

         // find batabase email ...
         const emailCheck = await registerModel.findOne({email:profileData.email});

        // update a user data in database.....
        const updateUserData = await registerModel.findByIdAndUpdate({_id:emailCheck._id},
            {
               $set:{
                name,email,password:chashPassword
               }
            },
            {new: true}
        );

        // send res update user data...
        res.status(200).json({status:"success",message:updateUserData});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// check admin or user...

exports.isAdmin = async(req,res)=>{
    try {
         // send res  admin data...
         res.status(200).json({status:"success",message:"You Access All System Because You Are A Admin."});
    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// user logout her profile...

exports.logout = async(req,res)=>{
    try {
        // find user profile data in database....
        const profileData = await loginModel.findByIdAndDelete({_id:req.User._id});

         // send res  logout data...
         res.status(200).json({status:"success",message:"profile logout done."});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};