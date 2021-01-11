const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req,res)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user){
            return res.status(400).send({
                message: 'Admin already registered'
            })
        }
        const {firstName, lastName, email, password} = req.body
        const _user =  new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString(),
            role: 'admin'
        })
        _user.save((error,data)=>{
            if(error){
                res.status(400).send({
                    message: 'Something went wrong'
                })
            }
            if(data){
                return res.status(200).send({
                    message: 'Admin created Successfully ...'
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
            if(user.authenticate(password) && user.role === 'admin'){
                const token = jwt.sign({_id : user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
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