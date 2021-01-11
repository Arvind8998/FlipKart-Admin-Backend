const express = require('express');
const router = express.Router();
const {signup,signIn}  = require('../../controllers/admin/auth')
const {validateSignupRequest,validateSigninRequest,isRequestValidated} = require('../../Validators/auth')

router.post('/admin/signup', validateSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validateSigninRequest,isRequestValidated,signIn);


module.exports = router