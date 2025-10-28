import { Router } from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
const router = Router();

router.post('/cart', addToCart);
router.delete('/cart/:id', removeFromCart);
router.get('/cart', getCart);

export default router;
