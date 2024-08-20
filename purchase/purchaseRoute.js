const express = require('express');
const router = express.Router();
const purchaseController = require('./purchaseController');

router.post('/purchases', purchaseController.createPurchase);
router.get('/purchases', purchaseController.getPurchases);

module.exports = router;
