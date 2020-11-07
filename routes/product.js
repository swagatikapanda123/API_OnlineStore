const express = require('express')
const router = express.Router()
const Product = require('../models/product')

const productCtrl = require('../controllers/product')

router.post('/', productCtrl.createProduct)
router.get('/:id', productCtrl.getOneProduct)
router.put('/:id', productCtrl.modifyProduct)
router.delete('/:id', productCtrl.deleteProduct)
router.get('/' + '', productCtrl.getAllProduct)

module.exports = router;