const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  sellProduct,
  returnProduct,
  getSoldProducts,
  getReturnedProducts
} = require('../controllers/ProductController');

// Yangi maxsulot qo‘shish
router.post('/products', addProduct);

// Hamma maxsulotlarni olish
router.get('/products', getAllProducts);

// Maxsulotni o‘chirish
router.delete('/products/:id', deleteProduct);

// Sotildi tugmasi
router.put('/products/:id/sell', sellProduct);

// Qaytarildi tugmasi
router.put('/products/:id/return', returnProduct);

// Sotilgan maxsulotlar
router.get('/products/sold', getSoldProducts);

// Qaytarilgan maxsulotlar
router.get('/products/returned', getReturnedProducts);

module.exports = router;
