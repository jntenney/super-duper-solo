const asyncHandler = require('express-async-handler');
const { Session } = require('../models/sessionModel');

const cartController = {};

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
cartController.getUserCart = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;

  console.log(`Getting cart for: ${userId}`);

  let session = await Session.findOne({ cookieId: userId }).lean().exec();
  if (session) {
    res.locals.cart = session.products;
  } else {
    res.locals.cart = [];
  }

  next();
});

module.exports = cartController;
