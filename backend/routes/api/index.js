// External modules
const express = require('express');

// Internal modules
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

// Creating api router
const router = express.Router();

/* 
-------------------ROUTES-------------------
*/
router.use('/session', sessionRouter);
router.use('/users', usersRouter);



module.exports = router;