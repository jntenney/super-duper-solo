const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/soloprojectdev';
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.green);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
