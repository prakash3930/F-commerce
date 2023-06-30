const mongoose = require('mongoose');
const {Schema,model} = mongoose;


// register Schema create...

const login = new Schema(
    {
        email:{
            type: String,
            trim: true
        },
        password:{
            type: String,
            trim: true
        },
        role:{
            type: Number,
            default:0
        }
    },
    {timestamps: true,versionKey: false}
);

// create a register model..
const loginModel = model('login',login);


// exports model.
module.exports = loginModel;