import express from 'express';
import db from "../../models";

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await db.User.findAll();

    res.json(users);
  } catch(e) {
    next(e);
  }
});

export default router;