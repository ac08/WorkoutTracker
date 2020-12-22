// Dependencies
// =============================================================
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Sets up Morgan tool
app.use(morgan('tiny'));

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets up the Express app to establish a static directory to access static files
app.use(express.static(path.join(__dirname, '/public/')));

// Routes
// =============================================================
// const authRouter = require('./routes/auth-routes')
const indexRouter = require('./routes/index-routes')
// const articleRouter = require('./routes/article-routes')
// const adminRouter = require('./routes/admin-routes')

// app.use('/auth', authRouter);
// app.use('/admin', adminRouter);
// app.use('/articles', articleRouter);
app.use('/', indexRouter);

// Addn'l Middleware (something that is executed when everything comes in...)
// =============================================================
app.use((req, res, next) => {
  const err = new Error('Page Not Found!');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  // assign error status to the error that has been passed from the above middleware
  // or if the error originated in another portion of app, assign 500 (Internal Server Error) status
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message
    }
  });
});

// Starting our Express app
// =============================================================
app.listen(PORT, () => {
  debug(`listening on PORT ${chalk.green(PORT)}`);
});