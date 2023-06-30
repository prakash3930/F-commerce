const express = require('express');
const { profile, updateProfile, isAdmin, logout } = require('../controller/profile-crud');
const { registration, IsAdmin } = require('../middleware/jwt-token-verify');
const router = express.Router();



// get a profile information.....
router.get('/profile',registration,profile);
// update a profile information.....
router.put('/profile-update',registration,updateProfile);
// check admin information.....
router.get('/check-isadmin',registration,IsAdmin,isAdmin);
// user logout her profile......
router.delete('/logout',registration,logout);





// export.....
module.exports = router;