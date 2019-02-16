import express from 'express';

import validateToken from '../middlewares/validateToken';
import AuthRoutes from './Auth';
import ProductsRoutes from './Products';
import UsersRoutes from './Users';

const router = express.Router();

router.use('/api/products', validateToken, ProductsRoutes);
router.use('/api/users', validateToken, UsersRoutes);
router.use('/auth', AuthRoutes);

export default router;