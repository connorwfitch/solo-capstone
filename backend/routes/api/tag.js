// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const moment = require('moment');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Tag, Task, Sequelize: { Op } } = require('../../db/models');
// const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

/*
-------------------ROUTES-------------------
*/
// POST /api/tags (create a tag)
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { title, color, userId } = req.body;

  const tag = await Tag.create({ title, color, userId });

  return res.json({
    tag
  });
}));

// GET /api/tags/:tagId/tasks (get all incomplete tasks for a tag)
// WARNING: removed requireAuth for testing
router.get('/:tagId/tasks', asyncHandler(async (req, res) => {
  const tagId = parseInt(req.params.tagId, 10);

  const tag = await Tag.findByPk(tagId, {
    include: [
      {
        model: Task,
        where: {
          completed: false
        }
      }
    ]
  });

  const tasks = tag.Tasks;

  return res.json({
    tasks
  });
}));

// PATCH /api/tags/:tagId (update a tag)
router.patch('/:tagId', requireAuth, asyncHandler(async (req, res) => {
  const tagId = parseInt(req.params.tagId, 10);
  const { title, color, userId } = req.body;

  const tag = await Tag.findByPk(tagId);

  await tag.update({ title, color, userId })

  return res.json({
    tag
  });
}));

// DELETE /api/tags/:tagId (delete a tag)
router.delete('/:tagId', requireAuth, asyncHandler(async (req, res) => {
  const tagId = parseInt(req.params.tagId, 10);
  const tag = await Tag.findByPk(tagId);

  await tag.destroy();

  res.json({
    message: 'Success',
    tagId
  });
}));

module.exports = router;