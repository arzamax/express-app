import jwt from 'jsonwebtoken';

import { config } from '../config';

const validateToken = (req, res, next) => {
  const authorizationHeader = req.header('authorization');
  const [type, token] = authorizationHeader && authorizationHeader.split(' ') || [];

  if (token && type === 'Bearer') {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token' });

      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    res.status(403);
    res.json({ success: false, message: 'No token provided' });
  }
};

export default validateToken;
