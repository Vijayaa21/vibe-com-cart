import fetch from 'node-fetch';

// GET /api/carts      Get all carts (list)
export async function getCart(req, res, next) {
  try {
    const apiRes = await fetch('https://dummyjson.com/carts');
    const carts = await apiRes.json();
    res.json(carts);
  } catch (err) {
    next(err);
  }
}



// POST /api/carts       Add a new cart (simulated)
export async function addToCart(req, res, next) {
  try {
    // forward request body to dummyjson add endpoint so frontend can add arbitrary products
    const payload = req.body || { userId: 1, products: [] };
    const apiRes = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    const cart = await apiRes.json();
    res.json(cart);
  } catch (err) {
    next(err);
  }
}


export async function removeFromCart(req, res, next) {
  try {
    const { id } = req.params;
    const apiRes = await fetch(`https://dummyjson.com/carts/${id}`, {
      method: 'DELETE',
    });
    const response = await apiRes.json();
    res.json(response);
  } catch (err) {
    next(err);
  }
}
