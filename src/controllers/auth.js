const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const shortId = require("shortid")

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "User already registered",
      })
    }
    const { firstName, lastName, email, password } = req.body
    const hash_password = bcrypt.hash(password, 10)
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortId.generate(),
    })
    _user.save((error, data) => {
      if (error) {
        res.status(400).json({
          message: "Something went wrong",
        })
      }
      if (data) {
        return res.status(201).json({
          status: 201,
          message: "User created Successfully ...",
        })
      }
    })
  })
}

exports.signIn = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (user) {
      if (user.authenticate(password) && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        )
        const { _id, firstName, lastName, email, role, fullName } = user
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        })
      } else {
        return res.status(400).json({ message: "Something went wrong" })
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      })
    }
  })
}

exports.signout = (req,res)=>{
  res.clearCookie('token')
  res.status(200).json({message:'Signout successfully'})
}