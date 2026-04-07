const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, taskController.createTask);
router.get('/project/:projectId', authMiddleware, taskController.getTasksByProject);
router.put('/:taskId', authMiddleware, taskController.updateTask);
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
