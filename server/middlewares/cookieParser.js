import cookie from 'cookie';

const cookieParser = () => (req, res, next) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return next();
  }

  req.parsedCookies = cookie.parse(cookies);
  next();
};

export default cookieParser;
