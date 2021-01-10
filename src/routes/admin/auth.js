const express = require('express');
const router = express.Router();
const {signup,signIn, requireSignin }  = require('../../controllers/admin/auth')

router.post('/admin/signup',signup);
router.post('/admin/signin',signIn);


module.exports = router