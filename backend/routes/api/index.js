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

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});


module.exports = router;