import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  price: Number
});

export default model('Product', productSchema);
