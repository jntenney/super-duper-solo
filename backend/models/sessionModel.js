const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionExpiration = 30 * 24 * 60 * 60; // days * hours * minutes * seconds

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: sessionExpiration, default: Date.now },
  user_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      id: {
        // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = {
  Session,
};
