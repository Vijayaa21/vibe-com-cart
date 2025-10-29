import { Router } from 'express';
import { addToCart, removeFromCart, getCart, updateQty } from '../controllers/cartController.js';
const router = Router();

router.post('/cart', addToCart);
router.patch('/cart/:productId', updateQty);
router.delete('/cart/:productId', removeFromCart);
router.get('/cart', getCart);

export default router;
