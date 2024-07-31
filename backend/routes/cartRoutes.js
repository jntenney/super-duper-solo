const express = require('express');
const asyncHandler = require('express-async-handler');

const sessionController = require('../controllers/sessionController');
const cartController = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/', sessionController.authPayloadFromCookie, cartController.getUserCart, (req, res, next) => {
  res.status(200);
  res.json(res.locals.cart);
});

module.exports = cartRouter;
