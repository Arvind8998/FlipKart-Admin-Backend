const express = require('express');
const router = express.Router();
const {initialData} = require('../../controllers/admin/initialData')

router.get('/initialData',initialData);


module.exports = router