import db from '../models';
const User = db.sequelize.import('../models/user');

module.exports = {
  create(req, res) {
    const { username, password, email } = req.body;

    return User
      .create({
        username,
        password,
        email,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return User.findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
};