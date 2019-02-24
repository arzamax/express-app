import express from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../../config/index';
import users from '../../models/users';
import passport from '../../middlewares/passport';

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
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

    res.json(payload);

  } else {
    res.status(404);
    res.json({ code: 404, message: "Not Found" });
  }
});

router.post('/passport', passport.authenticate('local', { session: false }), (req, res) => {
  res.json(req.user);
});

export default router;