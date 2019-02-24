import express from 'express';

import validateToken from '../middlewares/validateToken';
import passport from '../middlewares/passport';
import AuthRoutes from './Auth/index';
import ProductsRoutes from './Products/index';
import UsersRoutes from './Users/index';

const router = express.Router();

router.use('/api/products', passport.authenticate('bearer', { session: false }), ProductsRoutes);
router.use('/api/users', validateToken, UsersRoutes);
router.use('/auth', AuthRoutes);

export default router;