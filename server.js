// Dependencies
// =============================================================
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require("mongoose");
const path = require('path');


// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Sets up Morgan tool
app.use(morgan('tiny'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the Express app to establish a static directory to access static files
// app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static('public'));

// Sets up the MongoDB / Mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Routes
// =============================================================

const workoutRouter = require('./routes/api-routes')(app);

app.use('/api/workouts', workoutRouter);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});



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
  console.log(`listening on PORT ${chalk.green(PORT)}`);
});