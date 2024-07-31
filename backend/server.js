const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const connectDB = require('./config/db');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// catch-all else route, not found
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`.green));
