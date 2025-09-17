const Product = require('../models/ProductModel');

// Yangi maxsulot qo‘shish
const addProduct = (req, res) => {
  const { name, price, quantity, size } = req.body;
  Product.create(name, price, quantity, size, (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Maxsulot qo'shildi ✅", product });
  });
};

// Hamma maxsulotlarni olish
const getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(products);
  });
};

// Maxsulotni o‘chirish
const deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Maxsulot o‘chirildi ❌", result });
  });
};

// Maxsulotni sotilgan deb belgilash
const sellProduct = (req, res) => {
  const { id } = req.params;
  Product.markAsSold(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Maxsulot sotildi ✅", result });
  });
};

// Maxsulotni qaytarilgan deb belgilash
const returnProduct = (req, res) => {
  const { id } = req.params;
  Product.markAsReturned(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Maxsulot qaytarildi 🔄", result });
  });
};

// Sotilgan maxsulotlarni olish
const getSoldProducts = (req, res) => {
  Product.getSold((err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(products);
  });
};

// Qaytarilgan maxsulotlarni olish
const getReturnedProducts = (req, res) => {
  Product.getReturned((err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(products);
  });
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  sellProduct,
  returnProduct,
  getSoldProducts,
  getReturnedProducts
};
