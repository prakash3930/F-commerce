const bcrypt = require('bcrypt');


exports.hashPassword = async(password)=>{
    try {
       return await new Promise((resolve, reject) => {
            bcrypt.genSalt(12,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    bcrypt.hash(password,data,(err,hash)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(hash);
                        }
                    })
                }
            })
          });
    } catch (err) {
        console.log(err.message);
    }
};

exports.commerHashPassword = async(password,hash)=>{
    try {
        return bcrypt.compare(password,hash);
    } catch (err) {
        console.log(err.message);
    }
};