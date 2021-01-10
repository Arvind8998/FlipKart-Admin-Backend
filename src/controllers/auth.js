const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user){
            return res.status(400).send({
                message: 'User already registered'
            })
        }
        const {firstName, lastName, email, password} = req.body
        const _user =  new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        })
        _user.save((error,data)=>{
            if(error){
                res.status(400).send({
                    message: 'Something went wrong'
                })
            }
            if(data){
                return res.status(200).send({
                    message: 'User created Successfully ...'
                })
            }
        })
    })
}

exports.signIn = (req,res)=>{
    const {email,password} = req.body
    User.findOne({email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).send({error})
        }   
        if(user){
            if(user.authenticate(password)){
                const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
                const {_id, firstName, lastName, email, role, fullName} = user
                res.status(200).send({
                    token,
                    user: {_id, firstName, lastName, email, role, fullName}
                })
            }
            else{
                return res.status(400).send({message: 'Invalid Password'})
            }
        }   
        else{
            return res.status(400).send({
                message: 'Something went wrong'})
        }
    })
}

exports.requireSignin = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token ,process.env.JWT_SECRET);
    req.user = user
    next()
}