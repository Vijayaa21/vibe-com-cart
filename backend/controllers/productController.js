import fetch from 'node-fetch';

export async function getProducts(req, res, next) {
  try {
    const apiRes = await fetch('https://dummyjson.com/products');
    const products = await apiRes.json();
    res.json(products);
  } catch (err) {
    next(err);
  }
}
