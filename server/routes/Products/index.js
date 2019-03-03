import express from 'express';

import db from '../../models';
import ProductRoutes from './Product';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await db.Product.findAll();

    res.json(products);
  } catch(e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { label } = req.body;
    const product = await db.Product.create({ label });

    res.json(product.dataValues);
  } catch(e) {
    next(e);
  }
});

router.use('/:id', ProductRoutes);

export default router;
