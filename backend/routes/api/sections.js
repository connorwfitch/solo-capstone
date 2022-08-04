// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Section } = require('../../db/models');
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

  return res.json({
    section
  });
}));

// PATCH /api/sections/:sectionId (update a section)
router.patch('/:sectionId', requireAuth, validateSection, asyncHandler(async (req, res) => {
  const sectionId = parseInt(req.params.sectionId, 10);
  const { title, orderIds, boardId } = req.body;

  const section = await Section.findByPk(sectionId);

  await section.update({ title, orderIds, boardId })

  return res.json({
    section
  });
}));

// DELETE /api/sections/:sectionId (delete a section)
router.delete('/:sectionId', requireAuth, asyncHandler(async (req, res) => {
  const sectionId = parseInt(req.params.sectionId, 10);
  const section = await Section.findByPk(sectionId);

  await section.destroy();

  res.json({
    message: 'Success',
    sectionId
  });
}));

module.exports = router;