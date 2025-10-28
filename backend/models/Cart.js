import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  qty: Number
});

const cartSchema = new Schema({
  items: [cartItemSchema]
});

export default model('Cart', cartSchema);
