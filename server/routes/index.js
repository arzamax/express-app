import express from 'express';

import validateToken from '../middlewares/validateToken';
import passport from '../middlewares/passport';
import AuthRoutes from './Auth/index';
import ProductsRoutes from './Products';
import UsersRoutes from './Users/index';
import db from '../models';

const router = express.Router();

router.use('/api/products', passport.authenticate('bearer', { session: false }), ProductsRoutes);
router.use('/api/users', validateToken, UsersRoutes);
router.use('/api/auth', AuthRoutes);
router.post('/api/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const product = await db.User.create({ username, password, email });

    res.json(product.dataValues);
  } catch(e) {
    next(e);
  }
});

export default router;