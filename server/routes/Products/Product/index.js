import express from 'express';
import Sequelize from 'sequelize';

import db from '../../../models';

const router = express.Router({ mergeParams: true });

const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await db.Product.findAll({
      where: {
        [Op.eq]: {
          id,
        }
      }
    });

    if (product) {
      res.json(product);
    } else {
      res.status(400);
      res.end();
    }
  } catch(e) {
    next(e);
  }
});

export default router;