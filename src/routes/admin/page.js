const express = require("express")
const router = express.Router()
const {requireSignin, adminMiddleware, upload } = require("../../common-middleware/index")
const {createPage, getPage} = require("../../controllers/admin/page")

router.post(
  "/page/create", requireSignin, adminMiddleware, 
  upload.fields([ 
    { name: "banners" },
    { name: "products" }
]), createPage
)

router.get('/page/:category/:type', getPage)

module.exports = router
