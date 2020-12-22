const express = require('express');
const debug = require('debug')('app:indexRouter');
const path = require("path");

const indexRouter = express.Router();

// Routes
// =============================================================
function router() {
  indexRouter.route('/')
    .get((req, res) => {
      debug('rendering index page...');
      res.sendFile(path.join(__dirname + "./public/index.html"));
      // res.sendFile(path.join(__dirname, "../public/html/index.html"));
    });
  return indexRouter;
}

module.exports = router;
