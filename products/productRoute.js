const express = require('express');
const router = express.Router();
const controller = require('./productController');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5000',
};
router.use(cors(corsOptions));

router.post('/addproduct', controller.createProduct);
router.get('/getproducts', controller.getProducts);
router.put('/updateproduct/:id', controller.updateProduct);
router.delete('/deleteproduct/:id', controller.deleteProduct);
router.get('/search', controller.searchProducts);

module.exports = router;
