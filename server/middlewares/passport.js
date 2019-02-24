import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';

import users from '../models/users';
import { config } from '../config/index';

passport.use(new LocalStrategy(
  { session: false },
  (username, password, next) => {
    const user = users.find(user => user.username === username);

    if (user && (password === user.password)) {
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

      next(null, payload);

    } else {
      next({ message: 'Not Found' });
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