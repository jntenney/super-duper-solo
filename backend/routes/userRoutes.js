const express = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const userRouter = express.Router();

userRouter.post(
  '/',
  userController.registerUser,
  sessionController.generateTokenCookie,
  sessionController.startSession,
  (req, res, next) => {
    // HTTP status code 201 = Created
    res.status(201);
    res.json(res.locals.user);
  }
);

userRouter.post(
  '/login',
  userController.loginUser,
  sessionController.generateTokenCookie,
  sessionController.startSession,
  (req, res, next) => {
    // HTTP status code 201 = Created
    res.status(200);
    res.json(res.locals.user);
  }
);
userRouter.post(
  '/logout',
  sessionController.getPayloadFromCookie,
  sessionController.removeTokenCookie,
  (req, res, next) => {
    res.status(200);
    res.json(res.locals.user);
  }
);

userRouter.route('/profile').get(userController.getUserProfile).put(userController.updateUserProfile);

module.exports = userRouter;
