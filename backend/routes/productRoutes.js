const express = require('express');
const asyncHandler = require('express-async-handler');

const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/id/:id', productController.getProductById, (req, res, next) => {
  res.status(200);
  res.json(res.locals.product);
});

productRouter.get('/asin/:asin', productController.getProductByAsin, (req, res, next) => {
  res.status(200);
  res.json(res.locals.product);
});

module.exports = productRouter;
