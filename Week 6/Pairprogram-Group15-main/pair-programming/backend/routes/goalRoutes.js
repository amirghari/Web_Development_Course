const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

/* // Route for getting goals (GET /goals)
router.get('/api/', protect, getGoals);

// Route for creating a new goal (POST /goals)
router.post('/api/', protect, createGoal);

// Route for updating a goal by ID (PUT /goals/:id)
router.put('/api/:id', protect, updateGoal);

// Route for deleting a goal by ID (DELETE /goals/:id)
router.delete('/api/:id', protect, deleteGoal); */

module.exports = router;
