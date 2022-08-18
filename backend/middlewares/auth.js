const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/401_unauthorized-error');

module.exports = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = cookie.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'e5030be0fffefc54bbab2259eec1f0effe653b00dc41b8ad6009d1f92144f3a8');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
