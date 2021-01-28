const express = require("express")
const router = express.Router()
const { signup, signIn, signout } = require("../controllers/auth")
const { requireSignin } = require("../common-middleware/index")
const { check } = require("express-validator")
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../Validators/auth")

router.post("/signup", validateSignupRequest, isRequestValidated, signup)
router.post("/signin", validateSigninRequest, isRequestValidated, signIn)

router.post("/signout", requireSignin, signout)
router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: req.user })
})

module.exports = router
