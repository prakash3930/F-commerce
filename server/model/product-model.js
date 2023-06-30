const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const {ObjectId} = Schema.Types;

// register Schema create...

const product = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required:[true,"name is required."],
            unique: true,
            minlength:[3,'min length 3 word.'],
            maxlength:[35,"max length 35 word."]
        },
        slug:{
            type: String,
            trim: true,
            required:[true,"slug is required."]
        },
        description:{
            type: String,
            trim: true,
            required:[true,"description is required."],
            minlength:[3,'min length 3 word.'],
            maxlength:[600,"max length 600 word."]
        },
        price:{
            type: Number,
            trim: true,
            required:[true,"price is required."]
        },
        sold:{
            type: Number,
            trim: true,
            default:0
        },
        photo:{
            contentType: String,
            data:Buffer
        },
        category:{
            type: ObjectId,
            ref:"product-category",
            required:[true,"category is required."]
        }
    },
    {timestamps: true,versionKey: false}
);

// create a register model..
const productModel = model('product',product);


// exports model.
module.exports = productModel;