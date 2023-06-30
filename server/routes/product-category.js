const express = require('express');
const { registration, IsAdmin } = require('../middleware/jwt-token-verify');
const { category, getCategory, updateCategory, deleteCategory } = require('../controller/product-category');
const router = express.Router();



// create a product-category...
router.post('/category',registration,IsAdmin,category);
// get a product-category...
router.get('/get-category',registration,getCategory);
// update a product-category...
router.put('/category-update/:id',registration,IsAdmin,updateCategory);
// delete a product-category...
router.delete('/category-delete/:id',registration,IsAdmin,deleteCategory);





// export.....
module.exports = router;