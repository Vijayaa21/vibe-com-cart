import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

async function findOrCreateCart(userId = 1) {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, products: [] });
  }
  return cart;
}

export async function getCart(req, res, next) {
  try {
    const userId = 1;
    const cart = await findOrCreateCart(userId);
    const detailed = await Promise.all((cart.products || []).map(async p => {
      const prod = await Product.findOne({ id: p.productId }).lean();
      return {
        id: p.productId,
        title: prod?.title || 'Unknown',
        price: prod?.price || 0,
        quantity: p.quantity
      };
    }));
    const total = (detailed || []).reduce((s, it) => s + ((it.price || 0) * (it.quantity || 0)), 0);
    res.json({ products: detailed, total });
  } catch (err) {
    next(err);
  }
}

export async function addToCart(req, res, next) {
  try {
    const { productId, qty } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });
    const q = Number(qty || 1);
    const userId = 1;
    const cart = await findOrCreateCart(userId);
    const existing = cart.products.find(p => p.productId === productId);
    if (existing) {
      existing.quantity = existing.quantity + q;
    } else {
      cart.products.push({ productId, quantity: q });
    }
    cart.updatedAt = new Date();
    await cart.save();
    return await getCart(req, res, next);
  } catch (err) {
    next(err);
  }
}

export async function updateQty(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const { qty } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });
    const userId = 1;
    const cart = await findOrCreateCart(userId);
    const existing = cart.products.find(p => p.productId === productId);
    if (!existing) return res.status(404).json({ message: 'product not in cart' });
    existing.quantity = Number(qty || existing.quantity);
    if (existing.quantity < 1) {
      cart.products = cart.products.filter(p => p.productId !== productId);
    }
    cart.updatedAt = new Date();
    await cart.save();
    return await getCart(req, res, next);
  } catch (err) {
    next(err);
  }
}

export async function removeFromCart(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const userId = 1;
    const cart = await findOrCreateCart(userId);
    cart.products = (cart.products || []).filter(p => p.productId !== productId);
    cart.updatedAt = new Date();
    await cart.save();
    return await getCart(req, res, next);
  } catch (err) {
    next(err);
  }
}
