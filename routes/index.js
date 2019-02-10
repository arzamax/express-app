import express from 'express';

import ProductsRoutes from './Products';
import UsersRoutes from './Users';

const router = express.Router();

router.use('/api/products', ProductsRoutes);
router.use('/api/users', UsersRoutes);

export default router;