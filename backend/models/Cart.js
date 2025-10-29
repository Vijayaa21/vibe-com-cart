import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: Number, required: true, default: 1, unique: true },
  products: { type: [cartProductSchema], default: [] },
  updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
