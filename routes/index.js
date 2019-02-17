import express from 'express';

import validateToken from '../middlewares/validateToken';
import passport from '../middlewares/passport';
import AuthRoutes from './Auth';
import ProductsRoutes from './Products';
import UsersRoutes from './Users';

const router = express.Router();

router.use('/api/products', passport.authenticate('bearer', { session: false }), ProductsRoutes);
router.use('/api/users', validateToken, UsersRoutes);
router.use('/auth', AuthRoutes);

export default router;