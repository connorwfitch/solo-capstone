// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const moment = require('moment');

// Internal modules
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, List, Task, Tag, Sequelize: { Op } } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('email')
    .isLength({ min: 3 })
    .withMessage('Please provide a email that is between 3 and 256 characters long.')
    .isLength({ max: 256 })
    .withMessage('Please provide a email that is between 3 and 256 characters long.'),
  check('email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided email is already in use by another user.');
          }
        });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a username that is between 3 and 30 characters long.')
    .isLength({ max: 30 })
    .withMessage('Please provide a username that is between 3 and 30 characters long.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('username')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another user.');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

/*
-------------------ROUTES-------------------
*/
// POST /api/users (signup, create a user profile)
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username, color } = req.body;
  const user = await User.signup({ email, username, password, color });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
}));

// GET /api/users/:userId/lists (get all lists for a user)
router.get('/:userId/lists', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const lists = await List.findAll({
    where: {
      userId
    }
  });

  return res.json({
    lists
  });
}));

// GET /api/users/:userId/tasks (get all incomplete tasks for a user)
router.get('/:userId/tasks', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const tasks = await Task.findAll({
    where: {
      userId,
      completed: false
    }
  });

  return res.json({
    tasks
  });
}));

// GET /api/users/:userId/tasks/completed (get all completed tasks for a user)
router.get('/:userId/tasks/completed', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const tasks = await Task.findAll({
    where: {
      userId,
      completed: true
    }
  });

  return res.json({
    tasks
  });
}));

// GET /api/users/:userId/tasks/today (get all incomplete tasks for a user with a due date of today)
router.get('/:userId/tasks/today', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const EOD = moment().format('YYYY-MM-DD 23:59');
  const tasks = await Task.findAll({
    where: {
      userId,
      completed: false,
      dueAt: {
        [Op.ne]: null,
        [Op.lte]: EOD
      }
    }
  });

  return res.json({
    tasks
  });
}));

// DELETE /api/users/:userId/tasks/completed (get all completed tasks for a user)
router.delete('/:userId/tasks/completed', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  Task.destroy({
    where: {
      userId,
      completed: true
    }
  });

  res.json({
    message: 'Success'
  });
}));

// GET /api/users/:userId/tags (get all tags for a user)
router.get('/:userId/tags', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const tags = await Tag.findAll({
    where: {
      userId
    }
  });

  return res.json({
    tags
  });
}));

module.exports = router;