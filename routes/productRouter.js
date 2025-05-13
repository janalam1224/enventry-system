const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin'); 

const {
 getProducts,
 postProduct,
 findProduct,
 editProduct,
 deleteProduct,
} = require('../controllers/productController');

router.route('/')
.get(getProducts)
.post(postProduct);

router.route('/:id')
.get(findProduct)
.put(editProduct)
.delete(deleteProduct);

module.exports = router;

