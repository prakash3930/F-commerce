const productModel = require("../model/product-model");
const fs = require('fs');
const slug = require('slugify');


// create a produc ......
exports.createProduct = async(req,res)=>{
    try {
        // distracture product data in formidable in req....
        const {name,description,price,category} = req.fields;
        const {photo} = req.files;
         // validator product...data...
         if(!name){
            return res.status(200).json({status:"fail",message:"name is required."});
        }else if(name.length < 3){
            return res.status(200).json({status:"fail",message:"name min length 3 word."});
        };
        const existeName = await productModel.findOne({name});
        if(existeName){
            return res.status(200).json({status:"fail",message:"name is already use."});
        };
        if(!description){
            return res.status(200).json({status:"fail",message:"description is required."});
        }
        if(!price){
            return res.status(200).json({status:"fail",message:"price is required."});
        }
        if(!category){
            return res.status(200).json({status:"fail",message:"category is required."});
        }
        if(!photo){
            return res.status(200).json({status:"fail",message:"photo is required."});
        }else if(photo.size > 1000000){
            return res.status(200).json({status:"fail",message:"min photo size 1mb."});
        };

        // save a product data in database...
        const productData = await new productModel({...req.fields,slug:slug(name),photo:{data:fs.readFileSync(photo.path),contentType:photo.type}}).save();
        
        // send res product data...
         res.status(200).json({status:"success",message:productData});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// get a all products in page.....
exports.getProduct = async(req,res)=>{
    try {
        // distracture a page no in req.params....
        const {page} = req.params;
        const limit = 6;
        const pagess = page?page:1;

        //get a all product data in database...
        const productData = await productModel.find().select("-photo").sort({createdAt:-1}).populate('category','slug').skip((pagess - 1)*limit).limit(6);
        const coutProductData = await productModel.find({}).countDocuments();

        // send res all product data...
        res.status(200).json({status:"success",total_product:coutProductData,product:productData,Note:"Please inter page number in the url and views more product."});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// get a product img....
exports.getProductImg = async(req,res)=>{
    try {
        // distracture product id in req.params.....
        const {id} = req.params;

        // find a product by id ....
        const productImg = await productModel.findOne({_id:id}).select("photo");

        // send res  product img data...
        res.set('content-type',productImg.photo.contentType);
        res.status(200).send(productImg.photo.data);

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// product search by keyword..
exports.productSearch = async(req,res)=>{
    try {
        // distracture search keyword in req.body.....
        const {keyword} = req.body;
        if(!keyword){
            return res.status(200).json({status:"fail",message:"search bar in empty."});
        }

        // search product by keyword...
        const singleProduct = await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
        }).populate('category','slug').select('-photo');

        // how many product find....
        const finded = singleProduct.length;

        // send res product data...
        res.status(200).json({status:"success",find_product:finded,product:singleProduct});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// update a produc ......
exports.updateProduct = async(req,res)=>{
    try {
        // distracture product data in formidable in req....
        const {name} = req.fields;
        const {photo} = req.files;
         // validator product...data...
         if(name){
            if(name.length < 3){
                return res.status(200).json({status:"fail",message:"name min length 3 word."});
            };  
        }
        const existeName = await productModel.findOne({name});
        if(existeName){
            return res.status(200).json({status:"fail",message:"name is already use."});
        }
        if(photo){
            if(photo.size > 1000000){
                return res.status(200).json({status:"fail",message:"min photo size 1mb."});
            };   
        };

        // save a update data in database...
        const productData = await productModel.findByIdAndUpdate({_id:req.params.id},{...req.fields,slug:slug(name)});

        if(photo){
            productData.photo.data = fs.readFileSync(photo.path);
            productData.photo.contentType = photo.type;
        }

        await productData.save()

        // send res product data...
         res.status(200).json({status:"success",message:"product update successfully"});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};


// delete a product by id...
exports.deleteProduct = async(req,res)=>{
    try {
        // find single product ....
        const productData = await productModel.findByIdAndRemove({_id:req.params.id});

         // send res product data...
         res.status(200).json({status:"success",message:"product delete successfully"});
    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};