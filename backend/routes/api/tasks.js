// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
// const moment = require('moment');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Task, Sequelize: { Op } } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

const validateTask = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Must include a title.')
    .isLength({ max: 128 })
    .withMessage('Title may be at most 128 characters long.'),
  check('details')
    .isLength({ max: 1000 })
    .withMessage('Details may be at most 1000 characters long.'),
  handleValidationErrors
];

/*
-------------------ROUTES-------------------
*/
// POST /api/tasks (create a task)
router.post('/', requireAuth, validateTask, asyncHandler(async (req, res) => {
  const { title, details, dueAt, listId, userId } = req.body;
  const task = await Task.create({ title, details, dueAt, listId, userId });

  return res.json({
    task
  });
}));

// PATCH /api/tasks/:taskId (update a task)
router.patch('/:taskId', requireAuth, validateTask, asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const { title, details, dueAt, completed, listId } = req.body;

  const task = await Task.findByPk(taskId);
  
  await task.update({ title, details, dueAt, completed, listId})

  return res.json({
    task
  });
}));

// DELETE /api/tasks/:taskId (delete a task)
router.delete('/:taskId', requireAuth, asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const task = await Task.findByPk(taskId);

  await task.destroy();

  res.json({
    message: 'Success',
    taskId
  });
}));

module.exports = router;