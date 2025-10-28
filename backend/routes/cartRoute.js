import { Router } from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
const router = Router();

router.post('/carts', addToCart);
router.delete('/carts/:id', removeFromCart);
router.get('/carts', getCart);

export default router;
