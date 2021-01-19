const express = require('express');
const router = express.Router();
const {createProduct, getProductsBySlug} = require('../controllers/product')
const {requireSignin,adminMiddleware} = require('../common-middleware/index')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function(req,file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({storage})


router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct)

router.get('/products/:slug',requireSignin,adminMiddleware, getProductsBySlug)
// router.get('/category/getcategory', getCategories)

module.exports = router