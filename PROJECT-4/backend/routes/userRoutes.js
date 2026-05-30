/* =============================================
   PROJECT-4 | routes/userRoutes.js
   Express router — all /api/users endpoints
   ============================================= */

const express = require('express');
const router  = express.Router();
const {
  getAllUsers,
  getStats,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// NOTE: /stats/summary must be defined BEFORE /:id
// to prevent Express treating "stats" as an ID param

// GET    /api/users                — all users (supports ?search=)
router.get('/',                getAllUsers);

// GET    /api/users/stats/summary  — summary stats
router.get('/stats/summary',   getStats);

// GET    /api/users/:id            — single user
router.get('/:id',             getUserById);

// POST   /api/users                — create user
router.post('/',               createUser);

// PUT    /api/users/:id            — update user
router.put('/:id',             updateUser);

// DELETE /api/users/:id            — delete user
router.delete('/:id',          deleteUser);

module.exports = router;
