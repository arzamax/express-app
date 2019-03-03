import passport from 'passport';
import Sequelize from 'sequelize';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';

import { config } from '../config/index';
import db from '../models';

const Op = Sequelize.Op;

passport.use(new LocalStrategy(
  { session: false },
  async (username, password, next) => {
    try {
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
        const token = jwt.sign({id}, config.secret, {expiresIn: 60});
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

        next(null, payload);

      } else {
        next({ message: "Not Found" });
      }
    } catch (e) {
      next(e);
    }
  }
));

passport.use(new BearerStrategy(
  (token, next) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        next({ message: 'Failed to authenticate token' });

      } else {
        next(null, token);
      }
    });
  }
));

export default passport;