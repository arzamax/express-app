import express from 'express';
import bodyParser from 'body-parser';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import passport from './middlewares/passport';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(queryParser());
app.use(passport.initialize());

app.use('/', routes);

app.use((error, req, res, next) => {
  res.json({
    error: true,
    message: error.message
  })
});

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});