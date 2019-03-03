import express from 'express';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

import { config } from '../../config/index';
import db from '../../models';
import passport from '../../middlewares/passport';

const router = express.Router();

const Op = Sequelize.Op;

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findAll({
      where: {
        username: {
          [Op.eq]: username,
        },
        password: {
          [Op.eq]: password,
        }
      }
    });

    if (user) {
      const { id, email } = user;
      const token = jwt.sign({ id }, config.secret, { expiresIn: 60 });
      const payload = {
        code: 200,
        message: 'OK',
        data: {
          user: {
            email,
            username,
          },
        },
        token,
      };

      res.json(payload);

    } else {
      res.status(404);
      res.json({ code: 404, message: "Not Found" });
    }
  } catch(e) {
    next(e);
  }
});

router.post('/passport', passport.authenticate('local', { session: false }), (req, res) => {
  res.json(req.user);
});

export default router;