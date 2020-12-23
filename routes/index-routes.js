const express = require('express');
const path = require("path");

const debug = require('debug')('app:indexRouter');

const indexRouter = express.Router();

// Routes
// =============================================================
function router() {
  indexRouter.route('/')
    .get((req, res) => {
      debug('rendering index page...');
      console.log('test');
      res.sendFile('./index.html');
    });
  return indexRouter;
}

module.exports = router;
