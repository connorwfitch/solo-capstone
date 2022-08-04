// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Item } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

const validateItem = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Must include a title.')
    .isLength({ max: 50 })
    .withMessage('Title may be at most 50 characters long.'),
  check('details')
    .isLength({ max: 500 })
    .withMessage('Details may be at most 500 characters long.'),
  handleValidationErrors
];

/*
-------------------ROUTES-------------------
*/
// POST /api/items (create an item)
router.post('/', requireAuth, validateItem, asyncHandler(async (req, res) => {
  const { title, details, sectionId } = req.body;

  const item = await Item.create({ title, details, sectionId });

  return res.json({
    item
  });
}));

// PATCH /api/items/:itemId (update an item)
router.patch('/:itemId', requireAuth, validateItem, asyncHandler(async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const { title, details, sectionId } = req.body;

  const item = await Item.findByPk(itemId);

  await item.update({ title, details, sectionId })

  return res.json({
    item
  });
}));

// DELETE /api/items/:itemId (delete an item)
router.delete('/:itemId', requireAuth, asyncHandler(async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = await Item.findByPk(itemId);

  await item.destroy();

  res.json({
    message: 'Success',
    itemId
  });
}));

module.exports = router;