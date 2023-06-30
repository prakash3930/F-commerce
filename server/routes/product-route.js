const express = require('express');
const { registration, IsAdmin } = require('../middleware/jwt-token-verify');
const { createProduct, getProduct, getProductImg, productSearch, updateProduct, deleteProduct } = require('../controller/create-product');
const router = express.Router();
const formidable = require('express-formidable');


// create a product...
router.post('/product',registration,IsAdmin,formidable(),createProduct);
// get a alll product...
router.get('/get-products/:page',registration,getProduct);
// get a product img...
router.get('/product-img/:id',registration,getProductImg);
// get a product img...
router.get('/product-search',registration,productSearch);
// update a product...
router.put('/product-update/:id',registration,IsAdmin,formidable(),updateProduct);
// delete a product...
router.delete('/product-delete/:id',registration,IsAdmin,deleteProduct);





// export.....
module.exports = router;