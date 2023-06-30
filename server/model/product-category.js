const mongoose = require('mongoose');
const {Schema,model} = mongoose;


// product category Schema create...

const category = new Schema(
    {
        name:{
            type: String,
            trim: true,
            required:[true,"name is required."],
            unique: true,
            minlength:[3,'min length 3 word.'],
            maxlength:[25,"max length 25 word."]
        },
        slug:{
            type: String,
            trim: true,
            required:[true,"email is required."],
        }
    },
    {timestamps: true,versionKey: false}
);

// create a register model..
const categoryModel = model('product-category',category);


// exports model.
module.exports = categoryModel;