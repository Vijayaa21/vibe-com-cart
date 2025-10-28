import { Router } from 'express';
import { checkout } from '../controllers/checkoutController.js';
const router = Router();

router.post('/checkout', checkout);

export default router;
