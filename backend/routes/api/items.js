// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Section, Item } = require('../../db/models');
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

  // updating the orderIds on the parent section
  const section = await Section.findByPk(sectionId, {
    include: Item
  });
  let temp = section.orderIds.split(',');
  temp.unshift(item.id)
  temp = temp.join(',');
  await section.update({ orderIds: temp });

  return res.json({
    section
  });
}));

// PATCH /api/items/:itemId (update an item)
router.patch('/:itemId', requireAuth, validateItem, asyncHandler(async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const { title, details } = req.body;

  const item = await Item.findByPk(itemId);

  await item.update({ title, details });

  const section = await Section.findByPk(item.sectionId, {
    include: Item
  });

  return res.json({
    section
  });
}));

// PATCH /api/items/:itemId/move (update an item's section and the orders of the involved sections)
router.patch('/:itemId/move', requireAuth, asyncHandler(async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const { startOrderIds, endOrderIds, sectionId } = req.body;

  const item = await Item.findByPk(itemId);

  // updating start section
  const startSection = await Section.findByPk(item.sectionId, {
    include: Item
  });
  await startSection.update({ orderIds: startOrderIds});

  // updating the item
  await item.update({ sectionId })

  // updating end section
  const endSection = await Section.findByPk(sectionId, {
    include: Item
  });
  await endSection.update({ orderIds: endOrderIds});

  return res.json({
    sections: [startSection, endSection]
  });
}));

// DELETE /api/items/:itemId (delete an item)
router.delete('/:itemId', requireAuth, asyncHandler(async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const itemIdString = req.params.itemId;

  const item = await Item.findByPk(itemId);

  // updating the orderIds on the parent section to remove the id
  const section = await Section.findByPk(item.sectionId, {
    include: Item
  });
  let temp = section.orderIds.split(',');
  temp = temp.filter((ele) => {
    return ele !== itemIdString;
  });
  temp = temp.join(',');
  await section.update({ orderIds: temp });

  // destroying the item
  await item.destroy();

  res.json({
    message: 'Success',
    section
  });
}));

module.exports = router;