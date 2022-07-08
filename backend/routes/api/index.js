// External modules
const express = require('express');

// Internal modules
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listsRouter = require('./lists.js');
const tasksRouter = require('./tasks.js');
const tagsRouter = require('./tags.js');

// Creating api router
const router = express.Router();

/* 
-------------------ROUTES-------------------
*/
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/lists', listsRouter);
router.use('/tasks', tasksRouter);
router.use('/tags', tagsRouter);

module.exports = router;