const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const newTask = await db.query(
      'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, user_id]
    );
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const updatedTask = await db.query(
      'UPDATE tasks SET title = ?, description = ?, user_id = ? WHERE id = ?',
      [title, description, user_id, req.params.id]
    );
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
