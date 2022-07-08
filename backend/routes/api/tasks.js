// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const moment = require('moment');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Task, Sequelize: { Op } } = require('../../db/models');
// const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

/*
-------------------ROUTES-------------------
*/
// POST /api/tasks (create a task)
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { title, details, dueAt, listId, userId } = req.body;
  // QUESTION: Passing along optional values???
  const task = await Task.create({ title, details, dueAt, listId, userId });

  return res.json({
    task
  });
}));

// PATCH /api/tasks/:taskId (update a task)
router.patch('/:taskId', requireAuth, asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const { title, details, dueAt, listId, userId } = req.body;

  const task = await Task.findByPk(taskId);
  
  // QUESTION: Passing along optional values???
  await task.update({ title, details, dueAt, listId, userId })

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