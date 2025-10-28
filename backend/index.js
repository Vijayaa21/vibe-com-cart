import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import checkoutRoutes from './routes/checkoutRoute.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();
app.use(cors());
app.use(json());

connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
