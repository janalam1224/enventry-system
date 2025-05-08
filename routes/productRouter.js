const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

app.get('/products', productController.getProducts);
app.post('/products', productController.postProduct);
app.get('/products/:productId', productController.findProduct);
app.put('/products', productController.editProduct);
app.delete('/products/:productId', productController.deleteProduct);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
