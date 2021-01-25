const express = require('express');
const router = express.Router();
const {initialData} = require('../../controllers/admin/initialData')
const {requireSignin, adminMiddleware} = require('../../common-middleware/index')

router.get('/initialData', requireSignin, adminMiddleware, initialData);


module.exports = router