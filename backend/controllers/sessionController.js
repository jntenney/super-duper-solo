const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Session } = require('../models/sessionModel');
const { User } = require('../models/userModel');

const sessionController = {};

sessionController.generateTokenCookie = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('ssid', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.locals.ssid = token;
  next();
});

sessionController.authPayloadFromCookie = asyncHandler(async (req, res, next) => {
  const token = req.cookies.ssid;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      res.locals.user = await User.findById(payload.userId).select('-password').exec();

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

sessionController.removeTokenCookie = asyncHandler(async (req, res, next) => {
  res.cookie('ssid', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  next();
});

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.ssid;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      res.locals.user = await User.findById(payload.userId).select('-password -createAt -updatedAt -__v -_id').exec();

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  next();
});

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;

  console.log(`Start session for: ${userId}`);

  let session = await Session.findOne({ cookieId: userId }).exec();
  if (!session) {
    console.log(`No session for user - ${userId}`.yellow);

    session = await Session.create({ cookieId: userId, user_id: userId });
    if (session) {
      console.log(`Created session for user - ${userId}`.cyan);
    } else {
      console.log(`Couldn't create session for user - ${userId}`.cyan);
    }
  } else {
    console.log(`Session already exists for user - ${userId}`.yellow);
  }
  next();
});

sessionController.deleteSession = asyncHandler(async (req, res, next) => {
  const userId = res.locals.user._id;

  console.log(`Delete session for: ${userId}`);

  let session = await Session.findOneAndDelete({ cookieId: userId }).exec();
  if (!session) {
    console.log(`No session for user - ${userId}`.yellow);
  } else {
    console.log(`Deleted Session for user - ${userId}`.yellow);
  }
  next();
});

module.exports = sessionController;
