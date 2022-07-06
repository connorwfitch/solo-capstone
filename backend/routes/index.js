// External modules
const express = require('express');

// Internal modules
const apiRouter = require('./api');

// Creating main router
const router = express.Router();

// Using api router
router.use('/api', apiRouter);

router.get('/hello/world', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;