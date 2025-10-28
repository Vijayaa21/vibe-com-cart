export async function checkout(req, res, next) {
  try {
    const { cartItems } = req.body;
    const total = cartItems.reduce((sum, item) => sum + item.qty * item.product.price, 0);
    res.json({
      receipt: {
        total,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}
