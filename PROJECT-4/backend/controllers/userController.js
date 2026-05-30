/* =============================================
   PROJECT-4 | controllers/userController.js
   Request handlers + input validation
   ============================================= */

const User = require('../models/User');

// ─── Validation Helper ───────────────────────────
function validateUserInput({ name, email, role }) {
  const errors = [];
  const validRoles = ['user', 'admin', 'editor', 'viewer'];

  if (!name || name.trim().length < 2)
    errors.push('Name must be at least 2 characters.');
  if (name && name.trim().length > 100)
    errors.push('Name must be under 100 characters.');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.push('A valid email address is required.');

  if (role && !validRoles.includes(role))
    errors.push(`Role must be one of: ${validRoles.join(', ')}.`);

  return errors;
}

// ─── Controllers ────────────────────────────────

/**
 * GET /api/users
 * GET /api/users?search=query
 */
const getAllUsers = (req, res) => {
  try {
    const { search = '' } = req.query;
    const users = User.findAll(search);
    res.json(users);
  } catch (err) {
    console.error('getAllUsers error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
};

/**
 * GET /api/users/stats/summary
 */
const getStats = (req, res) => {
  try {
    const stats = User.getStats();
    res.json(stats);
  } catch (err) {
    console.error('getStats error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
};

/**
 * GET /api/users/:id
 */
const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID.' });

    const user = User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json(user);
  } catch (err) {
    console.error('getUserById error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve user.' });
  }
};

/**
 * POST /api/users
 */
const createUser = (req, res) => {
  try {
    const { name, email, role = 'user' } = req.body;
    const errors = validateUserInput({ name, email, role });
    if (errors.length) return res.status(400).json({ error: errors.join(' ') });

    // Duplicate email check
    if (User.findByEmail(email)) {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }

    const newUser = User.create({ name, email, role });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('createUser error:', err.message);
    res.status(500).json({ error: 'Failed to create user.' });
  }
};

/**
 * PUT /api/users/:id
 */
const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID.' });

    const existing = User.findById(id);
    if (!existing) return res.status(404).json({ error: 'User not found.' });

    const { name, email, role } = req.body;
    const errors = validateUserInput({ name, email, role });
    if (errors.length) return res.status(400).json({ error: errors.join(' ') });

    // Duplicate email check (excluding current user)
    if (User.findByEmail(email, id)) {
      return res.status(409).json({ error: 'Another user with this email already exists.' });
    }

    const updated = User.update(id, { name, email, role });
    res.json(updated);
  } catch (err) {
    console.error('updateUser error:', err.message);
    res.status(500).json({ error: 'Failed to update user.' });
  }
};

/**
 * DELETE /api/users/:id
 */
const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID.' });

    const existing = User.findById(id);
    if (!existing) return res.status(404).json({ error: 'User not found.' });

    User.delete(id);
    res.json({ message: `User #${id} deleted successfully.` });
  } catch (err) {
    console.error('deleteUser error:', err.message);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

module.exports = {
  getAllUsers,
  getStats,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
