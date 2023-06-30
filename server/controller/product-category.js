const categoryModel = require("../model/product-category");
const slug = require('slugify');


// create a category..
exports.category = async(req,res)=>{
    try {
        // distracture category name in req.body;.......
        const {name} = req.body;
        const existeName = await categoryModel.findOne({name});
        if(existeName){
            return res.status(200).json({status:"fail",message:"name is already use."});
        }
        // save a category data in database...
        const catagoryData = await new categoryModel({name,slug:slug(name)},{new: true}).save();

        // send res category data...
        res.status(200).json({status:"success",message:catagoryData});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};

// get a all product category.....
exports.getCategory = async(req,res)=>{
    try {
         // get a category data in database...
         const getCatagoryData = await categoryModel.find({});
         const countCatagoryData = await categoryModel.find({}).countDocuments();

         // send res category data...
        res.status(200).json({status:"success",total_category:countCatagoryData,message:getCatagoryData});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// update a category....
exports.updateCategory = async(req,res)=>{
    try {
         // distracture category name in req.body;.......
         const {name} = req.body;
         const existeName = await categoryModel.findOne({name});
         if(existeName){
             return res.status(200).json({status:"fail",message:"name is already use."});
         }
         // update a category data in database...
         const catagoryData = await categoryModel.findByIdAndUpdate({_id:req.params.id},{$set:{name,slug:slug(name)}},{new: true});
 
         // send res category data...
         res.status(200).json({status:"success",message:catagoryData});
    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// delete a category....
exports.deleteCategory = async(req,res)=>{
    try {
         // delete a category data in database...
         const catagoryData = await categoryModel.findByIdAndDelete({_id:req.params.id});
 
         // send res category data...
         res.status(200).json({status:"success",message:"category delete done."});
    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};