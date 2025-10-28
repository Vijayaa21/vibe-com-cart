import fetch from 'node-fetch';

// GET /api/cart → Demo carts
export async function getCart(req, res, next) {
  try {
    const apiRes = await fetch('https://dummyjson.com/carts');
    const cart = await apiRes.json();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

// POST /api/cart → Fake add (simulate success)
export async function addToCart(req, res, next) {
  try {
    const apiRes = await fetch('https://dummyjson.com/carts', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });
    const cart = await apiRes.json();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/cart/:id → Fake remove (simulate success)
export async function removeFromCart(req, res, next) {
  try {
    const apiRes = await fetch(`https://dummyjson.com/carts${req.params.id}`, {
      method: 'DELETE',
    });
    const response = await apiRes.json();
    res.json(response);
  } catch (err) {
    next(err);
  }
}
