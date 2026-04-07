const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.createTask = (req, res) => {
  try {
    const { projectId, title, description, priority, dueDate, assignee } = req.body;

    if (!projectId || !title) {
      return res.status(400).json({ message: 'Project ID and task title are required' });
    }

    const data = readData();
    const project = data.projects.find(p => p.id === projectId && p.members.includes(req.userId));

    if (!project) {
      return res.status(403).json({ message: 'Not authorized to add tasks to this project' });
    }

    const newTask = {
      id: Date.now().toString(),
      projectId,
      title,
      description: description || '',
      priority: priority || 'medium',
      status: 'to-do',
      assignee: assignee || req.userId,
      createdBy: req.userId,
      createdAt: new Date(),
      dueDate: dueDate || null,
      completedAt: null
    };

    data.tasks.push(newTask);
    writeData(data);

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasksByProject = (req, res) => {
  try {
    const { projectId } = req.params;
    const data = readData();
    const project = data.projects.find(p => p.id === projectId && p.members.includes(req.userId));

    if (!project) {
      return res.status(403).json({ message: 'Not authorized to view tasks in this project' });
    }

    const tasks = data.tasks.filter(t => t.projectId === projectId);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate, assignee } = req.body;
    const data = readData();
    const task = data.tasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = data.projects.find(p => p.id === task.projectId && p.members.includes(req.userId));
    if (!project) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    if (assignee) task.assignee = assignee;

    if (status === 'done' && !task.completedAt) {
      task.completedAt = new Date();
    }

    writeData(data);
    res.json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = (req, res) => {
  try {
    const { taskId } = req.params;
    const data = readData();
    const taskIndex = data.tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = data.tasks[taskIndex];
    const project = data.projects.find(p => p.id === task.projectId && p.members.includes(req.userId));

    if (!project) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    data.tasks.splice(taskIndex, 1);
    writeData(data);

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
