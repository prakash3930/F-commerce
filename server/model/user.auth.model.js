const mongoose = require('mongoose');
const {Schema,model} = mongoose;


// register Schema create...

const register = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required:[true,"name is required."],
            unique: true,
            minlength:[3,'min length 3 word.'],
            maxlength:[25,"max length 25 word."]
        },
        email:{
            type: String,
            trim: true,
            required:[true,"email is required."],
            unique: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },
        password:{
            type: String,
            trim: true,
            required:[true,"password is required."],
            minlength:[8,'min length 8 word.']
        },
        role:{
            type: Number,
            default:0
        }
    },
    {timestamps: true,versionKey: false}
);

// create a register model..
const registerModel = model('user',register);


// exports model.
module.exports = registerModel;