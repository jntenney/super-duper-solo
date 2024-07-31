const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  asin: { type: String, required: true, unique: true },
  boughtInLastMonth: { type: Number, required: true },
  category_id: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isBestSeller: { type: Boolean, required: true },
  listPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  productURL: { type: String, required: true },
  reviews: { type: Number, required: true },
  stars: { type: Number, required: true },
  title: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
};
