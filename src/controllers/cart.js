const Cart = require('../models/cart')

exports.addItemToCart = (req,res)=>{

    Cart.findOne({user: req.user._id})
    .exec((error,cart)=>{
        if(error) return res.status(400).send({error})
        if(cart){
            // if cart is present update the cart

            const {product,quantity} = req.body.cartItems
            const item = cart.cartItems.find(cart=> cart.product = product)

            if(item){
                Cart.findOneAndUpdate({user: req.user._id, "cartItems.product": product},{
                    "$set":{
                        "cartItems": {
                            ...req.body.cartItems,
                            quantity: item.quantity + quantity
                        }
                    }
                })
                .exec((error, _cart)=>{
                    if(error) return res.status(400).send({error})
                    if(_cart){
                        return res.status(201).send({cart: _cart})
                    }
                })
            }
            else{
                Cart.findOneAndUpdate({user: req.user._id},{
                    "$push":{
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart)=>{
                    if(error) return res.status(400).send({error})
                    if(_cart){
                        return res.status(201).send({cart: _cart})
                    }
                })
            }

            
        }
        else{
            // if cart's not present create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })

            cart.save((error,cart)=>{
                if(error) return res.status(400).send({error})
                if(cart){
                    return res.status(201).send({cart})
                }
            })
        }
    })


}