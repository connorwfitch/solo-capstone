// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Board, Section, Item, Sequelize: { Op } } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

const validateBoard = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Must include a title.')
    .isLength({ max: 50 })
    .withMessage('Title may be at most 50 characters long.'),
  handleValidationErrors
];

/*
-------------------ROUTES-------------------
*/
// POST /api/boards (create a board)
router.post('/', requireAuth, validateBoard, asyncHandler(async (req, res) => {
  const { title, color, userId } = req.body;

  const board = await Board.create({ title, color, userId });

  return res.json({
    board
  });
}));

// GET /api/lists/:boardId/tasks (get all incomplete tasks for a list)
// router.get('/:boardId/tasks', requireAuth, asyncHandler(async (req, res) => {
//   const boardId = parseInt(req.params.boardId, 10);
//   const tasks = await Task.findAll({
//     where: {
//       boardId,
//       completed: false
//     }
//   });

//   return res.json({
//     tasks
//   });
// }));

// PATCH /api/boards/:boardId (update a board)
router.patch('/:boardId', requireAuth, validateBoard, asyncHandler(async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const { title, color } = req.body;

  const board = await Board.findByPk(boardId);

  await board.update({ title, color })

  return res.json({
    board
  });
}));

// DELETE /api/boards/:boardId (delete a board)
router.delete('/:boardId', requireAuth, asyncHandler(async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const board = await Board.findByPk(boardId);

  await board.destroy();

  res.json({
    message: 'Success',
    boardId
  });
}));

module.exports = router;