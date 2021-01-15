const express = require('express');
const router = express.Router();
const {signup,signIn,signout}  = require('../../controllers/admin/auth')
const {requireSignin} = require('../../common-middleware/index')
const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require('../../Validators/auth')

router.post('/admin/signup', validateSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validateSigninRequest,isRequestValidated,signIn);
router.post('/admin/signout',requireSignin, signout);


module.exports = router