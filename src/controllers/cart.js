const Cart = require('../models/cart')

exports.addItemToCart = (req,res)=>{

    Cart.findOne({user: req.user._id})
    .exec((error,cart)=>{
        if(error) return res.status(400).json({error})
        if(cart){
            // if cart is present update the cart

            const {product,quantity} = req.body.cartItems
            const item = cart.cartItems.find(cart=> cart.product == product)
            let condition, update
            if(item){
                condition = {user: req.user._id, "cartItems.product": product}
                update = {
                    "$set":{
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + quantity
                        }
                    }
                }
            }
            else{
                condition = {user: req.user._id}
                update = {
                    "$push":{
                        "cartItems": req.body.cartItems
                    }
                }
            }
            Cart.findOneAndUpdate(condition,update)
                .exec((error, _cart)=>{
                    if(error) return res.status(400).json({error})
                    if(_cart){
                        return res.status(201).json({cart: _cart})
                    }
                })
        }
        else{
            // if cart's not present create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })

            cart.save((error,cart)=>{
                if(error) return res.status(400).json({error})
                if(cart){
                    return res.status(201).json({cart})
                }
            })
        }
    })


}