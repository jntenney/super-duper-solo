const asyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');

const productController = {};

/**
 * @desc    Get the product by ID
 *
 * @route   GET /api/product/id/:id
 *
 * @access  Public
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
productController.getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id).exec();

  if (product) {
    res.locals.product = product;
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
  next();
});

/**
 * @desc    Get the product by ID
 *
 * @route   GET /api/product/id/:id
 *
 * @access  Public
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
productController.getProductByAsin = asyncHandler(async (req, res, next) => {
  const asin = req.params.asin;

  const product = await Product.findOne({ asin }).exec();

  if (product) {
    res.locals.product = product;
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

  next();
});

module.exports = productController;
