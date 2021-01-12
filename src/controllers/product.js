const Product = require('../models/product')
const shortid = require('shortid')
const slugify = require('slugify')

exports.createProduct = (req,res)=>{
    const {name, price, description, category, createdBy, quantity} = req.body
    let productPictures = []

    if(req.files.length > 0){
        productPictures = req.files.map(file =>{
            return {img: file.filename}
        })
    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
        quantity
    })
    

    product
    .save((error,product)=>{
        if(error) return res.status(400).send(error)
        if(product){
            res.status(201).send(product)
        }
    })
}