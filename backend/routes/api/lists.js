// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { List, Task, Sequelize: { Op } } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

const validateList = [
  check('title')
    .exists({ checkFalsy: true})
    .withMessage('Must include a title.')
    .isLength({ max: 50 })
    .withMessage('Title may be at most 50 characters long.'),
  handleValidationErrors
];

/*
-------------------ROUTES-------------------
*/
// POST /api/lists (create a list)
router.post('/', requireAuth, validateList, asyncHandler(async (req, res) => {
  const { title, color, userId } = req.body;
  
  const list = await List.create({ title, color, userId });

  return res.json({
    list
  });
}));

// GET /api/lists/:listId/tasks (get all incomplete tasks for a list)
router.get('/:listId/tasks', requireAuth, asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const tasks = await Task.findAll({
    where: {
      listId,
      completed: false
    }
  });

  return res.json({
    tasks
  });
}));

// PATCH /api/lists/:listId (update a list)
router.patch('/:listId', requireAuth, validateList, asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const { title, color } = req.body;

  const list = await List.findByPk(listId);

  await list.update({ title, color })

  return res.json({
    list
  });
}));

// DELETE /api/lists/:listId (delete a list)
router.delete('/:listId', requireAuth, asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const list = await List.findByPk(listId);

  await list.destroy();

  res.json({
    message: 'Success',
    listId
  });
}));

module.exports = router;