const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const userController = {};

/**
 * @desc    Authenticate user and set token
 *          Find user email in database,
 *            If user email exists, then create a cookie token and return the user as response
 *
 * @route   POST /api/users/auth
 *
 * @access  Public
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
userController.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //    generateToken(res, user._id);

    res.locals.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    next();
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * @desc    Register a new user and set token
 *          Find the user email in the database
 *          If the user does not exist, create the user in DB, and send a cookie token & user object as response
 *
 * @route   POST /api/users
 *
 * @access  Public
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
userController.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    // generateToken(res, user._id);

    res.locals.user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    next();
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc    Logout a user and remove token
 *          Remove the cookie token no matter what
 *
 * @route   POST /api/users
 *
 * @access  Public
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
userController.logoutUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.ssid;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      res.locals.user = await User.findById(payload.userId).select('-password -createAt -updatedAt -__v').exec();
    } catch (error) {
      res.locals.user = { message: 'Bad session cookie' };
    }
  } else {
    res.locals.user = { message: 'No session cookie' };
  }

  next();
});

/**
 * @desc    Get the user's profile
 *          Read user ID from res.locals.userid and find the user in the DB
 *          If the user does exist, send the user object in response
 *
 * @route   GET /api/users/profile
 *
 * @access  Private to the user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
userController.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.user._id).select('-password -createAt -updatedAt -__v').exec();

  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * @desc    Update the user's profile
 *          Read user ID from res.locals.userid and find the user in the DB
 *          If the user does exist, update user properties, and send the user object in response
 *
 * @route   PUT /api/users/profile
 *
 * @access  Private to the user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
userController.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.user._id).select('-password -createAt -updatedAt -__v').exec();

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.locals.user = {
      _id: user._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    };

    next();
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

userController.deleteUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(res.locals.user._id).select('-password -createAt -updatedAt -__v').exec();

  if (user) {
    res.locals.user = user;

    next();
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = userController;
