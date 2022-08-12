const allowedCors = [
  'https://kazantseva.nomoredomains.sbs',
  'http://kazantseva.nomoredomains.sbs',
  'https://api.kazantseva.nomoredomains.sbs',
  'http://api.kazantseva.nomoredomains.sbs',
  'https://www.api.kazantseva.nomoredomains.sbs',
  'http://www.api.kazantseva.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', 'true');

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};
