import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  description: { type: String }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
