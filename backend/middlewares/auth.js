const { JWT_SECRET = 'dev-secret' } = process.env;
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
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
