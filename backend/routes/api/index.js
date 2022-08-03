// External modules
const express = require('express');

// Internal modules
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listsRouter = require('./lists.js');
const tasksRouter = require('./tasks.js');
const boardsRouter = require('./boards.js');
const sectionsRouter = require('./sections.js');
const itemsRouter = require('./items.js');

// Creating api router
const router = express.Router();

/* 
-------------------ROUTES-------------------
*/
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/lists', listsRouter);
router.use('/tasks', tasksRouter);
router.use('/boards', boardsRouter);
router.use('/sections', sectionsRouter);
router.use('/items', itemsRouter);

module.exports = router;