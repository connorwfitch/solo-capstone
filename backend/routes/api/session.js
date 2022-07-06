// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');


// Internal modules
const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

// Creating the router
const router = express.Router();

/*
-------------------ROUTES-------------------
*/
// POST /api/session (login)
router.post('/', asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({ user });
}));

// DELETE /api/session (logout)
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

module.exports = router;