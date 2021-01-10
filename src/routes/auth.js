const express = require('express');
const router = express.Router();
const {signup,signIn, requireSignin }  = require('../controllers/auth')

router.post('/signup',signup);
router.post('/signin',signIn);

router.post('/profile', requireSignin, (req,res)=>{
    res.status(200).send({user: req.user})
})

module.exports = router