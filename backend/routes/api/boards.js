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

  const board = await Board.create({ title, color, orderIds: '', userId });

  return res.json({
    board
  });
}));

// GET /api/boards/:boardId/sections (get all sections for a board)
router.get('/:boardId/sections', requireAuth, asyncHandler(async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const sections = await Section.findAll({
    where: {
      boardId,
    },
    include: {
      model: Item,
    },
  });

  return res.json({
    sections
  });
}));

// PATCH /api/boards/:boardId (update a board)
router.patch('/:boardId', requireAuth, validateBoard, asyncHandler(async (req, res) => {
  const boardId = parseInt(req.params.boardId, 10);
  const { title, color, orderIds } = req.body;

  const board = await Board.findByPk(boardId);

  await board.update({ title, color, orderIds })

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