const express = require('express');
const { register, login } = require('../controller/register.controller');
const router = express.Router();



// register user....
router.post('/register',register);
// login user....
router.post('/login',login);




// export.....
module.exports = router;