import express from 'express';
import products from "../../../models/products";

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(400);
    res.end();
  }
});

router.get('/reviews', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id === id);

  if (product && product.hasOwnProperty('reviews')) {
    res.json(product.reviews);
  } else {
    res.status(400);
    res.end();
  }
});

export default router;