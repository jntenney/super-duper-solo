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
userRouter.post('/logout', userController.logoutUser, sessionController.removeTokenCookie, (req, res, next) => {
  res.status(200);
  res.json(res.locals.user);
});

userRouter
  .route('/profile')
  .get(sessionController.authPayloadFromCookie, userController.getUserProfile, (req, res, next) => {
    res.status(200);
    res.json(res.locals.user);
  });

userRouter
  .route('/profile')
  .put(sessionController.authPayloadFromCookie, userController.updateUserProfile, (req, res, next) => {
    res.status(200);
    res.json(res.locals.user);
  });

userRouter
  .route('/profile')
  .delete(
    sessionController.authPayloadFromCookie,
    sessionController.deleteSession,
    sessionController.removeTokenCookie,
    userController.deleteUserProfile,
    (req, res, next) => {
      res.status(200);
      res.json(res.locals.user);
    }
  );

module.exports = userRouter;
