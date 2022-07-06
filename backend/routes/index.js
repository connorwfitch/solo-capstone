// External modules
const express = require('express');

// Internal modules
const apiRouter = require('./api');

// Creating main router
const router = express.Router();

// Using api router
router.use('/api', apiRouter);

module.exports = router;