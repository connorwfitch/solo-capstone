// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Board, Section, Item } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

const validateSection = [
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
// POST /api/sections (create a section)
router.post('/', requireAuth, validateSection, asyncHandler(async (req, res) => {
  const { title, boardId } = req.body;

  const section = await Section.create({ title, orderIds: '', boardId });

  // updating the orderIds on the parent board
  const board = await Board.findByPk(boardId);
  let temp = board.orderIds.split(',');
  temp.push(section.id)
  temp = temp.join(',');
  await board.update({ orderIds: temp});

  return res.json({
    section,
    board
  });
}));

// PATCH /api/sections/:sectionId (update a section)
router.patch('/:sectionId', requireAuth, validateSection, asyncHandler(async (req, res) => {
  const sectionId = parseInt(req.params.sectionId, 10);
  const { title, orderIds, boardId } = req.body;

  const section = await Section.findByPk(sectionId, {
    include: Item,
  });

  await section.update({ title, orderIds, boardId });

  return res.json({
    section
  });
}));

// DELETE /api/sections/:sectionId (delete a section)
router.delete('/:sectionId', requireAuth, asyncHandler(async (req, res) => {
  const sectionId = parseInt(req.params.sectionId, 10);
  const sectionIdString = req.params.sectionId;

  const section = await Section.findByPk(sectionId);

  // updating the orderIds on the parent board to remove the id
  const board = await Board.findByPk(section.boardId);
  let temp = board.orderIds.split(',');
  temp = temp.filter((ele) => {
    return ele !== sectionIdString;
  });
  temp = temp.join(',');
  await board.update({ orderIds: temp });

  // destroying the section
  await section.destroy();

  res.json({
    message: 'Success',
    sectionId,
    board
  });
}));

module.exports = router;