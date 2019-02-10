import express from 'express';

import ProductRoutes from './Product';
import products from '../../models/products';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(products)
});

router.post('/', (req, res) => {
  const { id, label, reviews } = req.body;

  products.push({ id, label, reviews });
  res.end('added');
});

router.use('/:id', ProductRoutes);

export default router;
